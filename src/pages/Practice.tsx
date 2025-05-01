import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TopicsList from '@/components/practice/TopicsList';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import DiscussionChat from '@/components/practice/DiscussionChat';
import WelcomeScreen from '@/components/practice/WelcomeScreen';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import { api } from '@/lib/api';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EnhancedQuestionData {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface UnitData {
  id: string;
  name: string;
  competency: number;
}

interface QuestionData {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string, message: string }>>([]);
  const [units, setUnits] = useState<UnitData[]>([]);
  const [topics, setTopics] = useState<UnitData[]>([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState<boolean>(true);
  const [isLoadingTopics, setIsLoadingTopics] = useState<boolean>(true);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<number>(2);
  const [questionType, setQuestionType] = useState<string>('random');
  const [activeTab, setActiveTab] = useState<'units' | 'topics'>('units');
  const MAX_RETRIES = 3;
  const MAX_HISTORY = 10;

  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');
  const unitId = queryParams.get('unitId');
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const { user, session } = useAuth();
  const { getCourseById } = useCourse();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setIsLoadingCourse(false);
        return;
      }

      setIsLoadingCourse(true);
      try {
        const contextCourse = getCourseById(courseId);
        if (contextCourse) {
          setCourse(contextCourse);
        } else {
          console.log(`asdfasdfasdfasdfs${unitId}`)
          //const response = await api.post(`/api/units/${unitId}/generate-question`, {
            //level: 2 // Default level
          //});
         
                
          //if (response.data) {
            //setCourse(response.data);
          //}
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setCourse(null);
      } finally {
        setIsLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [courseId, session?.access_token, getCourseById]);

  useEffect(() => {
    const fetchUnits = async () => {
      if (!courseId || !session?.access_token) return;
      
      setIsLoadingUnits(true);
      try {
        const response = await api.get(`/api/courses/${courseId}/units`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (response.data && response.data.length > 0) {
          const enrichedUnits = await Promise.all(
            response.data.map(async (unit: any) => {
              try {
                //const masteryResponse = await api.get(`/api/topic-mastery/${user?.id}/unit/${unit.id}`, {
                  //headers: {
                    //Authorization: `Bearer ${session.access_token}`
                  //}
                //});

                //const competency = masteryResponse.data?.mastery_score 
                  //? Math.round(masteryResponse.data.mastery_score * 100) 
                  //: 0;

                return {
                  id: unit.id,
                  name: unit.name,
                  competency
                };
              } catch (error) {
                console.error('Error fetching mastery data:', error);
                return {
                  id: unit.id,
                  name: unit.name,
                  competency: 0
                };
              }
            })
          );

          setUnits(enrichedUnits);
        } else {
          setUnits([]);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
        setUnits([]);
      } finally {
        setIsLoadingUnits(false);
      }
    };

    fetchUnits();
  }, [courseId, session?.access_token, user?.id]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!courseId || !session?.access_token) return;
      
      setIsLoadingTopics(true);
      try {
        const response = await api.get(`/api/courses/${courseId}/topics`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });

        if (response.data && response.data.length > 0) {
          setTopics(response.data.map((topic: any) => ({
            id: topic.id,
            name: topic.name,
            competency: 0 // You might want to fetch topic mastery later
          })));
        } else {
          setTopics([]);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      } finally {
        setIsLoadingTopics(false);
      }
    };

    fetchTopics();
  }, [courseId, session?.access_token]);

  useEffect(() => {
    if (unitId && !isLoadingUnits) {
      handleItemSelect(unitId);
    } else if (!unitId) {
      setSelectedTopic(null);
      setCurrentQuestion(null);
      setFeedback("");
      setChatHistory([]);
    }
  }, [courseId, unitId, isLoadingUnits]);

  const generateUniqueQuestion = async (id: string, selectedItem: UnitData, retryCount = 0): Promise<QuestionData | null> => {
    try {
      const endpoint = activeTab === 'units' 
        ? `api/units/${id}/generate-question`
        : `api/topics/${id}/generate-question`;

      const response = await api.post(endpoint, {
        level: difficulty,
        content: selectedItem.name,
        timestamp: Date.now(),
        previousQuestions: previousQuestions.slice(-MAX_HISTORY),
        diversity: 'high',
        questionType: questionType,
        retryCount: retryCount
      });

      if (response.data) {
        const newQuestion = response.data.question;
        
        if (previousQuestions.includes(newQuestion) && retryCount < MAX_RETRIES) {
          console.log('Duplicate question detected, retrying...');
          return generateUniqueQuestion(id, selectedItem, retryCount + 1);
        }

        return {
          question: newQuestion,
          options: response.data.options,
          correctAnswer: response.data.options[response.data.answer]
        };
      }
    } catch (error) {
      console.error('Error generating question:', error);
    }
    return null;
  };

  const handleItemSelect = async (id: string) => {
    // Reset all content-related states except chat history
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setFeedback("");
    setPreviousQuestions([]);
    
    setSelectedTopic(id);
    setIsLoadingQuestion(true);
    try {
      const items = activeTab === 'units' ? units : topics;
      const selectedItem = items.find(item => item.id === id);
      if (!selectedItem) {
        throw new Error(`${activeTab === 'units' ? 'Unit' : 'Topic'} not found`);
      }

      const questionData = await generateUniqueQuestion(id, selectedItem);
      
      if (questionData) {
        setPreviousQuestions(prev => [...prev, questionData.question].slice(-MAX_HISTORY));
        setCurrentQuestion(questionData);
      }
    } catch (error) {
      console.error('Error in handleItemSelect:', error);
    } finally {
      setIsLoadingQuestion(false);
    }
    
    navigate(`/practice?courseId=${courseId}&${activeTab === 'units' ? 'unitId' : 'topicId'}=${id}`, { replace: true });
  };

  const handleDifficultyChange = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
    if (selectedTopic) {
      handleItemSelect(selectedTopic);
    }
  };

  const handleQuestionTypeChange = (newType: string) => {
    setQuestionType(newType);
    if (selectedTopic) {
      handleItemSelect(selectedTopic);
    }
  };

  const handleSendMessage = async (message: string) => {
    const newMessage = { sender: 'student', message };
    setChatHistory(prev => [...prev, newMessage]);
    
    try {
      const endpoint = activeTab === 'units' 
        ? `api/units/${selectedTopic}/ask-question`
        : `api/topics/${selectedTopic}/ask-question`;

      const response = await api.post(endpoint, {
        question: message
      });

      if (response.data) {
        const aiResponse = { 
          sender: 'ai', 
          message: response.data.response 
        };
        setChatHistory(prev => [...prev, aiResponse]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = { 
        sender: 'ai', 
        message: 'Sorry, I encountered an error while processing your question. Please try again.' 
      };
      setChatHistory(prev => [...prev, errorResponse]);
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && currentQuestion) {
      setIsSubmitted(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setFeedback("Correct! Well done!");
      } else {
        setFeedback(`Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setFeedback("");
    handleItemSelect(selectedTopic!);
  };

  const isLoading = isLoadingCourse || (activeTab === 'units' ? isLoadingUnits : isLoadingTopics);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/learn">
                    <Home className="h-4 w-4" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/learn">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course?.name || 'Loading...'}</BreadcrumbPage>
              </BreadcrumbItem>
              
              {selectedTopic && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      {activeTab === 'units' ? units.find(unit => unit.id === selectedTopic)?.name || 'Loading...' : topics.find(topic => topic.id === selectedTopic)?.name || 'Loading...'}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-aku-green">
            {course?.name || 'Loading...'} Practice
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          <div className="md:col-span-1">
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => {
                // Reset all content-related states except chat history
                setSelectedTopic(null);
                setCurrentQuestion(null);
                setSelectedAnswer(null);
                setIsSubmitted(false);
                setFeedback("");
                setPreviousQuestions([]);
                setActiveTab(value as 'units' | 'topics');
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="units">Units</TabsTrigger>
                <TabsTrigger value="topics">Topics</TabsTrigger>
              </TabsList>
            </Tabs>
            <TopicsList 
              topics={activeTab === 'units' ? units : topics} 
              isLoading={isLoading}
              selectedTopic={selectedTopic} 
              onTopicSelect={handleItemSelect} 
            />
          </div>

          <div className="md:col-span-1">
            {selectedTopic ? (
              <div className="space-y-6">
                {isLoadingQuestion ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="flex flex-col items-center justify-center py-12">
                        <BookOpen className="h-12 w-12 text-tutor-light-gray mb-4 opacity-70" />
                        <p className="text-tutor-gray text-lg">
                          Generating question...
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : currentQuestion ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex gap-2">
                            <select 
                              value={difficulty}
                              onChange={(e) => handleDifficultyChange(Number(e.target.value))}
                              className="px-2 py-1 border rounded"
                            >
                              <option value={1}>Easy</option>
                              <option value={2}>Medium</option>
                              <option value={3}>Hard</option>
                            </select>
                            <select 
                              value={questionType}
                              onChange={(e) => handleQuestionTypeChange(e.target.value)}
                              className="px-2 py-1 border rounded"
                            >
                              <option value="random">Random Type</option>
                              <option value="multiple_choice">Multiple Choice</option>
                              <option value="true_false">True/False</option>
                              <option value="fill_blank">Fill in the Blank</option>
                            </select>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
                        <div className="space-y-2">
                          {currentQuestion.options.map((option, index) => (
                            <div 
                              key={index} 
                              className={`p-2 border rounded cursor-pointer transition-colors
                                ${selectedAnswer === option ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}
                                ${isSubmitted && option === currentQuestion.correctAnswer ? 'bg-green-100 border-green-500' : ''}
                                ${isSubmitted && selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer ? 'bg-red-100 border-red-500' : ''}
                              `}
                              onClick={() => handleAnswerSelect(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                        {isSubmitted && (
                          <div className={`text-sm ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                            {feedback}
                          </div>
                        )}
                        <div className="flex justify-between mt-4">
                          {!isSubmitted ? (
                            <button
                              onClick={handleSubmit}
                              disabled={!selectedAnswer}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              Submit Answer
                            </button>
                          ) : (
                            <button
                              onClick={handleNextQuestion}
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Next Question
                            </button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-tutor-light-gray mb-4 opacity-70" />
                    <p className="text-tutor-gray text-lg">
                      Select a topic to start practicing
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Discussion Chat - Now outside the question block */}
            <div className="mt-6">
              <DiscussionChat 
                chatHistory={chatHistory}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;

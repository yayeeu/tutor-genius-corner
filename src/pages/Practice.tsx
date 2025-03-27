
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TopicsList from '@/components/practice/TopicsList';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import DiscussionChat from '@/components/practice/DiscussionChat';
import WelcomeScreen from '@/components/practice/WelcomeScreen';
import { topicData, sampleQuestions, QuestionData } from '@/data/practiceData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

const Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string, message: string }>>([]);
  const [availableQuestions, setAvailableQuestions] = useState<QuestionData[]>([]);

  const queryParams = new URLSearchParams(location.search);
  const subjectName = queryParams.get('subject') || "Mathematics";
  const topicParam = queryParams.get('topic');

  const topics = topicData[subjectName as keyof typeof topicData] || [];
  
  const overallCompetency = Math.round(
    topics.reduce((sum, topic) => sum + topic.competency, 0) / topics.length
  );

  useEffect(() => {
    if (topicParam) {
      handleTopicSelect(topicParam);
    } else {
      setSelectedTopic(null);
      setCurrentQuestion(null);
      setFeedback("");
      setChatHistory([]);
      setAvailableQuestions([]);
    }
  }, [subjectName, topicParam]);

  const loadQuestionsForTopic = (topicName: string) => {
    const questionsData = sampleQuestions;
    const subjectQuestions = questionsData[subjectName] || {};
    const topicQuestions = subjectQuestions[topicName] || [];
    
    setAvailableQuestions(topicQuestions);
    
    if (topicQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      setCurrentQuestion(topicQuestions[randomIndex]);
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(topicName);
    loadQuestionsForTopic(topicName);
    setFeedback("");
    setChatHistory([]);
    
    navigate(`/practice?subject=${subjectName}&topic=${topicName}`, { replace: true });
  };

  const handleNextQuestion = () => {
    if (availableQuestions.length > 0) {
      let newQuestions = availableQuestions;
      if (currentQuestion && availableQuestions.length > 1) {
        newQuestions = availableQuestions.filter(q => q.id !== currentQuestion.id);
      }
      
      const randomIndex = Math.floor(Math.random() * newQuestions.length);
      setCurrentQuestion(newQuestions[randomIndex]);
      setFeedback("");
      setChatHistory([]);
    }
  };

  const handleSendMessage = (message: string) => {
    const newMessage = { sender: 'student', message };
    setChatHistory(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        message: `I'll help you with your question about ${selectedTopic}. Try thinking about the fundamental principles we discussed earlier.` 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(
      isCorrect 
        ? "Great job! You've mastered this concept." 
        : "That's not quite right. Try reviewing the concept again."
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/chat-tutor">
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
                <BreadcrumbLink asChild className="font-medium">
                  <Link to={`/practice?subject=${subjectName}`}>{subjectName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {selectedTopic && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{selectedTopic}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{subjectName} Practice</h1>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-tutor-gray">Overall Competency:</p>
            <div className="flex-1 max-w-xs">
              <Progress value={overallCompetency} className="h-2" />
            </div>
            <span className="font-medium">{overallCompetency}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TopicsList 
              topics={topics} 
              selectedTopic={selectedTopic} 
              onTopicSelect={handleTopicSelect} 
            />
          </div>

          <div className="md:col-span-2">
            {selectedTopic ? (
              <div className="space-y-6">
                {currentQuestion ? (
                  <QuizQuestion 
                    id={currentQuestion.id}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    correctAnswer={currentQuestion.correctAnswer}
                    onAnswer={handleAnswer}
                  />
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p>No practice questions available for this topic yet.</p>
                    </CardContent>
                  </Card>
                )}

                <FeedbackCard 
                  feedback={feedback} 
                  onNextQuestion={feedback ? handleNextQuestion : undefined}
                />

                <DiscussionChat 
                  chatHistory={chatHistory}
                  onSendMessage={handleSendMessage}
                />
              </div>
            ) : (
              <WelcomeScreen />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;


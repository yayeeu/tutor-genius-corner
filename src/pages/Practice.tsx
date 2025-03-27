
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import TopicsList from '@/components/practice/TopicsList';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import DiscussionChat from '@/components/practice/DiscussionChat';
import WelcomeScreen from '@/components/practice/WelcomeScreen';
import { topicData, sampleQuestions, QuestionData } from '@/data/practiceData';

const Practice = () => {
  const location = useLocation();
  const { subject } = useParams<{ subject: string }>();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string, message: string }>>([]);
  const [availableQuestions, setAvailableQuestions] = useState<QuestionData[]>([]);

  // Get subject from URL params or query string
  const subjectName = subject || new URLSearchParams(location.search).get('subject') || "Mathematics";

  // Get topics for the current subject
  const topics = topicData[subjectName as keyof typeof topicData] || [];
  
  // Calculate overall competency for the subject
  const overallCompetency = Math.round(
    topics.reduce((sum, topic) => sum + topic.competency, 0) / topics.length
  );

  useEffect(() => {
    // Reset selected topic when subject changes
    setSelectedTopic(null);
    setCurrentQuestion(null);
    setFeedback("");
    setChatHistory([]);
    setAvailableQuestions([]);
  }, [subjectName]);

  const loadQuestionsForTopic = (topicName: string) => {
    // Get questions for this topic
    const questionsData = sampleQuestions;
    const subjectQuestions = questionsData[subjectName] || {};
    const topicQuestions = subjectQuestions[topicName] || [];
    
    setAvailableQuestions(topicQuestions);
    
    // Select a random question if we have any
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
  };

  const handleNextQuestion = () => {
    if (availableQuestions.length > 0) {
      // Get a different question than the current one if possible
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
    // Add user message to chat history
    const newMessage = { sender: 'student', message };
    setChatHistory(prev => [...prev, newMessage]);
    
    // Simulate AI response (in a real app, this would call an API)
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
          {/* Left sidebar with topics */}
          <div className="md:col-span-1">
            <TopicsList 
              topics={topics} 
              selectedTopic={selectedTopic} 
              onTopicSelect={handleTopicSelect} 
            />
          </div>

          {/* Right content area with questions */}
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

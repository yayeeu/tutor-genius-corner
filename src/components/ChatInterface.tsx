
import { useState, useEffect } from 'react';
import ChatSidebar from './chat/ChatSidebar';
import MessageArea from './chat/MessageArea';
import ChatInputArea from './chat/ChatInputArea';
import { useChatState } from '@/hooks/useChatState';
import { useQuizState } from '@/hooks/useQuizState';
import { useAuth } from '@/contexts/AuthContext';
import { questions } from '@/pages/ScreeningAssignment'; // Import screening questions
import { useToast } from '@/hooks/use-toast';

const ChatInterface = () => {
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [hasTakenAssignment, setHasTakenAssignment] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize chat state
  const { 
    messages, 
    isTyping, 
    setIsTyping, 
    addUserMessage, 
    addAIMessage 
  } = useChatState();
  
  // Initialize quiz state
  const {
    currentQuestion,
    feedback,
    isLoadingQuestion,
    handleTopicSelect,
    handleNextQuestion,
    handleAnswer,
    setCurrentQuestion
  } = useQuizState(addAIMessage);
  
  // Check if user has taken the assignment before
  useEffect(() => {
    if (user) {
      // Check local storage for assignment completion
      const hasCompletedAssignment = localStorage.getItem(`assignment_completed_${user.id}`);
      
      if (!hasCompletedAssignment) {
        // First login - show welcome message and start assessment
        setTimeout(() => {
          addAIMessage("Welcome! Let's get you started with a quick assignment to see your current level. Here are some random questions based on the curriculum.");
          setShowAssignment(true);
          setCurrentQuestion(questions[0]);
        }, 1000);
      } else {
        setHasTakenAssignment(true);
      }
    }
  }, [user, addAIMessage, setCurrentQuestion]);
  
  // Handle assignment completion
  const handleAssignmentComplete = () => {
    if (user) {
      localStorage.setItem(`assignment_completed_${user.id}`, 'true');
      setShowAssignment(false);
      setHasTakenAssignment(true);
      
      toast({
        title: "Assignment Completed!",
        description: "Thanks for completing the assignment. You can now explore all features.",
      });
      
      addAIMessage("Great job completing the assignment! Now you can explore topics and ask me any questions you have about your studies.");
    }
  };
  
  const handleSendMessage = (message: string) => {
    // Add user message
    addUserMessage(message);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(message);
      addAIMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  };
  
  const getAIResponse = (message: string): string => {
    // Simple response logic - would be replaced with real AI in production
    if (message.toLowerCase().includes('math')) {
      return "I'd be happy to help with math! What specific topic are you working on?";
    } else if (message.toLowerCase().includes('science')) {
      return "Science is fascinating! Are you studying biology, chemistry, physics, or another branch?";
    } else if (message.toLowerCase().includes('help')) {
      return "I'm here to help you learn! Feel free to ask me about any subject or topic you're studying, and I'll do my best to explain it clearly.";
    } else {
      return "That's an interesting question! Let's explore this topic together. Could you tell me more about what you're trying to learn?";
    }
  };
  
  // Custom answer handler for the assessment
  const handleAssessmentAnswer = (isCorrect: boolean) => {
    handleAnswer(isCorrect);
    
    // After delay, either show next question or complete the assignment
    setTimeout(() => {
      const currentIndex = questions.findIndex(q => q.id === currentQuestion?.id);
      
      if (currentIndex < questions.length - 1) {
        setCurrentQuestion(questions[currentIndex + 1]);
      } else {
        handleAssignmentComplete();
      }
    }, 2000);
  };
  
  return (
    <div className="flex h-[calc(100vh-4rem)] animate-fade-in">
      {/* Sidebar - only show topics after assignment completion */}
      {!showAssignment && hasTakenAssignment && (
        <ChatSidebar
          onTopicSelect={handleTopicSelect}
          isLoadingTopics={isLoadingTopics}
        />
      )}
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-tutor-beige/30">
        {/* Chat Messages */}
        <MessageArea
          messages={messages}
          isTyping={isTyping}
          currentQuestion={showAssignment ? currentQuestion : (hasTakenAssignment ? currentQuestion : null)}
          feedback={feedback}
          isLoadingQuestion={isLoadingQuestion}
          handleAnswer={showAssignment ? handleAssessmentAnswer : handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
        
        {/* Input Area - hide during assignment */}
        {!showAssignment && (
          <ChatInputArea onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;

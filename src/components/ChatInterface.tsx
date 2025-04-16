
import { useState, useEffect, useCallback, useRef } from 'react';
import ChatSidebar from './chat/ChatSidebar';
import MessageArea from './chat/MessageArea';
import ChatInputArea from './chat/ChatInputArea';
import { useChatState } from '@/hooks/useChatState';
import { useQuizState } from '@/hooks/useQuizState';
import { useAuth } from '@/contexts/AuthContext';
import { questions } from '@/pages/ScreeningAssignment'; // Import screening questions
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = "/api"; // Replace with actual API endpoint

const ChatInterface = () => {
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [hasTakenAssignment, setHasTakenAssignment] = useState(false);
  const [assignmentInitialized, setAssignmentInitialized] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Initialize chat state with streaming capabilities
  const { 
    messages, 
    isTyping, 
    setIsTyping, 
    addUserMessage, 
    addAIMessage,
    streamAIResponse,
    updateStreamingMessage,
    finishStreaming 
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
  
  // Memoized handler for assignment completion to avoid recreation on every render
  const handleAssignmentComplete = useCallback(() => {
    if (user) {
      localStorage.setItem(`assignment_completed_${user.id}`, 'true');
      setShowAssignment(false);
      setHasTakenAssignment(true);
      
      toast({
        title: "Assignment Completed! 🎉",
        description: "Thanks for completing the assignment. You can now explore all features.",
      });
      
      addAIMessage("Great job completing the assignment! 🌟 Now you can explore topics and ask me any questions you have about your studies.");
    }
  }, [user, toast, addAIMessage]);
  
  // Check if user has taken the assignment before - only run once when user is available
  useEffect(() => {
    if (user && !assignmentInitialized) {
      setAssignmentInitialized(true);
      
      // Check local storage for assignment completion
      const hasCompletedAssignment = localStorage.getItem(`assignment_completed_${user.id}`);
      
      // Special handling for user "Yared Ayele"
      if (user.user_metadata?.full_name?.toLowerCase() === "yared ayele" && !hasCompletedAssignment) {
        // Automatically mark the assignment as completed for Yared
        localStorage.setItem(`assignment_completed_${user.id}`, 'true');
        setHasTakenAssignment(true);
        
        // Add a welcome message instead of starting the assessment
        setTimeout(() => {
          addAIMessage("Welcome back, Yared! 👋 How can I help you with your studies today?");
        }, 1000);
      } else if (!hasCompletedAssignment) {
        // First login - show welcome message and start assessment
        setTimeout(() => {
          addAIMessage("Welcome! 🤗 Let's get you started with a quick assignment to see your current level. Here are some random questions based on the curriculum.");
          setShowAssignment(true);
          setCurrentQuestion(questions[0]);
        }, 1000);
      } else {
        setHasTakenAssignment(true);
      }
    }
  }, [user, addAIMessage, setCurrentQuestion, assignmentInitialized]);
  
  // Function to handle streaming AI responses
  const streamAIResponseFromAPI = async (userMessage: string) => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    try {
      // Initialize the streaming message
      const messageId = streamAIResponse();
      setIsTyping(true);
      
      // Get emojis based on the content of the user message
      const emojis = getRelevantEmojis(userMessage);
      let initialContent = "";
      
      if (emojis) {
        initialContent = `${emojis} `;
        updateStreamingMessage(messageId, initialContent);
      }
      
      // In a real implementation, this would be a call to a streaming API endpoint
      // For this demo, we'll simulate streaming with a setTimeout
      const response = await simulateStreamingResponse(userMessage);
      
      // Process each chunk of the response
      let fullContent = initialContent;
      for (const chunk of response) {
        // Skip if the request has been aborted
        if (abortController.signal.aborted) {
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
        updateStreamingMessage(messageId, chunk);
        fullContent += chunk;
      }
      
      finishStreaming();
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error streaming response:', error);
        toast({
          title: "Error",
          description: "Failed to get a response. Please try again.",
          variant: "destructive",
        });
        setIsTyping(false);
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  };
  
  // Helper function to get relevant emojis based on message content
  const getRelevantEmojis = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('math') || lowerMessage.includes('calculation')) {
      return '🧮';
    } else if (lowerMessage.includes('science') || lowerMessage.includes('experiment')) {
      return '🔬';
    } else if (lowerMessage.includes('history')) {
      return '📜';
    } else if (lowerMessage.includes('geography')) {
      return '🌍';
    } else if (lowerMessage.includes('language') || lowerMessage.includes('grammar')) {
      return '📝';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return '👋';
    } else if (lowerMessage.includes('thank')) {
      return '😊';
    } else {
      // Random selection of friendly emojis
      const emojis = ['✨', '🤔', '💡', '📚'];
      return emojis[Math.floor(Math.random() * emojis.length)];
    }
  };
  
  // Simulate streaming response for demo purposes
  // In a real app, this would be replaced by a fetch to a streaming API
  const simulateStreamingResponse = async (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    let response = "";
    
    if (lowerMessage.includes('math')) {
      response = "I'd be happy to help with math! Mathematics is all about problem-solving and logical thinking. What specific topic are you working on? Algebra, geometry, or something else?";
    } else if (lowerMessage.includes('science')) {
      response = "Science is fascinating! Are you studying biology, chemistry, physics, or another branch? Each has its own amazing discoveries to explore.";
    } else if (lowerMessage.includes('help')) {
      response = "I'm here to help you learn! Feel free to ask me about any subject or topic you're studying, and I'll do my best to explain it clearly. You can also ask for practice problems or examples.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "Hello! It's great to see you! I'm Aku, your AI learning assistant. How can I help with your studies today?";
    } else {
      response = "That's an interesting question! Let's explore this topic together. Could you tell me more about what you're trying to learn? The more specific you can be, the better I can help you understand.";
    }
    
    // Convert the response into chunks to simulate streaming
    return response.split(' ').map((word, index) => {
      // Group words into chunks of 1-3 words
      const chunkSize = Math.floor(Math.random() * 3) + 1;
      const chunk = response.split(' ').slice(index * chunkSize, (index + 1) * chunkSize).join(' ');
      return chunk + ' ';
    });
  };
  
  const handleSendMessage = (message: string) => {
    // Add user message
    addUserMessage(message);
    
    // Stream AI response
    streamAIResponseFromAPI(message);
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
  
  // Clean up any ongoing requests when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
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
      <div className="flex-1 flex flex-col">
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

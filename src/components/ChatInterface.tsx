
import { useState } from 'react';
import ChatSidebar from './chat/ChatSidebar';
import MessageArea from './chat/MessageArea';
import ChatInputArea from './chat/ChatInputArea';
import { useChatState } from '@/hooks/useChatState';
import { useQuizState } from '@/hooks/useQuizState';

const ChatInterface = () => {
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  
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
    handleAnswer
  } = useQuizState(addAIMessage);
  
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
  
  return (
    <div className="flex h-[calc(100vh-4rem)] animate-fade-in">
      {/* Sidebar */}
      <ChatSidebar
        onTopicSelect={handleTopicSelect}
        isLoadingTopics={isLoadingTopics}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-tutor-beige/30">
        {/* Chat Messages */}
        <MessageArea
          messages={messages}
          isTyping={isTyping}
          currentQuestion={currentQuestion}
          feedback={feedback}
          isLoadingQuestion={isLoadingQuestion}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
        
        {/* Input Area */}
        <ChatInputArea onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;

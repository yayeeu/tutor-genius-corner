
import { useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import MessageArea from './MessageArea';
import ChatInputArea from './ChatInputArea';
import { useChatWithVllm } from '@/hooks/useChatWithVllm';
import { useAssignmentState } from '@/hooks/useAssignmentState';
import { questions } from '@/pages/ScreeningAssignment'; // Import screening questions

const ChatContainer = () => {
  // Initialize chat state
  const { 
    messages, 
    isTyping, 
    handleSendMessage,
    addUserMessage,
    endSession
  } = useChatWithVllm();
  
  // Initialize assignment/quiz state
  const {
    currentQuestion,
    feedback,
    isLoadingQuestion,
    showAssignment,
    hasTakenAssignment,
    checkAssignmentStatus,
    handleTopicSelect,
    handleNextQuestion,
    handleAnswer,
    handleAssessmentAnswer,
    setCurrentQuestion
  } = useAssignmentState(addUserMessage);
  
  // Check if user has completed the assignment
  useEffect(() => {
    checkAssignmentStatus();
    
    // End session when component unmounts
    return () => {
      endSession();
    };
  }, [checkAssignmentStatus, endSession]);
  
  // Set first question when starting assignment
  useEffect(() => {
    if (showAssignment && questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  }, [showAssignment, setCurrentQuestion]);
  
  return (
    <div className="flex h-[calc(100vh-4rem)] animate-fade-in">
      {/* Sidebar - only show topics after assignment completion */}
      {!showAssignment && hasTakenAssignment && (
        <ChatSidebar
          onTopicSelect={handleTopicSelect}
          isLoadingTopics={isLoadingQuestion}
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

export default ChatContainer;

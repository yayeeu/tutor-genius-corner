
import { useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';
import { useGlobalUser } from '@/hooks/useGlobalUser';
import { useChatWithVllm } from '@/hooks/useChatWithVllm';
import { useAssignmentState } from '@/hooks/useAssignmentState';
import { questions } from '@/pages/ScreeningAssignment';
import ChatSidebar from './ChatSidebar';
import MessageArea from './MessageArea';
import ChatInputArea from './ChatInputArea';
import { useToast } from '@/hooks/use-toast';
import Logger from '@/utils/logger';

const ChatContainer = () => {
  const { isMobile } = useResponsive();
  const { profile, isLoading: isLoadingProfile } = useGlobalUser();
  const { toast } = useToast();
  
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
  
  useEffect(() => {
    try {
      checkAssignmentStatus();
      return () => {
        endSession();
      };
    } catch (error) {
      Logger.error('Failed to check assignment status', { error });
      toast({
        title: "Error",
        description: "Failed to load assignment status. Please refresh the page.",
        variant: "destructive"
      });
    }
  }, [checkAssignmentStatus, endSession, toast]);
  
  useEffect(() => {
    if (showAssignment && questions.length > 0) {
      try {
        setCurrentQuestion(questions[0]);
      } catch (error) {
        Logger.error('Failed to set initial question', { error });
        toast({
          title: "Error",
          description: "Failed to load the first question. Please try again.",
          variant: "destructive"
        });
      }
    }
  }, [showAssignment, setCurrentQuestion, toast]);
  
  if (isLoadingProfile) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] animate-fade-in">
      {!showAssignment && hasTakenAssignment && !isMobile && (
        <ChatSidebar
          onTopicSelect={handleTopicSelect}
          isLoadingTopics={isLoadingQuestion}
        />
      )}
      
      <div className={`flex-1 flex flex-col ${isMobile ? 'w-full' : ''}`}>
        <MessageArea
          messages={messages}
          isTyping={isTyping}
          currentQuestion={showAssignment ? currentQuestion : (hasTakenAssignment ? currentQuestion : null)}
          feedback={feedback}
          isLoadingQuestion={isLoadingQuestion}
          handleAnswer={showAssignment ? handleAssessmentAnswer : handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
        
        {!showAssignment && (
          <ChatInputArea onSendMessage={handleSendMessage} />
        )}
      </div>
    </div>
  );
};

export default ChatContainer;

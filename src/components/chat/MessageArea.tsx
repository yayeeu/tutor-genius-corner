import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Question } from '@/types/question';
import { Message } from '@/types/chat';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import { Card, CardContent } from '@/components/ui/card';
import TypingIndicator from './TypingIndicator';
import MessageGroup from './MessageGroup';
import { useMessageGroups } from '@/hooks/useMessageGroups';
import { useResponsive } from '@/hooks/useResponsive';
import Logger from '@/utils/logger';

interface QuestionData {
  id: string | number;
  question: string | Question;
  options?: string[];
  correctAnswer?: string;
}

interface MessageAreaProps {
  messages: Message[];
  isTyping: boolean;
  currentQuestion: QuestionData | null;
  feedback: string;
  isLoadingQuestion: boolean;
  handleAnswer: (isCorrect: boolean) => void;
  handleNextQuestion: () => void;
}

const MessageArea = ({ 
  messages, 
  isTyping, 
  currentQuestion, 
  feedback, 
  isLoadingQuestion, 
  handleAnswer, 
  handleNextQuestion 
}: MessageAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageGroups = useMessageGroups(messages);
  const { isMobile } = useResponsive();
  
  useEffect(() => {
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      Logger.error('Failed to scroll to bottom', { 
        context: 'MessageArea',
        error 
      });
    }
  }, [messages, isTyping]);

  return (
    <ScrollArea className={`flex-1 p-2 md:p-4 bg-gradient-to-b from-tutor-beige/30 to-white ${
      isMobile ? 'touch-pan-y' : ''
    }`}>
      <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto">
        {messageGroups.map((group, index) => {
          try {
            return (
              <MessageGroup 
                key={`group-${index}`} 
                messages={group} 
              />
            );
          } catch (error) {
            Logger.error('Failed to render message group', {
              context: 'MessageArea',
              error,
              groupIndex: index
            });
            return null;
          }
        })}
        
        {currentQuestion && (
          <div className="my-2 md:my-4 animate-fade-in">
            <QuizQuestion 
              id={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswer={currentQuestion.correctAnswer}
              onAnswer={handleAnswer}
            />
            
            {feedback && (
              <FeedbackCard 
                feedback={feedback} 
                onNextQuestion={handleNextQuestion}
              />
            )}
          </div>
        )}
        
        {isLoadingQuestion && (
          <div className="flex justify-center my-2 md:my-4">
            <Card className="w-full max-w-md p-3 md:p-4 border border-tutor-light-gray animate-pulse">
              <CardContent className="p-0">
                <div className="flex flex-col space-y-3 md:space-y-4">
                  <div className="h-5 md:h-6 bg-tutor-light-gray/50 rounded w-3/4"></div>
                  <div className="h-24 md:h-32 bg-tutor-light-gray/50 rounded w-full"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 md:h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                    <div className="h-6 md:h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                    <div className="h-6 md:h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                    <div className="h-6 md:h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageArea;

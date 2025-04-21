
import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Question } from '@/types/question';
import { Message } from '@/types/chat';  // Add this import for the Message type
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import { Card, CardContent } from '@/components/ui/card';
import TypingIndicator from './TypingIndicator';
import MessageGroup from './MessageGroup';
import { useMessageGroups } from '@/hooks/useMessageGroups';

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
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-tutor-beige/30 to-white">
      <div className="space-y-6 max-w-3xl mx-auto">
        {messageGroups.map((group, index) => (
          <MessageGroup key={`group-${index}`} messages={group} />
        ))}
        
        {currentQuestion && (
          <div className="my-4 animate-fade-in">
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
          <div className="flex justify-center my-4">
            <Card className="w-full max-w-md p-4 border border-tutor-light-gray animate-pulse">
              <CardContent className="p-0">
                <div className="flex flex-col space-y-4">
                  <div className="h-6 bg-tutor-light-gray/50 rounded w-3/4"></div>
                  <div className="h-32 bg-tutor-light-gray/50 rounded w-full"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                    <div className="h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                    <div className="h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
                    <div className="h-8 bg-tutor-light-gray/50 rounded w-1/4"></div>
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

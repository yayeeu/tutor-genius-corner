
import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import { QuestionData } from '@/data/practiceData';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
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
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-6 max-w-3xl mx-auto">
        {messages.map((message) => (
          <MessageItem 
            key={message.id}
            id={message.id}
            content={message.content}
            sender={message.sender}
          />
        ))}
        
        {currentQuestion && (
          <div className="my-4">
            <QuizQuestion 
              id={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswer={currentQuestion.correctAnswer}
              onAnswer={handleAnswer}
            />
            
            <FeedbackCard 
              feedback={feedback} 
              onNextQuestion={feedback ? handleNextQuestion : undefined}
            />
          </div>
        )}
        
        {isLoadingQuestion && (
          <div className="flex justify-center my-4">
            <Card className="w-full max-w-md p-4">
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="h-6 bg-tutor-light-gray rounded w-3/4"></div>
                <div className="h-32 bg-tutor-light-gray rounded w-full"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                  <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                  <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                  <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                </div>
              </div>
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

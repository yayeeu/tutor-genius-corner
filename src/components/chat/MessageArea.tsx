
import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import { QuestionData } from '@/data/practiceData';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
  }, [messages, isTyping]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Group consecutive AI messages for better visual separation
  const groupedMessages = messages.reduce((acc: Message[][], current) => {
    // Start a new group if this is the first message or if the sender changed
    if (acc.length === 0 || acc[acc.length - 1][0].sender !== current.sender) {
      acc.push([current]);
    } else {
      // Add to existing group
      acc[acc.length - 1].push(current);
    }
    return acc;
  }, []);

  return (
    <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-tutor-beige/30 to-white">
      <div className="space-y-6 max-w-3xl mx-auto">
        {groupedMessages.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className={cn(
            "space-y-1",
            group[0].sender === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'
          )}>
            {group.map((message) => (
              <MessageItem 
                key={message.id}
                id={message.id}
                content={message.content}
                sender={message.sender}
              />
            ))}
          </div>
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

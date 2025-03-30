
import { useState, useEffect } from 'react';
import { trackTutorSession } from '@/services/trackingService';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Initial messages to start the chat
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI tutor. How can I help you with your learning today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [currentSubject, setCurrentSubject] = useState<string | undefined>(undefined);
  
  // Start tracking session when component mounts
  useEffect(() => {
    setSessionStartTime(new Date());
    
    // End session tracking when component unmounts
    return () => {
      if (sessionStartTime && user && questionsAsked > 0) {
        const endTime = new Date();
        const durationMinutes = Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000);
        if (durationMinutes > 0) {
          trackTutorSession(durationMinutes, currentSubject, questionsAsked);
        }
      }
    };
  }, []);
  
  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      content: content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Increment questions asked counter
    setQuestionsAsked(prev => prev + 1);
    
    // Try to detect subject from message
    const subjects = [
      'Math', 'Mathematics', 'Algebra', 'Geometry', 'Calculus',
      'Physics', 'Science', 'Chemistry', 'Biology',
      'History', 'Geography', 
      'English', 'Literature', 'Grammar',
      'Amharic'
    ];
    
    for (const subject of subjects) {
      if (content.toLowerCase().includes(subject.toLowerCase())) {
        setCurrentSubject(subject);
        break;
      }
    }
    
    return userMessage;
  };
  
  const addAIMessage = (content: string) => {
    const aiMessage: Message = {
      id: messages.length + 1,
      content: content,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    return aiMessage;
  };
  
  return {
    messages,
    isTyping,
    setIsTyping,
    addUserMessage,
    addAIMessage
  };
};


import { useState, useEffect, useCallback } from 'react';
import { trackTutorSession } from '@/services/tracking';
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
    content: "Hello! I'm Aku, your AI tutor 🤓 How can I help you learn today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);
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
  
  const addUserMessage = useCallback((content: string) => {
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
  }, [messages.length, setQuestionsAsked, setCurrentSubject]);
  
  const addAIMessage = useCallback((content: string) => {
    const aiMessage: Message = {
      id: messages.length + 1,
      content: content,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    return aiMessage;
  }, [messages.length]);

  // New method for streaming responses
  const streamAIResponse = useCallback((initialContent: string = "") => {
    const messageId = messages.length + 1;
    
    // Create the initial message with empty or partial content
    const aiMessage: Message = {
      id: messageId,
      content: initialContent,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    setStreamingMessageId(messageId);
    
    return messageId;
  }, [messages.length]);
  
  // Update the streaming message content
  const updateStreamingMessage = useCallback((messageId: number, contentDelta: string) => {
    setMessages((prevMessages) => 
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          return { ...msg, content: msg.content + contentDelta };
        }
        return msg;
      })
    );
  }, []);
  
  // Finish streaming
  const finishStreaming = useCallback(() => {
    setStreamingMessageId(null);
    setIsTyping(false);
  }, []);
  
  return {
    messages,
    isTyping,
    setIsTyping,
    addUserMessage,
    addAIMessage,
    streamAIResponse,
    updateStreamingMessage,
    finishStreaming,
    streamingMessageId
  };
};


import { useState } from 'react';

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
  
  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      content: content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
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

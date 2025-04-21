
import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';
import Logger from '@/utils/logger';

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm Aku, your AI tutor 🤓 How can I help you learn today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);

  const addUserMessage = useCallback((content: string) => {
    try {
      const userMessage: Message = {
        id: messages.length + 1,
        content: content,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      
      return userMessage;
    } catch (error) {
      Logger.error('Failed to add user message', { error });
      throw error;
    }
  }, [messages.length]);

  const addAIMessage = useCallback((content: string) => {
    try {
      const aiMessage: Message = {
        id: messages.length + 1,
        content: content,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      return aiMessage;
    } catch (error) {
      Logger.error('Failed to add AI message', { error });
      throw error;
    }
  }, [messages.length]);

  const streamAIResponse = useCallback((initialContent: string = "") => {
    try {
      const messageId = messages.length + 1;
      
      const aiMessage: Message = {
        id: messageId,
        content: initialContent,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingMessageId(messageId);
      
      return messageId;
    } catch (error) {
      Logger.error('Failed to stream AI response', { error });
      throw error;
    }
  }, [messages.length]);
  
  const updateStreamingMessage = useCallback((messageId: number, contentDelta: string) => {
    try {
      setMessages((prevMessages) => 
        prevMessages.map((msg) => {
          if (msg.id === messageId) {
            return { ...msg, content: msg.content + contentDelta };
          }
          return msg;
        })
      );
    } catch (error) {
      Logger.error('Failed to update streaming message', { error });
      throw error;
    }
  }, []);
  
  const finishStreaming = useCallback(() => {
    setStreamingMessageId(null);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    streamingMessageId,
    addUserMessage,
    addAIMessage,
    streamAIResponse,
    updateStreamingMessage,
    finishStreaming,
    setIsTyping
  };
};

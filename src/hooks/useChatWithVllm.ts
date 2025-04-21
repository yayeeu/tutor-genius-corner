
import { useState, useCallback, useRef } from 'react';
import { Message } from '@/types/chat';
import { streamChatCompletion } from '@/services/vllmService';
import { useToast } from '@/hooks/use-toast';
import { trackTutorSession } from '@/services/tracking';
import { useAuth } from '@/contexts/AuthContext';

// Initial messages to start the chat
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm Aku, your AI tutor 🤓 How can I help you learn today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

export const useChatWithVllm = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(new Date());
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [currentSubject, setCurrentSubject] = useState<string | undefined>(undefined);
  
  // Reference to the current abort controller to cancel requests
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Track session when component unmounts
  const endSession = useCallback(() => {
    if (sessionStartTime && user && questionsAsked > 0) {
      const endTime = new Date();
      const durationMinutes = Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000);
      if (durationMinutes > 0) {
        trackTutorSession(durationMinutes, currentSubject, questionsAsked);
      }
    }
  }, [sessionStartTime, user, questionsAsked, currentSubject]);
  
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
  }, [messages.length]);
  
  const streamAIResponse = useCallback((initialContent: string = "") => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create a new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    // Create the initial message with empty or partial content
    const messageId = messages.length + 1;
    const aiMessage: Message = {
      id: messageId,
      content: initialContent,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
    setStreamingMessageId(messageId);
    setIsTyping(true);
    
    return messageId;
  }, [messages.length]);
  
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
  
  const finishStreaming = useCallback(() => {
    setStreamingMessageId(null);
    setIsTyping(false);
  }, []);
  
  const handleSendMessage = useCallback(async (message: string) => {
    // Add user message
    const userMsg = addUserMessage(message);
    
    try {
      // Create initial message for streaming
      const messageId = streamAIResponse();
      
      // Stream AI response from VLLM service
      await streamChatCompletion({
        messages: [...messages, userMsg],
        signal: abortControllerRef.current?.signal,
        onUpdate: (content) => updateStreamingMessage(messageId, content),
        onComplete: finishStreaming,
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to get a response. Please try again.",
            variant: "destructive",
          });
          finishStreaming();
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  }, [messages, addUserMessage, streamAIResponse, updateStreamingMessage, finishStreaming, toast]);
  
  return {
    messages,
    isTyping,
    streamingMessageId,
    handleSendMessage,
    addUserMessage,
    endSession
  };
};

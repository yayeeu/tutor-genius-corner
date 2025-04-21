
import { useRef, useCallback } from 'react';
import { streamChatCompletion } from '@/services/vllmService';
import { useToast } from '@/hooks/use-toast';
import { useMessages } from './useMessages';
import { useChatSession } from './useChatSession';
import Logger from '@/utils/logger';

export const useChatWithVllm = () => {
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { incrementQuestionsAsked, detectSubject } = useChatSession();
  const {
    messages,
    isTyping,
    streamingMessageId,
    addUserMessage: addMessage,
    streamAIResponse,
    updateStreamingMessage,
    finishStreaming,
  } = useMessages();

  const addUserMessage = useCallback((content: string) => {
    const message = addMessage(content);
    incrementQuestionsAsked();
    detectSubject(content);
    return message;
  }, [addMessage, incrementQuestionsAsked, detectSubject]);
  
  const handleSendMessage = useCallback(async (message: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    try {
      const userMsg = addUserMessage(message);
      const messageId = streamAIResponse();
      
      await streamChatCompletion({
        messages: [...messages, userMsg],
        signal: abortController.signal,
        onUpdate: (content) => updateStreamingMessage(messageId, content),
        onComplete: finishStreaming,
        onError: (error) => {
          Logger.error('Failed to get AI response', { error });
          toast({
            title: "Error",
            description: "Failed to get a response. Please try again.",
            variant: "destructive",
          });
          finishStreaming();
        }
      });
    } catch (error) {
      Logger.error('Error sending message:', { error });
      finishStreaming();
    }
  }, [messages, addUserMessage, streamAIResponse, updateStreamingMessage, finishStreaming, toast]);

  // Add this function to handle clean up when the component unmounts
  const endSession = useCallback(() => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    // Any other cleanup needed
    Logger.info('Chat session ended');
  }, []);

  return {
    messages,
    isTyping,
    streamingMessageId,
    handleSendMessage,
    addUserMessage,
    endSession // Add this to the returned object
  };
};

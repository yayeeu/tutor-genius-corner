import { Message } from '@/types/chat';

// API endpoints
const API_BASE_URL = "/api";

interface StreamResponse {
  content: string;
  isComplete: boolean;
}

export interface ChatCompletionOptions {
  messages: Message[];
  signal?: AbortSignal;
  onUpdate?: (content: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Streams a chat completion from the VLLM API
 */
export const streamChatCompletion = async ({
  messages,
  signal,
  onUpdate,
  onComplete,
  onError
}: ChatCompletionOptions) => {
  try {
    // In the future, this will be a real API call to your VLLM server
    // For now we'll keep the simulation logic but structured properly
    const userMessage = messages[messages.length - 1]?.content || "";
    
    // Get relevant emoji based on message content
    const initialEmoji = getRelevantEmoji(userMessage);
    
    // If we have an emoji, send it as an immediate update
    if (initialEmoji && onUpdate) {
      onUpdate(`${initialEmoji} `);
    }
    
    // Simulate streaming response
    const response = await simulateStreamingResponse(userMessage);
    
    // Process each chunk of the response
    for (const chunk of response) {
      if (signal?.aborted) {
        return;
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50));
      
      if (onUpdate) {
        onUpdate(chunk);
      }
    }
    
    if (onComplete) {
      onComplete();
    }
  } catch (error) {
    console.error("Error in VLLM service:", error);
    if (error.name !== 'AbortError' && onError) {
      onError(error instanceof Error ? error : new Error(String(error)));
    }
  }
};

/**
 * Fetch a question for practice based on a topic
 */
export const fetchTopicQuestion = async (topicName: string) => {
  try {
    // In the future, this will be a real API call to your VLLM server
    // For now we'll keep the mock implementation
    console.log(`Fetching question for topic: ${topicName}`);
    
    // Simulate API response
    return {
      id: Math.floor(Math.random() * 100) + 1,
      question: `${topicName}: What is the main concept behind this topic?`,
      options: [
        "Option A: This is the first explanation",
        "Option B: This is the second explanation",
        "Option C: This is the third explanation",
        "Option D: This is the fourth explanation"
      ],
      correctAnswer: "Option A: This is the first explanation"
    };
  } catch (error) {
    console.error(`Error fetching question for topic ${topicName}:`, error);
    throw error;
  }
};

// Helper utility functions
const getRelevantEmoji = (message: string) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('math') || lowerMessage.includes('calculation')) {
    return '🧮';
  } else if (lowerMessage.includes('science') || lowerMessage.includes('experiment')) {
    return '🔬';
  } else if (lowerMessage.includes('history')) {
    return '📜';
  } else if (lowerMessage.includes('geography')) {
    return '🌍';
  } else if (lowerMessage.includes('language') || lowerMessage.includes('grammar')) {
    return '📝';
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return '👋';
  } else if (lowerMessage.includes('thank')) {
    return '😊';
  } else {
    // Random selection of friendly emojis
    const emojis = ['✨', '🤔', '💡', '📚'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  }
};

// Simulate streaming response for demo purposes
const simulateStreamingResponse = async (message: string) => {
  const lowerMessage = message.toLowerCase();
  
  let response = "";
  
  if (lowerMessage.includes('math')) {
    response = "I'd be happy to help with math! Mathematics is all about problem-solving and logical thinking. What specific topic are you working on? Algebra, geometry, or something else?";
  } else if (lowerMessage.includes('science')) {
    response = "Science is fascinating! Are you studying biology, chemistry, physics, or another branch? Each has its own amazing discoveries to explore.";
  } else if (lowerMessage.includes('help')) {
    response = "I'm here to help you learn! Feel free to ask me about any subject or topic you're studying, and I'll do my best to explain it clearly. You can also ask for practice problems or examples.";
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = "Hello! It's great to see you! I'm Aku, your AI learning assistant. How can I help with your studies today?";
  } else {
    response = "That's an interesting question! Let's explore this topic together. Could you tell me more about what you're trying to learn? The more specific you can be, the better I can help you understand.";
  }
  
  // Convert the response into chunks to simulate streaming
  return response.split(' ').map((word, index) => {
    // Group words into chunks of 1-3 words
    const chunkSize = Math.floor(Math.random() * 3) + 1;
    const chunk = response.split(' ').slice(index * chunkSize, (index + 1) * chunkSize).join(' ');
    return chunk + ' ';
  });
};

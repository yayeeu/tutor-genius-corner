
import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI tutor. How can I help you with your learning today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const recentTopics = [
  "Quadratic Equations",
  "Scientific Method",
  "Properties of Matter",
  "Cell Biology",
  "Algebra Basics",
  "Chemical Reactions",
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const getAIResponse = (message: string): string => {
    // Simple response logic - would be replaced with real AI in production
    if (message.toLowerCase().includes('math')) {
      return "I'd be happy to help with math! What specific topic are you working on?";
    } else if (message.toLowerCase().includes('science')) {
      return "Science is fascinating! Are you studying biology, chemistry, physics, or another branch?";
    } else if (message.toLowerCase().includes('help')) {
      return "I'm here to help you learn! Feel free to ask me about any subject or topic you're studying, and I'll do my best to explain it clearly.";
    } else {
      return "That's an interesting question! Let's explore this topic together. Could you tell me more about what you're trying to learn?";
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex h-[calc(100vh-4rem)] animate-fade-in">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-tutor-beige border-r border-tutor-light-gray">
        <div className="p-4 border-b border-tutor-light-gray">
          <h2 className="font-semibold text-tutor-dark-gray">Learning Topics</h2>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-tutor-gray flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Recent Topics
              </h3>
              <ul className="space-y-2">
                {recentTopics.map((topic, index) => (
                  <li key={index}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                    >
                      <span>{topic}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-tutor-gray flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Recent Sessions
              </h3>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                  >
                    <span>Math Homework Help</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                  >
                    <span>Science Project Ideas</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-tutor-beige/30">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="AI Tutor" />
                    <AvatarFallback className="bg-tutor-orange text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={
                    message.sender === 'user'
                      ? 'chat-message-user'
                      : 'chat-message-ai'
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="AI Tutor" />
                  <AvatarFallback className="bg-tutor-orange text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="chat-message-ai">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <div className="p-4 border-t border-tutor-light-gray bg-white">
          <div className="max-w-3xl mx-auto flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-tutor-light-gray"
                >
                  <Sparkles className="h-4 w-4 text-tutor-orange" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  Explain this concept
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Give me practice problems
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Help me with homework
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Simplify this topic
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex-1 relative">
              <Input
                placeholder="Ask your tutor anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10 border-tutor-light-gray"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full text-tutor-orange hover:text-tutor-dark-orange hover:bg-transparent"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

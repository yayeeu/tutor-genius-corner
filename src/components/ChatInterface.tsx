import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import QuizQuestion from '@/components/QuizQuestion';
import FeedbackCard from '@/components/practice/FeedbackCard';
import { sampleQuestions, QuestionData } from '@/data/practiceData';

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
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [availableQuestions, setAvailableQuestions] = useState<QuestionData[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("Mathematics"); // Default subject
  
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

  const handleTopicSelect = (topicName: string) => {
    // Reset previous question state
    setFeedback("");
    
    // Get questions for this topic
    const questionsData = sampleQuestions;
    const subjectQuestions = questionsData[selectedSubject] || {};
    const topicQuestions = subjectQuestions[topicName] || [];
    
    setAvailableQuestions(topicQuestions);
    
    // Select a random question if we have any
    if (topicQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      setCurrentQuestion(topicQuestions[randomIndex]);
      
      // Add a message about the selected topic
      const aiMessage: Message = {
        id: messages.length + 1,
        content: `Let's practice "${topicName}". I've prepared a question for you:`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } else {
      setCurrentQuestion(null);
      
      // Inform the user that there are no questions for this topic
      const aiMessage: Message = {
        id: messages.length + 1,
        content: `I don't have any practice questions for "${topicName}" yet. Let me know if you'd like to discuss this topic instead.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleNextQuestion = () => {
    if (availableQuestions.length > 0) {
      // Get a different question than the current one if possible
      let newQuestions = availableQuestions;
      if (currentQuestion && availableQuestions.length > 1) {
        newQuestions = availableQuestions.filter(q => q.id !== currentQuestion.id);
      }
      
      const randomIndex = Math.floor(Math.random() * newQuestions.length);
      setCurrentQuestion(newQuestions[randomIndex]);
      setFeedback("");
      
      // Add a message about the new question
      const aiMessage: Message = {
        id: messages.length + 1,
        content: "Here's another question for you to practice:",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(
      isCorrect 
        ? "Great job! You've mastered this concept." 
        : "That's not quite right. Try reviewing the concept again."
    );
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
                      onClick={() => handleTopicSelect(topic)}
                    >
                      <span>{topic}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </li>
                ))}
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

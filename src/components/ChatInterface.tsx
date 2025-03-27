
import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles, BookOpen, ChevronRight, Clock } from 'lucide-react';
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
import { fetchRecentTopics, fetchRandomQuestion } from '@/services/apiService';
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface RecentTopic {
  topicName: string;
  createdAt: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI tutor. How can I help you with your learning today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [availableQuestions, setAvailableQuestions] = useState<QuestionData[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("Mathematics"); // Default subject
  const [recentTopics, setRecentTopics] = useState<RecentTopic[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch recent topics when component mounts
  useEffect(() => {
    const getRecentTopics = async () => {
      setIsLoadingTopics(true);
      try {
        const topics = await fetchRecentTopics();
        // Sort topics by createdAt in descending order (most recent first)
        const sortedTopics = topics.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        // Take the 5 most recent topics
        setRecentTopics(sortedTopics.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch recent topics:", error);
        toast({
          title: "Error",
          description: "Failed to load recent topics. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingTopics(false);
      }
    };
    
    getRecentTopics();
  }, []);
  
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

  const handleTopicSelect = async (topicName: string) => {
    // Reset previous question state
    setFeedback("");
    setIsLoadingQuestion(true);
    
    try {
      // Add a message about the selected topic
      const aiMessage: Message = {
        id: messages.length + 1,
        content: `Let's practice "${topicName}". I'm preparing a question for you...`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Fetch a random question for this topic
      const question = await fetchRandomQuestion(topicName);
      
      if (question) {
        setCurrentQuestion(question);
        
        // Update the available questions array with the fetched question
        setAvailableQuestions([question]);
      } else {
        // Handle case when no question is returned
        const noQuestionMessage: Message = {
          id: messages.length + 2,
          content: `I don't have any practice questions for "${topicName}" yet. Let me know if you'd like to discuss this topic instead.`,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, noQuestionMessage]);
      }
    } catch (error) {
      console.error(`Error handling topic selection for ${topicName}:`, error);
      toast({
        title: "Error",
        description: "Failed to load question. Please try again later.",
        variant: "destructive",
      });
      
      // Inform the user about the error
      const errorMessage: Message = {
        id: messages.length + 2,
        content: `I'm having trouble retrieving questions for "${topicName}". Let's try another topic or try again later.`,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestion) {
      setIsLoadingQuestion(true);
      setFeedback("");
      
      try {
        const topicName = currentQuestion.question.split(' ')[0]; // Simple extraction of topic from question
        const question = await fetchRandomQuestion(topicName);
        
        if (question) {
          setCurrentQuestion(question);
          
          // Add a message about the new question
          const aiMessage: Message = {
            id: messages.length + 1,
            content: "Here's another question for you to practice:",
            sender: 'ai',
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, aiMessage]);
        } else {
          const noMoreQuestionsMessage: Message = {
            id: messages.length + 1,
            content: "I don't have any more questions on this topic. Would you like to try a different topic?",
            sender: 'ai',
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, noMoreQuestionsMessage]);
        }
      } catch (error) {
        console.error("Error fetching next question:", error);
        toast({
          title: "Error",
          description: "Failed to load the next question. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingQuestion(false);
      }
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
                <Clock className="w-4 h-4 mr-2" />
                Recent Topics
              </h3>
              
              {isLoadingTopics ? (
                <div className="py-4 text-center text-tutor-gray">
                  <div className="animate-pulse flex flex-col space-y-2">
                    <div className="h-6 bg-tutor-light-gray rounded w-3/4 mx-auto"></div>
                    <div className="h-6 bg-tutor-light-gray rounded w-full mx-auto"></div>
                    <div className="h-6 bg-tutor-light-gray rounded w-5/6 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <ul className="space-y-2">
                  {recentTopics.length > 0 ? (
                    recentTopics.map((topic, index) => (
                      <li key={index}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                          onClick={() => handleTopicSelect(topic.topicName)}
                        >
                          <span>{topic.topicName}</span>
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </Button>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-tutor-gray italic px-2">No recent topics found</p>
                  )}
                </ul>
              )}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-tutor-gray flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Suggested Topics
              </h3>
              <ul className="space-y-2">
                {/* Static suggested topics */}
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                    onClick={() => handleTopicSelect("Algebra Basics")}
                  >
                    <span>Algebra Basics</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                    onClick={() => handleTopicSelect("Scientific Method")}
                  >
                    <span>Scientific Method</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                    onClick={() => handleTopicSelect("Grammar Rules")}
                  >
                    <span>Grammar Rules</span>
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
            
            {isLoadingQuestion && (
              <div className="flex justify-center my-4">
                <Card className="w-full max-w-md p-4">
                  <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-6 bg-tutor-light-gray rounded w-3/4"></div>
                    <div className="h-32 bg-tutor-light-gray rounded w-full"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                      <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                      <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                      <div className="h-8 bg-tutor-light-gray rounded w-1/4"></div>
                    </div>
                  </div>
                </Card>
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

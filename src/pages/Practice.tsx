
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, BookOpen, Send } from 'lucide-react';
import QuizQuestion from '@/components/QuizQuestion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Sample data for topics
const topicData = {
  "Mathematics": [
    { name: "Quadratic Equations", competency: 75 },
    { name: "Geometric Series", competency: 68 },
    { name: "Factorization", competency: 82 },
    { name: "Algebraic Expressions", competency: 59 },
    { name: "Linear Equations", competency: 90 },
    { name: "Trigonometry", competency: 65 },
    { name: "Calculus Basics", competency: 45 },
    { name: "Probability", competency: 72 }
  ],
  "Physics": [
    { name: "Newton's Laws", competency: 80 },
    { name: "Wave Properties", competency: 65 },
    { name: "Circuit Analysis", competency: 55 },
    { name: "Thermodynamics", competency: 70 },
    { name: "Optics", competency: 60 },
    { name: "Electromagnetism", competency: 50 },
    { name: "Quantum Mechanics", competency: 40 },
    { name: "Fluid Dynamics", competency: 75 }
  ],
  "Chemistry": [
    { name: "Chemical Bonding", competency: 85 },
    { name: "Reaction Rates", competency: 70 },
    { name: "Periodic Table", competency: 90 },
    { name: "Organic Chemistry", competency: 65 },
    { name: "Acids and Bases", competency: 75 },
    { name: "Thermochemistry", competency: 60 },
    { name: "Equilibrium", competency: 55 },
    { name: "Electrochemistry", competency: 50 }
  ],
  "Biology": [
    { name: "Cell Structure", competency: 80 },
    { name: "Evolution", competency: 75 },
    { name: "Nervous System", competency: 65 },
    { name: "Genetics", competency: 70 },
    { name: "Ecology", competency: 85 },
    { name: "Photosynthesis", competency: 60 },
    { name: "Human Anatomy", competency: 55 },
    { name: "Microbiology", competency: 50 }
  ],
  "Amharic": [
    { name: "Verb Conjugation", competency: 90 },
    { name: "Literary Analysis", competency: 85 },
    { name: "Essay Structure", competency: 80 },
    { name: "Grammar Rules", competency: 75 },
    { name: "Vocabulary", competency: 70 },
    { name: "Reading Comprehension", competency: 65 },
    { name: "Speaking Practice", competency: 60 },
    { name: "Cultural Context", competency: 55 }
  ],
  "English": [
    { name: "Essay Structure", competency: 85 },
    { name: "Literary Analysis", competency: 80 },
    { name: "Grammar Rules", competency: 75 },
    { name: "Vocabulary", competency: 70 },
    { name: "Reading Comprehension", competency: 65 },
    { name: "Speaking Practice", competency: 60 },
    { name: "Writing Skills", competency: 55 },
    { name: "Critical Thinking", competency: 50 }
  ]
};

// Sample quiz questions
const sampleQuestions = {
  "Mathematics": {
    "Quadratic Equations": [
      {
        id: 1,
        question: "Solve the quadratic equation: x² + 5x + 6 = 0",
        options: ["x = -2, -3", "x = 2, 3", "x = -1, -6", "x = 1, 6"],
        correctAnswer: "x = -2, -3"
      },
      {
        id: 2,
        question: "Which of the following is the quadratic formula?",
        options: [
          "x = (-b ± √(b² - 4ac)) / 2a",
          "x = -b / 2a",
          "x = -c / b",
          "x = a / b"
        ],
        correctAnswer: "x = (-b ± √(b² - 4ac)) / 2a"
      }
    ],
    "Geometric Series": [
      {
        id: 1,
        question: "What is the sum of the infinite geometric series 1 + 1/2 + 1/4 + 1/8 + ...?",
        options: ["1", "2", "0", "Infinity"],
        correctAnswer: "2"
      }
    ]
  },
  "Physics": {
    "Newton's Laws": [
      {
        id: 1,
        question: "Which of Newton's laws states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force?",
        options: ["First Law", "Second Law", "Third Law", "Law of Gravity"],
        correctAnswer: "First Law"
      }
    ]
  }
};

// Define a type for the sampleQuestions structure to help TypeScript
type QuestionData = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

type SubjectQuestions = {
  [topic: string]: QuestionData[];
};

type AllQuestions = {
  [subject: string]: SubjectQuestions;
};

const Practice = () => {
  const location = useLocation();
  const { subject } = useParams<{ subject: string }>();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string, message: string }>>([]);

  // Get subject from URL params or query string
  const subjectName = subject || new URLSearchParams(location.search).get('subject') || "Mathematics";

  // Get topics for the current subject
  const topics = topicData[subjectName as keyof typeof topicData] || [];
  
  // Calculate overall competency for the subject
  const overallCompetency = Math.round(
    topics.reduce((sum, topic) => sum + topic.competency, 0) / topics.length
  );

  useEffect(() => {
    // Reset selected topic when subject changes
    setSelectedTopic(null);
    setCurrentQuestion(null);
    setFeedback("");
    setChatHistory([]);
  }, [subjectName]);

  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(topicName);
    
    // Get questions for this topic using proper type casting
    const questionsData = sampleQuestions as AllQuestions;
    const subjectQuestions = questionsData[subjectName] || {};
    const topicQuestions = subjectQuestions[topicName] || [];
    
    // Select a random question if we have any
    if (topicQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      setCurrentQuestion(topicQuestions[randomIndex]);
    } else {
      setCurrentQuestion(null);
    }
    
    setFeedback("");
    setChatHistory([]);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    const newMessage = { sender: 'student', message: chatMessage };
    setChatHistory(prev => [...prev, newMessage]);
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        message: `I'll help you with your question about ${selectedTopic}. Try thinking about the fundamental principles we discussed earlier.` 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
    
    setChatMessage("");
  };

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(
      isCorrect 
        ? "Great job! You've mastered this concept." 
        : "That's not quite right. Try reviewing the concept again."
    );
  };

  const displayedTopics = showAllTopics ? topics : topics.slice(0, 5);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{subjectName} Practice</h1>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-tutor-gray">Overall Competency:</p>
            <div className="flex-1 max-w-xs">
              <Progress value={overallCompetency} className="h-2" />
            </div>
            <span className="font-medium">{overallCompetency}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with topics */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Learning Topics</CardTitle>
                <CardDescription>
                  Select a topic to practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {displayedTopics.map((topic, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border transition-all cursor-pointer hover:bg-gray-50 ${
                        selectedTopic === topic.name ? 'border-tutor-orange bg-orange-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleTopicSelect(topic.name)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{topic.name}</span>
                        <ChevronRight className="h-4 w-4 text-tutor-gray" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress value={topic.competency} className="h-1.5" />
                        </div>
                        <span className="text-xs font-medium text-tutor-gray">
                          {topic.competency}%
                        </span>
                      </div>
                    </div>
                  ))}

                  {topics.length > 5 && (
                    <Button
                      variant="ghost" 
                      className="w-full text-tutor-orange" 
                      onClick={() => setShowAllTopics(!showAllTopics)}
                    >
                      {showAllTopics ? 'Show Less' : 'Show More'}
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right content area with questions */}
          <div className="md:col-span-2">
            {selectedTopic ? (
              <div className="space-y-6">
                {currentQuestion ? (
                  <QuizQuestion 
                    id={currentQuestion.id}
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    correctAnswer={currentQuestion.correctAnswer}
                    onAnswer={handleAnswer}
                  />
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <p>No practice questions available for this topic yet.</p>
                    </CardContent>
                  </Card>
                )}

                {feedback && (
                  <Card className="bg-gray-50">
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-2">Feedback</h3>
                      <p>{feedback}</p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Discussion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                      {chatHistory.length === 0 ? (
                        <p className="text-tutor-gray text-sm">
                          Ask for hints or clarification about this question.
                        </p>
                      ) : (
                        chatHistory.map((chat, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg ${
                              chat.sender === 'ai' 
                                ? 'bg-orange-50 border border-orange-100' 
                                : 'bg-gray-100'
                            }`}
                          >
                            <p>{chat.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Ask a question about this topic..." 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-tutor-orange hover:bg-tutor-dark-orange"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-tutor-gray" />
                    <h3 className="text-xl font-medium mb-2">Select a Topic to Start Practicing</h3>
                    <p className="text-tutor-gray max-w-md mx-auto">
                      Choose a learning topic from the list on the left to start practicing with interactive questions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;

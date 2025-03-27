
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import QuizQuestion from '@/components/QuizQuestion';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';

// Sample questions for demo
const questions = [
  {
    id: 1,
    question: "What is the value of x in the equation 3x + 7 = 22?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5"
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of chemical bond?",
    options: ["Ionic bond", "Covalent bond", "Magnetic bond", "Hydrogen bond"],
    correctAnswer: "Magnetic bond"
  },
  {
    id: 3,
    question: "In which year was the Declaration of Independence signed?",
    options: ["1774", "1775", "1776", "1777"],
    correctAnswer: "1776"
  },
  {
    id: 4,
    question: "What is the correct way to write this sentence? ___ going to the store tomorrow.",
    options: ["There", "Their", "They're", "They are"],
    correctAnswer: "They're"
  },
  {
    id: 5,
    question: "What is the primary function of mitochondria in a cell?",
    options: [
      "Protein synthesis", 
      "Energy production", 
      "Cell division", 
      "Waste removal"
    ],
    correctAnswer: "Energy production"
  }
];

const ScreeningAssignment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Update progress when answering questions
  useEffect(() => {
    setProgress((answeredQuestions / questions.length) * 100);
  }, [answeredQuestions]);
  
  const handleAnswer = (isCorrect: boolean) => {
    setAnsweredQuestions(prev => prev + 1);
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job on that question.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Let's learn from this and move forward.",
        variant: "destructive",
      });
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };
  
  const handleContinue = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-tutor-beige flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-3xl">
        {!quizCompleted ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Knowledge Assessment
              </CardTitle>
              <CardDescription>
                Please answer the following questions to help us understand your current knowledge level.
              </CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <QuizQuestion
                id={questions[currentQuestionIndex].id}
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                correctAnswer={questions[currentQuestionIndex].correctAnswer}
                onAnswer={handleAnswer}
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full animate-fade-in">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Assessment Completed!
              </CardTitle>
              <CardDescription>
                Thank you for completing the assessment. Here's how you did:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-tutor-dark-gray mb-2">
                  {correctAnswers} / {questions.length}
                </p>
                <p className="text-tutor-gray">
                  Questions answered correctly
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Score</span>
                  <span className="font-medium">
                    {Math.round((correctAnswers / questions.length) * 100)}%
                  </span>
                </div>
                <Progress value={(correctAnswers / questions.length) * 100} className="h-2" />
              </div>
              
              <div className="bg-tutor-beige p-4 rounded-lg">
                <h3 className="font-medium mb-2">Your personalized learning plan is ready!</h3>
                <p className="text-tutor-gray text-sm">
                  Based on your assessment, we've identified areas where you excel and areas that need more attention. 
                  Head to your dashboard to see your personalized learning journey.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleContinue}
                className="w-full bg-tutor-orange hover:bg-tutor-dark-orange"
              >
                Continue to Dashboard
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScreeningAssignment;

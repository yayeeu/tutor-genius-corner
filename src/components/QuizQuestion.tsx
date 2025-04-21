
import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/question';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  
  const handleOptionSelect = (value: string) => {
    if (!submitted) {
      setSelectedOption(value);
    }
  };
  
  const handleSubmit = () => {
    if (!selectedOption || submitted) return;
    
    const correct = selectedOption === question.correctAnswerId;
    setIsCorrect(correct);
    setSubmitted(true);
    setIsAnimating(true);
    onAnswer(correct);
  };
  
  const getFeedbackColor = () => {
    if (!submitted || isCorrect === null) return 'bg-white';
    return isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  };
  
  const getOptionClass = (optionId: string) => {
    if (!submitted || selectedOption !== optionId) {
      return 'border-gray-200 bg-white';
    }
    
    if (optionId === question.correctAnswerId) {
      return 'border-green-500 bg-green-50';
    }
    
    return optionId === selectedOption
      ? 'border-red-500 bg-red-50'
      : 'border-gray-200 bg-white opacity-50';
  };
  
  return (
    <Card className={`w-full transition-all duration-300 ${isAnimating ? 'scale-102' : 'scale-100'} ${getFeedbackColor()}`}>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Level: {question.level}</h3>
          <p className="text-tutor-dark-gray">{question.content}</p>
        </div>
        
        <RadioGroup value={selectedOption || ''} className="space-y-3">
          {question.choices.map((choice, index) => (
            <div
              key={choice.id}
              className={`flex items-center space-x-2 p-3 border rounded-lg transition-all ${getOptionClass(choice.id)}`}
              onClick={() => handleOptionSelect(choice.id)}
            >
              <RadioGroupItem 
                value={choice.id} 
                id={`option-${choice.id}`} 
                disabled={submitted}
              />
              <Label 
                htmlFor={`option-${choice.id}`}
                className="flex-1 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span>
                    <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                    {choice.text}
                  </span>
                  
                  {submitted && choice.id === question.correctAnswerId && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  
                  {submitted && choice.id === selectedOption && choice.id !== question.correctAnswerId && (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {submitted && (
          <div className={`mt-4 p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-medium">
              {isCorrect 
                ? 'Correct! Well done.' 
                : `Incorrect. The correct answer was ${question.choices.find(c => c.id === question.correctAnswerId)?.text}.`
              }
            </p>
          </div>
        )}
        
        {!submitted && (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="w-full mt-6 bg-tutor-orange hover:bg-tutor-dark-orange"
          >
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;

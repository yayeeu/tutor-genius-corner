
import { useState } from 'react';
import { Question } from '@/types/question';
import { generateQuestion } from '@/services/mockQuestionService';
import { toast } from '@/hooks/use-toast';

export const useQuestionGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const generateNewQuestion = async (unitId: string) => {
    setIsLoading(true);
    try {
      const response = await generateQuestion(unitId);
      if (response.success) {
        setCurrentQuestion(response.data);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to generate question",
          variant: "destructive",
        });
        setCurrentQuestion(null);
      }
    } catch (error) {
      console.error('Error generating question:', error);
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive",
      });
      setCurrentQuestion(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentQuestion,
    generateNewQuestion
  };
};

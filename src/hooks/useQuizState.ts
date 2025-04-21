
import { useState, useCallback } from 'react';
import { QuestionData } from '@/data/practiceData';
import { fetchTopicQuestion } from '@/services/apiService'; // Updated import name
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { updateLearningActivity } from '@/services/tracking';

export const useQuizState = (addAIMessage: (content: string) => void) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const { user } = useAuth();
  
  const handleTopicSelect = useCallback(async (topicName: string) => {
    // Reset previous question state
    setFeedback("");
    setIsLoadingQuestion(true);
    
    try {
      // Add a message about the selected topic
      addAIMessage(`Let's practice "${topicName}". I'm preparing a question for you...`);
      
      // Fetch a random question for this topic
      const questionData = await fetchTopicQuestion(topicName);
      
      if (questionData) {
        // Transform the data to match our QuestionData type
        const transformedQuestion: QuestionData = {
          id: typeof questionData.id === 'string' ? parseInt(questionData.id, 10) || 0 : questionData.id,
          question: questionData.question,
          options: Array.isArray(questionData.options) 
            ? questionData.options.map(option => String(option))
            : typeof questionData.options === 'object' && questionData.options !== null
              ? Object.values(questionData.options).map(String)
              : ["Option A", "Option B", "Option C", "Option D"], // Fallback
          correctAnswer: questionData.correct_answer || ""
        };
        
        setCurrentQuestion(transformedQuestion);
      } else {
        // Handle case when no question is returned
        addAIMessage(`I don't have any practice questions for "${topicName}" yet. Let me know if you'd like to discuss this topic instead.`);
      }
    } catch (error) {
      console.error(`Error handling topic selection for ${topicName}:`, error);
      toast({
        title: "Error",
        description: "Failed to load question. Please try again later.",
        variant: "destructive",
      });
      
      // Inform the user about the error
      addAIMessage(`I'm having trouble retrieving questions for "${topicName}". Let's try another topic or try again later.`);
    } finally {
      setIsLoadingQuestion(false);
    }
  }, [addAIMessage]);

  const handleNextQuestion = useCallback(async () => {
    if (currentQuestion) {
      setIsLoadingQuestion(true);
      setFeedback("");
      
      try {
        const topicName = currentQuestion.question.split(' ')[0]; // Simple extraction of topic from question
        const questionData = await fetchTopicQuestion(topicName);
        
        if (questionData) {
          // Transform the data to match our QuestionData type
          const transformedQuestion: QuestionData = {
            id: typeof questionData.id === 'string' ? parseInt(questionData.id, 10) || 0 : questionData.id,
            question: questionData.question,
            options: Array.isArray(questionData.options) 
              ? questionData.options.map(option => String(option))
              : typeof questionData.options === 'object' && questionData.options !== null
                ? Object.values(questionData.options).map(String)
                : ["Option A", "Option B", "Option C", "Option D"], // Fallback
            correctAnswer: questionData.correct_answer || ""
          };
          
          setCurrentQuestion(transformedQuestion);
          
          // Add a message about the new question
          addAIMessage("Here's another question for you to practice:");
        } else {
          addAIMessage("I don't have any more questions on this topic. Would you like to try a different topic?");
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
  }, [currentQuestion, addAIMessage]);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setFeedback(
      isCorrect 
        ? "Great job! You've mastered this concept." 
        : "That's not quite right. Try reviewing the concept again."
    );
    
    // Track that a question was answered
    if (user) {
      updateLearningActivity(user.id, 0, 0, 1);
    }
  }, [user]);
  
  return {
    currentQuestion,
    feedback,
    isLoadingQuestion,
    handleTopicSelect,
    handleNextQuestion,
    handleAnswer,
    setCurrentQuestion // Add this to allow direct setting of questions
  };
};


import { useState } from 'react';
import { QuestionData } from '@/data/practiceData';
import { fetchRandomQuestion } from '@/services/apiService';
import { toast } from "@/hooks/use-toast";

export const useQuizState = (addAIMessage: (content: string) => void) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  
  const handleTopicSelect = async (topicName: string) => {
    // Reset previous question state
    setFeedback("");
    setIsLoadingQuestion(true);
    
    try {
      // Add a message about the selected topic
      addAIMessage(`Let's practice "${topicName}". I'm preparing a question for you...`);
      
      // Fetch a random question for this topic
      const question = await fetchRandomQuestion(topicName);
      
      if (question) {
        setCurrentQuestion(question);
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
  };

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(
      isCorrect 
        ? "Great job! You've mastered this concept." 
        : "That's not quite right. Try reviewing the concept again."
    );
  };
  
  return {
    currentQuestion,
    feedback,
    isLoadingQuestion,
    handleTopicSelect,
    handleNextQuestion,
    handleAnswer
  };
};

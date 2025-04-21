import { useState, useCallback } from 'react';
import { QuestionData } from '@/types/chat';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { updateLearningActivity } from '@/services/tracking';
import { fetchTopicQuestion } from '@/services/vllmService';
import { Question } from '@/types/question';

export const useAssignmentState = (addAIMessage: (content: string) => void) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [hasTakenAssignment, setHasTakenAssignment] = useState(false);
  const [assignmentInitialized, setAssignmentInitialized] = useState(false);
  const { user } = useAuth();
  
  // Determine if user has completed the assignment
  const checkAssignmentStatus = useCallback(() => {
    if (user && !assignmentInitialized) {
      setAssignmentInitialized(true);
      
      // Check local storage for assignment completion
      const hasCompletedAssignment = localStorage.getItem(`assignment_completed_${user.id}`);
      
      // Special handling for user "Yared Ayele"
      if (user.user_metadata?.full_name?.toLowerCase() === "yared ayele" && !hasCompletedAssignment) {
        // Automatically mark the assignment as completed for Yared
        localStorage.setItem(`assignment_completed_${user.id}`, 'true');
        setHasTakenAssignment(true);
        
        // Add a welcome message instead of starting the assessment
        setTimeout(() => {
          addAIMessage("Welcome back, Yared! 👋 How can I help you with your studies today?");
        }, 1000);
      } else if (!hasCompletedAssignment) {
        // First login - show welcome message and start assessment
        setTimeout(() => {
          addAIMessage("Welcome! 🤗 Let's get you started with a quick assignment to see your current level. Here are some random questions based on the curriculum.");
          setShowAssignment(true);
          // We'd normally set the first question here
        }, 1000);
      } else {
        setHasTakenAssignment(true);
      }
    }
  }, [user, addAIMessage, assignmentInitialized]);
  
  const handleAssignmentComplete = useCallback(() => {
    if (user) {
      localStorage.setItem(`assignment_completed_${user.id}`, 'true');
      setShowAssignment(false);
      setHasTakenAssignment(true);
      
      toast({
        title: "Assignment Completed! 🎉",
        description: "Thanks for completing the assignment. You can now explore all features.",
      });
      
      addAIMessage("Great job completing the assignment! 🌟 Now you can explore topics and ask me any questions you have about your studies.");
    }
  }, [user, toast, addAIMessage]);
  
  const handleTopicSelect = useCallback(async (topicName: string) => {
    // Reset previous question state
    setFeedback("");
    setIsLoadingQuestion(true);
    
    try {
      // Add a message about the selected topic
      addAIMessage(`Let's practice "${topicName}". I'm preparing a question for you...`);
      
      // Fetch a random question for this topic
      const question = await fetchTopicQuestion(topicName);
      
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
  }, [addAIMessage]);
  
  const handleNextQuestion = useCallback(async () => {
    if (currentQuestion) {
      setIsLoadingQuestion(true);
      setFeedback("");
      
      try {
        // Extract topic name safely based on question type
        const topicName = typeof currentQuestion.question === 'string' 
          ? currentQuestion.question.split(' ')[0] // Extract from string
          : currentQuestion.question.content.split(' ')[0]; // Extract from Question object's content
        
        const question = await fetchTopicQuestion(topicName);
        
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
  
  // Special handler for the assessment questions
  const handleAssessmentAnswer = useCallback((isCorrect: boolean) => {
    handleAnswer(isCorrect);
    
    // After delay, either show next question or complete the assignment 
    setTimeout(() => {
      // In a real implementation, we'd check the current question index and show the next one
      // For simplicity, we'll just complete the assignment
      handleAssignmentComplete();
    }, 2000);
  }, [handleAnswer, handleAssignmentComplete]);
  
  return {
    currentQuestion,
    feedback,
    isLoadingQuestion,
    showAssignment,
    hasTakenAssignment,
    assignmentInitialized,
    setCurrentQuestion,
    checkAssignmentStatus,
    handleTopicSelect,
    handleNextQuestion,
    handleAnswer,
    handleAssessmentAnswer,
    handleAssignmentComplete
  };
};

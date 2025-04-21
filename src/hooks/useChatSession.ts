
import { useState, useEffect, useCallback } from 'react';
import { trackTutorSession } from '@/services/tracking';
import { useAuth } from '@/contexts/AuthContext';
import Logger from '@/utils/logger';

export const useChatSession = () => {
  const { user } = useAuth();
  const [sessionStartTime] = useState<Date>(new Date());
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [currentSubject, setCurrentSubject] = useState<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      try {
        if (sessionStartTime && user && questionsAsked > 0) {
          const endTime = new Date();
          const durationMinutes = Math.round((endTime.getTime() - sessionStartTime.getTime()) / 60000);
          if (durationMinutes > 0) {
            trackTutorSession(durationMinutes, currentSubject, questionsAsked);
          }
        }
      } catch (error) {
        Logger.error('Failed to track session on cleanup', { error });
      }
    };
  }, [sessionStartTime, user, questionsAsked, currentSubject]);

  const detectSubject = useCallback((content: string) => {
    const subjects = [
      'Math', 'Mathematics', 'Algebra', 'Geometry', 'Calculus',
      'Physics', 'Science', 'Chemistry', 'Biology',
      'History', 'Geography', 
      'English', 'Literature', 'Grammar',
      'Amharic'
    ];
    
    for (const subject of subjects) {
      if (content.toLowerCase().includes(subject.toLowerCase())) {
        setCurrentSubject(subject);
        break;
      }
    }
  }, []);

  const incrementQuestionsAsked = useCallback(() => {
    setQuestionsAsked(prev => prev + 1);
  }, []);

  return {
    questionsAsked,
    currentSubject,
    detectSubject,
    incrementQuestionsAsked
  };
};

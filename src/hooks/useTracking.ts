import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getWeeklyProgressData, 
  getTotalTopicsCovered, 
  getTotalTutorSessions, 
  getOverallMastery,
  trackTopicView,
  trackTutorSession,
  updateLearningActivity,
  updateTopicMastery
} from '@/services/trackingService';

export const useTracking = () => {
  const { user } = useAuth();
  const [weeklyProgressData, setWeeklyProgressData] = useState<{ day: string, progress: number }[]>([]);
  const [totalTopics, setTotalTopics] = useState<number>(0);
  const [totalTutorSessions, setTotalTutorSessions] = useState<number>(0);
  const [overallMastery, setOverallMastery] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (user) {
      fetchTrackingData();
      
      // Start session timer
      const startTime = new Date();
      
      // Update learning activity with time spent when component unmounts
      return () => {
        const endTime = new Date();
        const minutesSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
        if (minutesSpent > 0) {
          updateLearningActivity(user.id, 0, minutesSpent);
        }
      };
    }
  }, [user]);

  const fetchTrackingData = async () => {
    setIsLoading(true);
    try {
      const [
        progressData,
        topicsCount,
        sessionsCount,
        masteryPercentage
      ] = await Promise.all([
        getWeeklyProgressData(),
        getTotalTopicsCovered(),
        getTotalTutorSessions(),
        getOverallMastery()
      ]);

      setWeeklyProgressData(progressData);
      setTotalTopics(topicsCount);
      setTotalTutorSessions(sessionsCount);
      setOverallMastery(masteryPercentage);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackTopic = async (topicName: string, subjectName: string, masteryLevel: number = 0) => {
    await trackTopicView(topicName, subjectName, masteryLevel);
    // Refresh data after tracking
    fetchTrackingData();
  };

  const trackSession = async (durationMinutes: number, subject?: string, questionsAsked: number = 0) => {
    await trackTutorSession(durationMinutes, subject, questionsAsked);
    // Refresh data after tracking
    fetchTrackingData();
  };

  const trackMastery = async (unitId: string, masteryScore: number) => {
    await updateTopicMastery(unitId, masteryScore);
    // Refresh data after tracking
    fetchTrackingData();
  };

  return {
    weeklyProgressData,
    totalTopics,
    totalTutorSessions,
    overallMastery,
    isLoading,
    trackTopic,
    trackSession,
    trackMastery,
    refreshData: fetchTrackingData
  };
};

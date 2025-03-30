
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface WeakTopicData {
  unitId: string;
  topicName: string;
  masteryScore: number;
}

export const useWeakestTopics = () => {
  const [weakestTopics, setWeakestTopics] = useState<WeakTopicData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWeakestTopics();
    }
  }, [user]);

  const fetchWeakestTopics = async () => {
    setIsLoading(true);
    try {
      // Get the lowest mastery scores
      const { data, error } = await supabase
        .from('student_topic_mastery')
        .select('unit_id, mastery_score')
        .eq('user_id', user?.id)
        .order('mastery_score', { ascending: true })
        .limit(3);

      if (error) throw error;

      if (data && data.length > 0) {
        // Fetch the unit names
        const unitIds = data.map(item => item.unit_id);
        const { data: unitsData, error: unitsError } = await supabase
          .from('units')
          .select('id, name')
          .in('id', unitIds);

        if (unitsError) throw unitsError;

        // Map the data to the format needed
        const formattedData = data.map(item => {
          const unit = unitsData?.find(unit => unit.id === item.unit_id);
          return {
            unitId: item.unit_id,
            topicName: unit?.name || 'Unknown Topic',
            masteryScore: item.mastery_score
          };
        });

        setWeakestTopics(formattedData);
      } else {
        // Return empty array instead of fallback data
        setWeakestTopics([]);
      }
    } catch (error) {
      console.error('Error fetching weakest topics:', error);
      // Return empty array instead of fallback data
      setWeakestTopics([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weakestTopics,
    isLoading,
    refreshData: fetchWeakestTopics
  };
};

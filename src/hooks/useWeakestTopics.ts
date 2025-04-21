
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface WeakTopic {
  unitId: string;
  topicName: string;
  masteryScore: number;
}

export const useWeakestTopics = () => {
  const [weakestTopics, setWeakestTopics] = useState<WeakTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWeakestTopics = async () => {
      if (!user) return;

      try {
        // First get student's grade level
        const { data: studentData } = await supabase
          .from('students')
          .select('grade_level')
          .eq('id', user.id)
          .single();

        const gradeLevel = studentData?.grade_level;

        // Get topics with low mastery scores from available courses matching grade level
        const { data, error } = await supabase
          .from('student_topic_mastery')
          .select(`
            unit_id,
            mastery_score,
            units!inner (
              name,
              courses!inner (
                grade_level,
                is_available
              )
            )
          `)
          .eq('user_id', user.id)
          .eq('units.courses.grade_level', gradeLevel)
          .eq('units.courses.is_available', true)
          .lt('mastery_score', 0.7) // Topics with less than 70% mastery
          .order('mastery_score', { ascending: true })
          .limit(5);

        if (error) throw error;

        const formattedTopics = (data || []).map(topic => ({
          unitId: topic.unit_id,
          topicName: topic.units.name,
          masteryScore: topic.mastery_score || 0
        }));

        setWeakestTopics(formattedTopics);
      } catch (error) {
        console.error('Error fetching weakest topics:', error);
        setWeakestTopics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeakestTopics();
  }, [user]);

  return { weakestTopics, isLoading };
};


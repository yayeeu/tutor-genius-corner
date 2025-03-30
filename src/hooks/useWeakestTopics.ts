
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
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchWeakestTopics = async () => {
    setIsLoading(true);
    try {
      // Get the lowest mastery scores
      const { data: masteryData, error: masteryError } = await supabase
        .from('student_topic_mastery')
        .select('unit_id, mastery_score')
        .eq('user_id', user?.id)
        .order('mastery_score', { ascending: true })
        .limit(3);

      if (masteryError) throw masteryError;

      if (masteryData && masteryData.length > 0) {
        // User has mastery data - fetch the unit names
        const unitIds = masteryData.map(item => item.unit_id);
        const { data: unitsData, error: unitsError } = await supabase
          .from('units')
          .select('id, name')
          .in('id', unitIds);

        if (unitsError) throw unitsError;

        // Map the data to the format needed
        const formattedData = masteryData.map(item => {
          const unit = unitsData?.find(unit => unit.id === item.unit_id);
          return {
            unitId: item.unit_id,
            topicName: unit?.name || 'Unknown Topic',
            masteryScore: item.mastery_score
          };
        });

        setWeakestTopics(formattedData);
      } else {
        // No mastery data available - get user's grade level
        let gradeLevel = 9; // Default to grade 9 if not found
        
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .select('grade_level')
          .eq('id', user?.id)
          .single();
        
        if (!studentError && studentData) {
          gradeLevel = studentData.grade_level || 9;
        }
        
        // Get courses for this grade
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('id')
          .eq('grade_level', gradeLevel);
          
        if (coursesError) throw coursesError;
        
        if (coursesData && coursesData.length > 0) {
          // Get random units from these courses
          const courseIds = coursesData.map(course => course.id);
          
          const { data: randomUnits, error: unitsError } = await supabase
            .from('units')
            .select('id, name, course_id')
            .in('course_id', courseIds)
            .limit(3);
            
          if (unitsError) throw unitsError;
          
          if (randomUnits && randomUnits.length > 0) {
            // Format the random units data
            const formattedData = randomUnits.map(unit => ({
              unitId: unit.id,
              topicName: unit.name,
              masteryScore: 0
            }));
            
            setWeakestTopics(formattedData);
          } else {
            setWeakestTopics([]);
          }
        } else {
          setWeakestTopics([]);
        }
      }
    } catch (error) {
      console.error('Error fetching weakest topics:', error);
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

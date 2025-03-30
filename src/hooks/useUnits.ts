
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UnitData {
  id: string;
  name: string;
  competency: number; // Calculated from student_topic_mastery
}

export const useUnits = (courseId: string | null) => {
  const [units, setUnits] = useState<UnitData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user && courseId) {
      fetchUnits(courseId);
    } else {
      setIsLoading(false);
      setUnits([]);
    }
  }, [user, courseId]);

  const fetchUnits = async (courseId: string) => {
    setIsLoading(true);
    try {
      // Get units for the specified course
      const { data: unitsData, error: unitsError } = await supabase
        .from('units')
        .select('id, name')
        .eq('course_id', courseId);

      if (unitsError) throw unitsError;

      if (unitsData && unitsData.length > 0) {
        // For each unit, get mastery data if available
        const enrichedUnits = await Promise.all(
          unitsData.map(async (unit) => {
            // Get student mastery for this unit
            const { data: masteryData, error: masteryError } = await supabase
              .from('student_topic_mastery')
              .select('mastery_score')
              .eq('user_id', user?.id)
              .eq('unit_id', unit.id)
              .single();

            if (masteryError && masteryError.code !== 'PGRST116') { // Not found is ok
              console.error('Error fetching mastery data:', masteryError);
            }

            // Set competency from mastery data or default to 0
            const competency = masteryData?.mastery_score 
              ? Math.round(masteryData.mastery_score * 100) 
              : 0;

            return {
              id: unit.id,
              name: unit.name,
              competency
            };
          })
        );

        setUnits(enrichedUnits);
      } else {
        setUnits([]);
      }
    } catch (error) {
      console.error('Error fetching units:', error);
      setUnits([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    units,
    isLoading,
    refreshData: () => fetchUnits(courseId || '')
  };
};

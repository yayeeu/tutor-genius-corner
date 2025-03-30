
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface StrengthData {
  subject: string;
  score: number;
}

export const useStrengths = () => {
  const [strengthsData, setStrengthsData] = useState<StrengthData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchStrengthsData();
    }
  }, [user]);

  const fetchStrengthsData = async () => {
    setIsLoading(true);
    try {
      // Get mastery scores from student_topic_mastery table
      const { data, error } = await supabase
        .from('student_topic_mastery')
        .select('unit_id, mastery_score')
        .eq('user_id', user?.id)
        .order('mastery_score', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Fetch the unit names to use as subjects
        const unitIds = data.map(item => item.unit_id);
        const { data: unitsData, error: unitsError } = await supabase
          .from('units')
          .select('id, name')
          .in('id', unitIds);

        if (unitsError) throw unitsError;

        // Map the data to the format needed for the chart
        const formattedData = data.map(item => {
          const unit = unitsData?.find(unit => unit.id === item.unit_id);
          return {
            subject: unit?.name || 'Unknown Subject',
            score: Math.round(item.mastery_score * 100) // Convert to percentage
          };
        });

        setStrengthsData(formattedData.slice(0, 4)); // Limit to top 4 strengths
      } else {
        // No fallback data - return empty array
        setStrengthsData([]);
      }
    } catch (error) {
      console.error('Error fetching strengths data:', error);
      // No fallback data - return empty array
      setStrengthsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    strengthsData,
    isLoading,
    refreshData: fetchStrengthsData
  };
};

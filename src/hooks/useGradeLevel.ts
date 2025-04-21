
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useGradeLevel = () => {
  const { user } = useAuth();
  const [gradeLevel, setGradeLevel] = useState<number | null>(null);

  useEffect(() => {
    const fetchGradeLevel = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('students')
        .select('grade_level')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching grade level:', error);
        return;
      }
      
      setGradeLevel(data?.grade_level || null);
    };

    fetchGradeLevel();
  }, [user]);

  return gradeLevel;
};

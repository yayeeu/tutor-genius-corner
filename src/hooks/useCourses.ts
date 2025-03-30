
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface CourseData {
  id: string;
  title: string;
  description: string;
  progress: number;
  recentTopics: string[];
}

export const useCourses = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      // Get courses data
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('id, name, grade_level');

      if (coursesError) throw coursesError;

      if (coursesData && coursesData.length > 0) {
        // For each course, get its units
        const enrichedCourses = await Promise.all(
          coursesData.map(async (course) => {
            // Get units for this course
            const { data: unitsData, error: unitsError } = await supabase
              .from('units')
              .select('id, name')
              .eq('course_id', course.id);

            if (unitsError) throw unitsError;

            // Get student mastery for this course
            const { data: masteryData, error: masteryError } = await supabase
              .from('student_topic_mastery')
              .select('unit_id, mastery_score')
              .eq('user_id', user?.id)
              .in(
                'unit_id', 
                unitsData?.map(unit => unit.id) || []
              );

            if (masteryError) throw masteryError;

            // Calculate overall progress for the course
            let progress = 0;
            if (masteryData && masteryData.length > 0 && unitsData && unitsData.length > 0) {
              const avgMastery = masteryData.reduce((sum, item) => sum + (item.mastery_score || 0), 0) / unitsData.length;
              progress = Math.round(avgMastery * 100);
            }

            // Get recent topics (unit names) - limit to 3
            const recentTopics = unitsData ? 
              unitsData.slice(0, 3).map(unit => unit.name) : 
              [];

            // Create course object
            return {
              id: course.id,
              title: course.name,
              description: `Grade ${course.grade_level}`,
              progress,
              recentTopics
            };
          })
        );

        setCourses(enrichedCourses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    courses,
    isLoading,
    refreshData: fetchCourses
  };
};

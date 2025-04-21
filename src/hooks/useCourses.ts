
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  fetchStudentGradeLevel, 
  fetchAvailableCourses, 
  fetchCourseUnits, 
  fetchStudentMastery 
} from '@/utils/courseUtils';

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
      // Get student's grade level
      const gradeLevel = await fetchStudentGradeLevel(user?.id);
      
      if (!gradeLevel) {
        console.log('No grade level set for student');
        setCourses([]);
        return;
      }

      // Get available courses for grade level
      const coursesData = await fetchAvailableCourses(gradeLevel);

      if (coursesData.length > 0) {
        // Process each course
        const enrichedCourses = await Promise.all(
          coursesData.map(async (course) => {
            // Get units for this course
            const unitsData = await fetchCourseUnits(course.id);

            // Get student mastery data
            const masteryData = await fetchStudentMastery(
              user?.id || '', 
              unitsData.map(unit => unit.id)
            );

            // Calculate progress
            let progress = 0;
            if (masteryData.length > 0 && unitsData.length > 0) {
              const avgMastery = masteryData.reduce(
                (sum, item) => sum + (item.mastery_score || 0), 
                0
              ) / unitsData.length;
              progress = Math.round(avgMastery * 100);
            }

            // Get recent topics
            const recentTopics = unitsData ? 
              unitsData.slice(0, 3).map(unit => unit.name) : 
              [];

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


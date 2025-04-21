
import { supabase } from '@/integrations/supabase/client';
import { CourseData } from '@/hooks/useCourses';

export const fetchStudentGradeLevel = async (userId: string | undefined) => {
  if (!userId) throw new Error('No user ID provided');
  
  const { data, error } = await supabase
    .from('students')
    .select('grade_level')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching student grade level:', error);
    throw error;
  }

  return data?.grade_level;
};

export const fetchAvailableCourses = async (gradeLevel: number) => {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, grade_level')
    .eq('is_available', true)
    .eq('grade_level', gradeLevel);

  if (error) throw error;
  return data || [];
};

export const fetchCourseUnits = async (courseId: string) => {
  const { data, error } = await supabase
    .from('units')
    .select('id, name')
    .eq('course_id', courseId);

  if (error) throw error;
  return data || [];
};

export const fetchStudentMastery = async (userId: string, unitIds: string[]) => {
  if (unitIds.length === 0) return [];
  
  const { data, error } = await supabase
    .from('student_topic_mastery')
    .select('unit_id, mastery_score')
    .eq('user_id', userId)
    .in('unit_id', unitIds);

  if (error) throw error;
  return data || [];
};


import { supabase } from '@/integrations/supabase/client';

export interface RecentTopic {
  topicName: string;
  createdAt: string;
}

export const fetchRecentTopics = async (): Promise<RecentTopic[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot fetch recent topics: User not authenticated');
      return [];
    }

    // First get the student's grade level
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('grade_level')
      .eq('id', user.id)
      .single();

    if (studentError) {
      console.error('Error fetching student data:', studentError);
      return [];
    }

    const gradeLevel = studentData?.grade_level;

    // Get the user's recent topics from available courses matching their grade
    const { data, error } = await supabase
      .from('topics_covered')
      .select(`
        topic_name,
        last_studied_at,
        created_at,
        units!inner (
          id,
          courses!inner (
            id,
            grade_level,
            is_available
          )
        )
      `)
      .eq('user_id', user.id)
      .eq('units.courses.grade_level', gradeLevel)
      .eq('units.courses.is_available', true)
      .order('last_studied_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return [];
    }
    
    return data.map(topic => ({
      topicName: topic.topic_name,
      createdAt: topic.last_studied_at || topic.created_at
    }));
  } catch (error) {
    console.error('Error fetching recent topics:', error);
    return [];
  }
};

// Renamed from fetchRandomQuestion to fetchTopicQuestion to match usage
export const fetchTopicQuestion = async (topic: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get student's grade level
    const { data: studentData } = await supabase
      .from('students')
      .select('grade_level')
      .eq('id', user.id)
      .single();

    const gradeLevel = studentData?.grade_level;

    // Get questions from available courses matching the student's grade
    const { data, error } = await supabase
      .from('questions_generated')
      .select(`
        *,
        units!inner (
          courses!inner (
            grade_level,
            is_available
          )
        )
      `)
      .eq('units.courses.grade_level', gradeLevel)
      .eq('units.courses.is_available', true)
      .limit(1);

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
};

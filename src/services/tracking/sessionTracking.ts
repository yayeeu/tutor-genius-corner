
import { supabase } from '@/integrations/supabase/client';

// Track tutor session
export const trackTutorSession = async (durationMinutes: number, subject?: string, questionsAsked: number = 0) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot track tutor session: User not authenticated');
      return;
    }

    const { error } = await supabase
      .from('tutor_sessions')
      .insert({
        user_id: user.id,
        duration_minutes: durationMinutes,
        subject,
        questions_asked: questionsAsked
      });

    if (error) throw error;

  } catch (error) {
    console.error('Error tracking tutor session:', error);
  }
};

// Get total tutor sessions
export const getTotalTutorSessions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot get tutor sessions: User not authenticated');
      return 0;
    }

    const { count, error } = await supabase
      .from('tutor_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (error) throw error;
    
    return count || 0;
    
  } catch (error) {
    console.error('Error getting tutor sessions count:', error);
    return 0;
  }
};

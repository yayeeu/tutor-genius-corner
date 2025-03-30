
import { supabase } from '@/integrations/supabase/client';

// Update or create learning activity for today
export const updateLearningActivity = async (userId: string, topicsViewed: number = 0, minutesSpent: number = 0) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Check if an entry for today already exists
    const { data: existingActivity } = await supabase
      .from('learning_activity')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today);

    if (existingActivity && existingActivity.length > 0) {
      // Update existing entry
      const { error } = await supabase
        .from('learning_activity')
        .update({
          topics_viewed: existingActivity[0].topics_viewed + topicsViewed,
          minutes_spent: existingActivity[0].minutes_spent + minutesSpent
        })
        .eq('id', existingActivity[0].id);

      if (error) throw error;
    } else {
      // Create new entry for today
      const { error } = await supabase
        .from('learning_activity')
        .insert({
          user_id: userId,
          date: today,
          topics_viewed: topicsViewed,
          minutes_spent: minutesSpent
        });

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error updating learning activity:', error);
  }
};

// Get total topics covered
export const getTotalTopicsCovered = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot get topics covered: User not authenticated');
      return 0;
    }

    const { count, error } = await supabase
      .from('topics_covered')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (error) throw error;
    
    return count || 0;
    
  } catch (error) {
    console.error('Error getting topics covered count:', error);
    return 0;
  }
};

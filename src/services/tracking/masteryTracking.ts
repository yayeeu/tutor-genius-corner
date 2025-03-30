
import { supabase } from '@/integrations/supabase/client';

// Get overall mastery
export const getOverallMastery = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot get overall mastery: User not authenticated');
      return 0;
    }

    const { data, error } = await supabase
      .from('topics_covered')
      .select('mastery_level')
      .eq('user_id', user.id);

    if (error) throw error;
    
    if (!data || data.length === 0) return 0;
    
    // Calculate average mastery level
    const totalMastery = data.reduce((sum, topic) => sum + topic.mastery_level, 0);
    return Math.round(totalMastery / data.length);
    
  } catch (error) {
    console.error('Error getting overall mastery:', error);
    return 0;
  }
};

// Update mastery score for a specific topic
export const updateTopicMastery = async (unitId: string, masteryScore: number) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot update topic mastery: User not authenticated');
      return;
    }

    // Check if an entry for this unit/user already exists
    const { data: existingMastery } = await supabase
      .from('student_topic_mastery')
      .select('*')
      .eq('user_id', user.id)
      .eq('unit_id', unitId);

    if (existingMastery && existingMastery.length > 0) {
      // Update existing entry
      const { error } = await supabase
        .from('student_topic_mastery')
        .update({
          mastery_score: masteryScore,
          last_updated: new Date().toISOString()
        })
        .eq('id', existingMastery[0].id);

      if (error) throw error;
    } else {
      // Create new entry
      const { error } = await supabase
        .from('student_topic_mastery')
        .insert({
          user_id: user.id,
          unit_id: unitId,
          mastery_score: masteryScore,
          last_updated: new Date().toISOString()
        });

      if (error) throw error;
    }
  } catch (error) {
    console.error('Error updating topic mastery:', error);
  }
};

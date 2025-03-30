
import { supabase } from '@/integrations/supabase/client';
import { updateLearningActivity } from './activityTracking';

// Track when a user views a topic
export const trackTopicView = async (topicName: string, subjectName: string, masteryLevel: number = 0) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot track topic view: User not authenticated');
      return;
    }

    // First check if the topic already exists for this user
    const { data: existingTopics } = await supabase
      .from('topics_covered')
      .select('*')
      .eq('user_id', user.id)
      .eq('topic_name', topicName)
      .eq('subject_name', subjectName);

    if (existingTopics && existingTopics.length > 0) {
      // Update existing topic
      const { error } = await supabase
        .from('topics_covered')
        .update({
          last_studied_at: new Date().toISOString(),
          mastery_level: masteryLevel > existingTopics[0].mastery_level 
            ? masteryLevel 
            : existingTopics[0].mastery_level
        })
        .eq('id', existingTopics[0].id);

      if (error) throw error;
    } else {
      // Insert new topic
      const { error } = await supabase
        .from('topics_covered')
        .insert({
          user_id: user.id,
          topic_name: topicName,
          subject_name: subjectName,
          mastery_level: masteryLevel
        });

      if (error) throw error;
    }

    // Also update learning activity for today
    await updateLearningActivity(user.id, 1);

  } catch (error) {
    console.error('Error tracking topic view:', error);
  }
};

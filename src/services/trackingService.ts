import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

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

// Get weekly progress data
export const getWeeklyProgressData = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot get weekly progress: User not authenticated');
      return [];
    }

    // Get data for the last 7 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // Last 7 days including today

    const { data, error } = await supabase
      .from('learning_activity')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;

    // Format data for chart
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create a map of all days in the last week
    const progressMap = new Map();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - 6 + i);
      const dayName = weekDays[date.getDay()];
      progressMap.set(dayName, { day: dayName, progress: 0 });
    }
    
    // Fill in actual data where available
    data?.forEach(activity => {
      const activityDate = new Date(activity.date);
      const dayName = weekDays[activityDate.getDay()];
      // Calculate progress as a function of time spent and topics viewed
      const progress = Math.min(100, activity.minutes_spent + activity.topics_viewed * 10);
      progressMap.set(dayName, { day: dayName, progress });
    });
    
    return Array.from(progressMap.values());
    
  } catch (error) {
    console.error('Error getting weekly progress:', error);
    return [];
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

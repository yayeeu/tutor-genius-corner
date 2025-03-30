
import { supabase } from '@/integrations/supabase/client';

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
      // Calculate progress based on questions answered
      const progress = Math.min(100, (activity.questions_answered * 10));
      progressMap.set(dayName, { day: dayName, progress });
    });
    
    return Array.from(progressMap.values());
    
  } catch (error) {
    console.error('Error getting weekly progress:', error);
    return [];
  }
};

// Get total questions answered for all time
export const getTotalQuestionsAnswered = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Cannot get total questions: User not authenticated');
      return 0;
    }

    const { data, error } = await supabase
      .from('learning_activity')
      .select('questions_answered')
      .eq('user_id', user.id);

    if (error) throw error;
    
    const totalQuestions = data?.reduce((sum, activity) => 
      sum + (activity.questions_answered || 0), 0) || 0;
    
    return totalQuestions;
    
  } catch (error) {
    console.error('Error getting total questions answered:', error);
    return 0;
  }
};

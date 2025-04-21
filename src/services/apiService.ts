import { supabase } from '@/integrations/supabase/client';
import { fetchTopicQuestion } from './vllmService';

interface RecentTopic {
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

    // Get the user's recent topics from the topics_covered table
    const { data, error } = await supabase
      .from('topics_covered')
      .select('topic_name, last_studied_at, created_at')
      .eq('user_id', user.id)
      .order('last_studied_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Format the data for the UI
    return data.map(topic => ({
      topicName: topic.topic_name,
      createdAt: topic.last_studied_at || topic.created_at
    }));
  } catch (error) {
    console.error('Error fetching recent topics:', error);
    return [];
  }
};

// We've moved the fetchRandomQuestion functionality to vllmService.ts
// but we'll keep this as a compatibility layer for now
export const fetchRandomQuestion = fetchTopicQuestion;

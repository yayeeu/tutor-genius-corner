
import { supabase } from '@/integrations/supabase/client';

interface RecentTopic {
  topicName: string;
  createdAt: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
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

export const fetchRandomQuestion = async (topicName: string): Promise<Question | null> => {
  try {
    // In development, we'll mock the response since the endpoint doesn't exist
    // In production, this would be:
    // const response = await fetch(`/get-question?topic=${encodeURIComponent(topicName)}`);
    
    // Mock implementation for development
    console.log(`Fetching question for topic: ${topicName}`);
    
    // Simulate API response
    return {
      id: Math.floor(Math.random() * 100) + 1,
      question: `${topicName}: What is the main concept behind this topic?`,
      options: [
        "Option A: This is the first explanation",
        "Option B: This is the second explanation",
        "Option C: This is the third explanation",
        "Option D: This is the fourth explanation"
      ],
      correctAnswer: "Option A: This is the first explanation"
    };
    
    /* Uncomment when API is available
    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }
    const data = await response.json();
    return data;
    */
  } catch (error) {
    console.error(`Error fetching question for topic ${topicName}:`, error);
    throw error; // Propagate error to be handled by the caller
  }
};

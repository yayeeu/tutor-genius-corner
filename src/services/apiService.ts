
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
    const response = await fetch('/get-recent-topics');
    if (!response.ok) {
      throw new Error('Failed to fetch recent topics');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recent topics:', error);
    return [];
  }
};

export const fetchRandomQuestion = async (topicName: string): Promise<Question | null> => {
  try {
    const response = await fetch(`/get-question?topic=${encodeURIComponent(topicName)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching question for topic ${topicName}:`, error);
    return null;
  }
};

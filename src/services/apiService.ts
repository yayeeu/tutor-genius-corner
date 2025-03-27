
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
    // In development, we'll mock the response since the endpoint doesn't exist
    // In production, this would be:
    // const response = await fetch('/get-recent-topics');
    
    // Mock implementation for development
    console.log("Fetching recent topics...");
    
    // Simulate API response
    return [
      { topicName: "Algebra", createdAt: new Date().toISOString() },
      { topicName: "Chemistry", createdAt: new Date(Date.now() - 86400000).toISOString() }, // 1 day ago
      { topicName: "Biology", createdAt: new Date(Date.now() - 172800000).toISOString() }, // 2 days ago
      { topicName: "Physics", createdAt: new Date(Date.now() - 259200000).toISOString() }, // 3 days ago
      { topicName: "Literature", createdAt: new Date(Date.now() - 345600000).toISOString() } // 4 days ago
    ];
    
    /* Uncomment when API is available
    if (!response.ok) {
      throw new Error('Failed to fetch recent topics');
    }
    const data = await response.json();
    return data;
    */
  } catch (error) {
    console.error('Error fetching recent topics:', error);
    throw error; // Propagate error to be handled by the caller
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

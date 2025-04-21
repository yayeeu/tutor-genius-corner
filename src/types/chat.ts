
export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface QuestionData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

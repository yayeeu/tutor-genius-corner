
import { Question } from './question';

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface QuestionData {
  id: string | number;
  question: string | Question;  // Allow both string and Question object
  options?: string[];
  correctAnswer?: string;
}

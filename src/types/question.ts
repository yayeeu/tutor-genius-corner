
export interface Question {
  id: string;
  unitId: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  choices: {
    id: string;
    text: string;
  }[];
  correctAnswerId: string;
}

export interface GenerateQuestionResponse {
  success: boolean;
  data: Question;
  error?: string;
}

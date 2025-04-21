
import { Question, GenerateQuestionResponse } from '@/types/question';

const mockQuestions: Record<string, Question[]> = {
  'unit-1': [
    {
      id: '1',
      unitId: 'unit-1',
      content: 'What is the capital of Ethiopia?',
      level: 'beginner',
      choices: [
        { id: 'a', text: 'Addis Ababa' },
        { id: 'b', text: 'Dire Dawa' },
        { id: 'c', text: 'Bahir Dar' },
        { id: 'd', text: 'Hawassa' }
      ],
      correctAnswerId: 'a'
    },
    {
      id: '2',
      unitId: 'unit-1',
      content: 'Which Ethiopian emperor is known for modernizing the country in the early 20th century?',
      level: 'intermediate',
      choices: [
        { id: 'a', text: 'Haile Selassie' },
        { id: 'b', text: 'Menelik II' },
        { id: 'c', text: 'Tewodros II' },
        { id: 'd', text: 'Zara Yaqob' }
      ],
      correctAnswerId: 'b'
    }
  ],
  'unit-2': [
    {
      id: '3',
      unitId: 'unit-2',
      content: 'What is the main ingredient in Shiro?',
      level: 'beginner',
      choices: [
        { id: 'a', text: 'Ground chickpeas' },
        { id: 'b', text: 'Wheat flour' },
        { id: 'c', text: 'Rice' },
        { id: 'd', text: 'Corn' }
      ],
      correctAnswerId: 'a'
    }
  ]
};

export const generateQuestion = async (unitId: string): Promise<GenerateQuestionResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const questions = mockQuestions[unitId];
  if (!questions || questions.length === 0) {
    return {
      success: false,
      data: null,
      error: 'No questions found for this unit'
    };
  }

  // Randomly select a question from the available ones
  const randomIndex = Math.floor(Math.random() * questions.length);
  
  return {
    success: true,
    data: questions[randomIndex]
  };
};


// Sample data for topics
export const topicData = {
  "Mathematics": [
    { name: "Quadratic Equations", competency: 75 },
    { name: "Geometric Series", competency: 68 },
    { name: "Factorization", competency: 82 },
    { name: "Algebraic Expressions", competency: 59 },
    { name: "Linear Equations", competency: 90 },
    { name: "Trigonometry", competency: 65 },
    { name: "Calculus Basics", competency: 45 },
    { name: "Probability", competency: 72 }
  ],
  "Physics": [
    { name: "Newton's Laws", competency: 80 },
    { name: "Wave Properties", competency: 65 },
    { name: "Circuit Analysis", competency: 55 },
    { name: "Thermodynamics", competency: 70 },
    { name: "Optics", competency: 60 },
    { name: "Electromagnetism", competency: 50 },
    { name: "Quantum Mechanics", competency: 40 },
    { name: "Fluid Dynamics", competency: 75 }
  ],
  "Chemistry": [
    { name: "Chemical Bonding", competency: 85 },
    { name: "Reaction Rates", competency: 70 },
    { name: "Periodic Table", competency: 90 },
    { name: "Organic Chemistry", competency: 65 },
    { name: "Acids and Bases", competency: 75 },
    { name: "Thermochemistry", competency: 60 },
    { name: "Equilibrium", competency: 55 },
    { name: "Electrochemistry", competency: 50 }
  ],
  "Biology": [
    { name: "Cell Structure", competency: 80 },
    { name: "Evolution", competency: 75 },
    { name: "Nervous System", competency: 65 },
    { name: "Genetics", competency: 70 },
    { name: "Ecology", competency: 85 },
    { name: "Photosynthesis", competency: 60 },
    { name: "Human Anatomy", competency: 55 },
    { name: "Microbiology", competency: 50 }
  ],
  "Amharic": [
    { name: "Verb Conjugation", competency: 90 },
    { name: "Literary Analysis", competency: 85 },
    { name: "Essay Structure", competency: 80 },
    { name: "Grammar Rules", competency: 75 },
    { name: "Vocabulary", competency: 70 },
    { name: "Reading Comprehension", competency: 65 },
    { name: "Speaking Practice", competency: 60 },
    { name: "Cultural Context", competency: 55 }
  ],
  "English": [
    { name: "Essay Structure", competency: 85 },
    { name: "Literary Analysis", competency: 80 },
    { name: "Grammar Rules", competency: 75 },
    { name: "Vocabulary", competency: 70 },
    { name: "Reading Comprehension", competency: 65 },
    { name: "Speaking Practice", competency: 60 },
    { name: "Writing Skills", competency: 55 },
    { name: "Critical Thinking", competency: 50 }
  ]
};

// Define types for questions
export type QuestionData = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type SubjectQuestions = {
  [topic: string]: QuestionData[];
};

export type AllQuestions = {
  [subject: string]: SubjectQuestions;
};

// Sample quiz questions
export const sampleQuestions: AllQuestions = {
  "Mathematics": {
    "Quadratic Equations": [
      {
        id: 1,
        question: "Solve the quadratic equation: x² + 5x + 6 = 0",
        options: ["x = -2, -3", "x = 2, 3", "x = -1, -6", "x = 1, 6"],
        correctAnswer: "x = -2, -3"
      },
      {
        id: 2,
        question: "Which of the following is the quadratic formula?",
        options: [
          "x = (-b ± √(b² - 4ac)) / 2a",
          "x = -b / 2a",
          "x = -c / b",
          "x = a / b"
        ],
        correctAnswer: "x = (-b ± √(b² - 4ac)) / 2a"
      }
    ],
    "Geometric Series": [
      {
        id: 1,
        question: "What is the sum of the infinite geometric series 1 + 1/2 + 1/4 + 1/8 + ...?",
        options: ["1", "2", "0", "Infinity"],
        correctAnswer: "2"
      }
    ]
  },
  "Physics": {
    "Newton's Laws": [
      {
        id: 1,
        question: "Which of Newton's laws states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force?",
        options: ["First Law", "Second Law", "Third Law", "Law of Gravity"],
        correctAnswer: "First Law"
      }
    ]
  }
};

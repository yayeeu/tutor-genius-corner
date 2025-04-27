export interface Course {
  id: string;
  title: string;
  description: string;
  gradeLevel: number;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  unitId: string;
  title: string;
  description: string;
  content: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentMastery {
  id: string;
  studentId: string;
  topicId: string;
  masteryLevel: 'not_started' | 'beginner' | 'intermediate' | 'advanced' | 'mastered';
  lastPracticed: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assignment {
  id: string;
  studentId: string;
  courseId: string;
  unitId: string;
  topicId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
  updatedAt: string;
} 
import { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
  id: string;
  name: string;
  description?: string;
  grade_level?: number;
}

interface CourseContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  getCourseById: (id: string) => Course | undefined;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  return (
    <CourseContext.Provider value={{ courses, setCourses, getCourseById }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
} 
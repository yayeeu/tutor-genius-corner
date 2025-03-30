
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen } from 'lucide-react';

interface ActivityData {
  courseName: string;
  questionsAnswered: number;
  percentage: number;
  gradeLevel: number;
}

export const LearningActivityBars = () => {
  const { user } = useAuth();
  
  const { data: activityData, isLoading } = useQuery({
    queryKey: ['courseActivity', user?.id],
    queryFn: async (): Promise<ActivityData[]> => {
      if (!user) return [];
      
      // First, get student grade level
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('grade_level')
        .eq('id', user.id)
        .single();
        
      if (studentError) {
        console.error('Error fetching student grade level:', studentError);
        return [];
      }
      
      const gradeLevel = studentData?.grade_level || 0;
      
      // Get courses for this grade level
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('id, name, grade_level')
        .eq('grade_level', gradeLevel);
        
      if (coursesError) {
        console.error('Error fetching courses:', coursesError);
        return [];
      }
      
      // Get learning activity data to count questions answered per course
      const { data: learningData, error: learningError } = await supabase
        .from('learning_activity')
        .select('*')
        .eq('user_id', user.id);
        
      if (learningError) {
        console.error('Error fetching learning activity:', learningError);
      }
      
      // Get assignments to count questions answered per course
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('assignments')
        .select('*, answers(question_id)')
        .eq('user_id', user.id);
        
      if (assignmentsError) {
        console.error('Error fetching assignments:', assignmentsError);
      }
      
      // Calculate total questions answered across all courses
      const totalQuestionsAnswered = learningData?.reduce((sum, activity) => 
        sum + (activity.questions_answered || 0), 0) || 0;
        
      // Transform courses data to include questions answered
      const result = coursesData.map(course => {
        // Filter assignments for this course
        const courseAssignments = assignmentsData?.filter(a => a.course_id === course.id) || [];
        
        // Count questions answered for this course
        const questionsForCourse = courseAssignments.reduce((count, assignment) => {
          // Count the answers related to this assignment
          return count + (assignment.answers?.length || 0);
        }, 0);
        
        // Distribute general learning activity questions evenly if no specific data
        // or use actual data if available
        const adjustedQuestions = questionsForCourse > 0 ? 
          questionsForCourse : 
          Math.floor(totalQuestionsAnswered / coursesData.length);
        
        return {
          courseName: course.name,
          questionsAnswered: adjustedQuestions,
          percentage: Math.min(100, Math.round((adjustedQuestions / 20) * 100)), // 20 questions is max (100%)
          gradeLevel: course.grade_level
        };
      });
      
      // Sort by questions answered (highest first)
      return result.sort((a, b) => b.questionsAnswered - a.questionsAnswered);
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning Activity</CardTitle>
          <CardDescription>Your courses and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Activity</CardTitle>
        <CardDescription>Your courses and questions answered</CardDescription>
      </CardHeader>
      <CardContent>
        {activityData && activityData.length > 0 ? (
          <div className="space-y-6">
            {activityData.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{course.courseName}</span>
                  <span className="text-sm text-tutor-gray">{course.questionsAnswered} questions</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-tutor-orange rounded-full" 
                    style={{ width: `${course.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] flex flex-col items-center justify-center text-tutor-gray">
            <BookOpen className="h-12 w-12 mb-3 text-tutor-light-gray" />
            <p className="text-center font-medium">No Course Activity</p>
            <p className="text-center text-sm mt-1">Complete questions in your courses to track progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

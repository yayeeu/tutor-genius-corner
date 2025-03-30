
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
import { Clock, BookOpen } from 'lucide-react';

interface ActivityData {
  subjectName: string;
  questionsAnswered: number;
  percentage: number;
}

export const LearningActivityBars = () => {
  const { user } = useAuth();
  
  const { data: activityData, isLoading } = useQuery({
    queryKey: ['learningActivity', user?.id],
    queryFn: async (): Promise<ActivityData[]> => {
      if (!user) return [];
      
      // Fetch topics covered by subject
      const { data: topicsData, error: topicsError } = await supabase
        .from('topics_covered')
        .select('subject_name, last_studied_at')
        .eq('user_id', user.id);
        
      if (topicsError) throw topicsError;
      
      // Get questions answered data from learning_activity
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      
      const { data: activityData, error: activityError } = await supabase
        .from('learning_activity')
        .select('*')
        .eq('user_id', user.id)
        .gte('date', twoWeeksAgo.toISOString().split('T')[0]);
      
      if (activityError) throw activityError;
      
      // Total questions answered
      const totalQuestionsAnswered = activityData?.reduce((sum, activity) => 
        sum + (activity.questions_answered || 0), 0) || 0;

      // Group by subject and calculate questions answered
      const subjects = topicsData?.reduce((acc, topic) => {
        const subject = topic.subject_name;
        if (!acc[subject]) {
          acc[subject] = { 
            count: 0,
            questionsAnswered: Math.floor(totalQuestionsAnswered / (topicsData.length || 1)) // Distribute questions evenly for now
          };
        }
        acc[subject].count += 1;
        return acc;
      }, {} as Record<string, { count: number, questionsAnswered: number }>);

      if (!subjects || Object.keys(subjects).length === 0) {
        // Return empty array instead of fallback data
        return [];
      }

      // Convert to array and sort by questions answered
      const result = Object.entries(subjects).map(([subjectName, data]) => {
        return {
          subjectName,
          questionsAnswered: data.questionsAnswered,
          percentage: Math.min(100, Math.round((data.questionsAnswered / 20) * 100)) // 20 questions is max (100%)
        };
      }).sort((a, b) => b.questionsAnswered - a.questionsAnswered);

      return result.slice(0, 4); // Return top 4 subjects
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Learning Activity</CardTitle>
          <CardDescription>Your most active learning areas</CardDescription>
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
        <CardDescription>Your most active learning areas</CardDescription>
      </CardHeader>
      <CardContent>
        {activityData && activityData.length > 0 ? (
          <div className="space-y-6">
            {activityData.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{subject.subjectName}</span>
                  <span className="text-sm font-medium">{subject.questionsAnswered} questions</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-tutor-orange rounded-full" 
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] flex flex-col items-center justify-center text-tutor-gray">
            <BookOpen className="h-12 w-12 mb-3 text-tutor-light-gray" />
            <p className="text-center font-medium">No Questions Answered</p>
            <p className="text-center text-sm mt-1">Practice questions to track your progress here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

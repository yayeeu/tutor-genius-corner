import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import SubjectCard from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useCourse } from '@/contexts/CourseContext';
import { api } from '@/lib/api'; // Axios instance

// Types
interface Course {
  id: string;
  name: string;
  description?: string;
  grade_level?: number;
  progress?: number; // Future field for tracking
  recentTopics?: string[];
}

const Learn = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayedSubjects, setDisplayedSubjects] = useState<number>(6);
  const [gradeLevel, setGradeLevel] = useState<number | null>(null);
  const { user, session } = useAuth();
  const { setCourses: setGlobalCourses } = useCourse();

  useEffect(() => {
    const fetchGradeLevel = async () => {
      if (!user?.id || !session?.access_token) return;
      try {
        const response = await api.get(`/api/students/${user.id}/grade-level`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        setGradeLevel(response.data.grade_level);
      } catch (error) {
        console.error('Failed to fetch grade level:', error);
      }
    };

    fetchGradeLevel();
  }, [user?.id, session?.access_token]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!gradeLevel || !session?.access_token) return;
      try {
        const response = await api.get<Course[]>(`/api/courses/grade/${gradeLevel}`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        });
        const coursesData = response.data || [];
        setCourses(coursesData);
        // Set courses in global context
        setGlobalCourses(coursesData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [gradeLevel, session?.access_token, setGlobalCourses]);

  const handleShowMore = () => {
    setDisplayedSubjects((prev) => Math.min(prev + 3, courses.length));
  };

  const renderSubjectsContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, idx) => (
            <Card key={idx} className="w-full h-64">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (courses.length === 0) {
      return (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-16 w-16 text-tutor-gray mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No Subjects Available</h3>
            <p className="text-tutor-gray max-w-md">
              There are no subjects available for you at the moment. Check back later or contact your instructor for more information.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(0, displayedSubjects).map((subject) => (
            <Link to={`/practice?courseId=${subject.id}`} key={subject.id}>
              <SubjectCard 
                title={subject.name}
                description={subject.description || ''}
                progress={subject.progress || 0}
                recentTopics={subject.recentTopics || []}
              />
            </Link>
          ))}
        </div>

        {displayedSubjects < courses.length && (
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              onClick={handleShowMore}
              className="border-tutor-orange/30 text-tutor-dark-orange"
            >
              Show More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Subjects</h1>
          <p className="text-tutor-gray">
            {gradeLevel ? `Browse and study your Grade ${gradeLevel} Courses` : 'Loading...'}
          </p>
        </div>

        <div className="space-y-6">
          {renderSubjectsContent()}
        </div>
      </div>
    </div>
  );
};

export default Learn;

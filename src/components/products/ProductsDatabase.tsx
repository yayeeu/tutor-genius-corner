
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Course {
  id: string;
  name: string;
  grade_level: number;
}

const ProductsDatabase = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('grade_level', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setCourses(data || []);
      } catch (err: any) {
        console.error('Error fetching courses:', err);
        setError(err.message || 'Failed to fetch courses from database');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Available Courses</h2>
        <p className="text-tutor-gray mb-4">
          Courses available in our Ethiopian curriculum database
        </p>
      </div>

      {isLoading && (
        <div className="py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-tutor-orange border-r-transparent"></div>
          <p className="mt-2 text-tutor-gray">Loading courses from database...</p>
        </div>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">Error: {error}</p>
            <p className="mt-2 text-sm text-gray-600">
              Please make sure your Supabase database is properly set up and contains the required tables.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && courses.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p>No courses found in the database.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{course.name}</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <p className="text-sm text-tutor-gray">
                  <span className="font-medium">Grade Level:</span> {course.grade_level}
                </p>
                <p className="text-sm text-tutor-gray mt-1">
                  <span className="font-medium">ID:</span> {course.id.substring(0, 8)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsDatabase;

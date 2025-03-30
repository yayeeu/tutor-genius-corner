
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen } from 'lucide-react';
import SubjectCard from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';
import { useCourses } from '@/hooks/useCourses';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('chat-tutor');
  const [displayedSubjects, setDisplayedSubjects] = useState(6);
  const { courses, isLoading } = useCourses();

  const handleShowMore = () => {
    setDisplayedSubjects(prevCount => Math.min(prevCount + 3, courses.length));
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
          {courses.slice(0, displayedSubjects).map((subject, index) => (
            <Link to={`/practice?subject=${subject.title}`} key={index}>
              <SubjectCard 
                title={subject.title}
                description={subject.description}
                progress={subject.progress}
                recentTopics={subject.recentTopics}
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Ethiopian Curriculum AI Tutor</h1>
          <p className="text-tutor-gray">
            Get personalized help with your studies based on the Ethiopian curriculum for your grade level.
          </p>
        </div>

        <Tabs defaultValue="chat-tutor" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-tutor-light-gray mb-4">
            <TabsTrigger value="chat-tutor">Chat with Tutor</TabsTrigger>
            <TabsTrigger value="your-subjects">Your Subjects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat-tutor" className="animate-fade-in">
            <ChatInterface />
          </TabsContent>
          
          <TabsContent value="your-subjects" className="animate-fade-in">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Subjects</h2>
                <Link 
                  to="/dashboard" 
                  className="text-sm text-tutor-orange hover:text-tutor-dark-orange flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              
              {renderSubjectsContent()}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;

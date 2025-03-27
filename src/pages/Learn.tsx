
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import SubjectCard from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';

// Sample data for subjects (same as in Dashboard)
const subjectData = [
  {
    title: "Mathematics",
    description: "Algebra, Geometry, Calculus",
    progress: 75,
    recentTopics: ["Quadratic Equations", "Geometric Series", "Factorization"]
  },
  {
    title: "Physics",
    description: "Mechanics, Waves, Electricity",
    progress: 68,
    recentTopics: ["Newton's Laws", "Wave Properties", "Circuit Analysis"]
  },
  {
    title: "Chemistry",
    description: "Organic, Inorganic, Physical",
    progress: 52,
    recentTopics: ["Chemical Bonding", "Reaction Rates", "Periodic Table"]
  },
  {
    title: "Biology",
    description: "Botany, Zoology, Genetics",
    progress: 45,
    recentTopics: ["Cell Structure", "Evolution", "Nervous System"]
  },
  {
    title: "Amharic",
    description: "Grammar, Literature, Writing",
    progress: 85,
    recentTopics: ["Verb Conjugation", "Literary Analysis", "Essay Structure"]
  },
  {
    title: "English",
    description: "Grammar, Literature, Writing",
    progress: 79,
    recentTopics: ["Essay Structure", "Literary Analysis", "Grammar Rules"]
  }
];

const Learn = () => {
  const [activeTab, setActiveTab] = useState('chat-tutor');
  const [displayedSubjects, setDisplayedSubjects] = useState(6);

  const handleShowMore = () => {
    setDisplayedSubjects(prevCount => Math.min(prevCount + 3, subjectData.length));
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subjectData.slice(0, displayedSubjects).map((subject, index) => (
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
              
              {displayedSubjects < subjectData.length && (
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;

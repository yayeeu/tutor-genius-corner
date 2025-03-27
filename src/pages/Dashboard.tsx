
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, BookOpen, Award, ArrowRight } from 'lucide-react';
import SubjectCard from '@/components/SubjectCard';

// Sample data for the dashboard
const subjectData = [
  {
    title: "Mathematics",
    description: "Algebra, Geometry, Calculus",
    progress: 75,
    recentTopics: ["Quadratic Equations", "Geometric Series", "Factorization"]
  },
  {
    title: "Science",
    description: "Physics, Chemistry, Biology",
    progress: 60,
    recentTopics: ["Newton's Laws", "Chemical Bonding", "Cell Structure"]
  },
  {
    title: "Language Arts",
    description: "Grammar, Literature, Writing",
    progress: 85,
    recentTopics: ["Essay Structure", "Literary Analysis", "Grammar Rules"]
  },
  {
    title: "History",
    description: "World History, US History",
    progress: 45,
    recentTopics: ["World War II", "Ancient Civilizations", "Civil Rights"]
  }
];

const weeklyProgressData = [
  { day: 'Mon', progress: 45 },
  { day: 'Tue', progress: 65 },
  { day: 'Wed', progress: 58 },
  { day: 'Thu', progress: 72 },
  { day: 'Fri', progress: 80 },
  { day: 'Sat', progress: 45 },
  { day: 'Sun', progress: 25 },
];

const strengthsData = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 72 },
  { subject: 'History', score: 60 },
  { subject: 'Language', score: 90 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-tutor-beige/30 pb-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
              <p className="text-tutor-gray">Welcome back! Here's an overview of your learning progress.</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="Student" />
                <AvatarFallback className="bg-tutor-orange text-white">ST</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-tutor-dark-gray">Alex Johnson</p>
                <p className="text-sm text-tutor-gray">Grade 10</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-tutor-light-gray">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-tutor-gray">Overall Mastery</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-tutor-gray">Topics Covered</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-tutor-gray">Tutor Sessions</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Weekly Progress */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Weekly Learning Progress</CardTitle>
                <CardDescription>Your daily activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="progress" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        dot={{ stroke: '#F59E0B', strokeWidth: 2, r: 4 }}
                        activeDot={{ stroke: '#D97706', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Subjects */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Subjects</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-tutor-dark-orange border-tutor-orange/30"
                  onClick={() => setActiveTab('subjects')}
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjectData.slice(0, 2).map((subject, index) => (
                  <SubjectCard 
                    key={index}
                    title={subject.title}
                    description={subject.description}
                    progress={subject.progress}
                    recentTopics={subject.recentTopics}
                  />
                ))}
              </div>
            </div>
            
            {/* Quick Link to AI Tutor */}
            <Card className="bg-gradient-to-r from-tutor-orange/20 to-tutor-orange/5 border-none">
              <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="AI Tutor" />
                    <AvatarFallback className="bg-tutor-orange text-white">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Need Help with Homework?</h3>
                    <p className="text-tutor-gray">Your AI tutor is ready to assist you anytime.</p>
                  </div>
                </div>
                <Button 
                  className="bg-tutor-orange hover:bg-tutor-dark-orange"
                  asChild
                >
                  <Link to="/chat-tutor">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat with Tutor
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-6">
            <h2 className="text-xl font-semibold">All Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {subjectData.map((subject, index) => (
                <SubjectCard 
                  key={index}
                  title={subject.title}
                  description={subject.description}
                  progress={subject.progress}
                  recentTopics={subject.recentTopics}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Strengths</CardTitle>
                  <CardDescription>Subjects you're performing well in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={strengthsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Bar 
                          dataKey="score" 
                          fill="#F59E0B" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Learning Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Activity</CardTitle>
                  <CardDescription>Your most active learning times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Mathematics</span>
                        <span className="text-sm font-medium">4.5 hours</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-tutor-orange rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Science</span>
                        <span className="text-sm font-medium">3.2 hours</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-tutor-orange rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Language Arts</span>
                        <span className="text-sm font-medium">2.8 hours</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-tutor-orange rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">History</span>
                        <span className="text-sm font-medium">1.5 hours</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-tutor-orange rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommended Focus Areas */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recommended Focus Areas</CardTitle>
                  <CardDescription>Based on your recent performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-tutor-light-gray">
                      <h3 className="font-medium mb-2">Algebra: Factorization</h3>
                      <p className="text-sm text-tutor-gray mb-3">
                        You've been struggling with polynomial factorization.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-tutor-orange/30 text-tutor-dark-orange"
                        asChild
                      >
                        <Link to="/chat-tutor">
                          Practice Now
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-tutor-light-gray">
                      <h3 className="font-medium mb-2">Chemistry: Balancing Equations</h3>
                      <p className="text-sm text-tutor-gray mb-3">
                        Your quiz scores in this area need improvement.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-tutor-orange/30 text-tutor-dark-orange"
                        asChild
                      >
                        <Link to="/chat-tutor">
                          Practice Now
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-tutor-light-gray">
                      <h3 className="font-medium mb-2">Essay Structure</h3>
                      <p className="text-sm text-tutor-gray mb-3">
                        Work on organizing your essay introductions.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-tutor-orange/30 text-tutor-dark-orange"
                        asChild
                      >
                        <Link to="/chat-tutor">
                          Practice Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

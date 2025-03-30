
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Award, MessageSquare } from 'lucide-react';
import { WeeklyProgressChart } from './WeeklyProgressChart';
import { getTotalTopicsCovered, getTotalTutorSessions, getOverallMastery } from '@/services/trackingService';
import { Skeleton } from '@/components/ui/skeleton';

export const DashboardOverview = () => {
  const [overallMastery, setOverallMastery] = useState<number | null>(null);
  const [topicsCovered, setTopicsCovered] = useState<number | null>(null);
  const [tutorSessions, setTutorSessions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mastery, topics, sessions] = await Promise.all([
          getOverallMastery(),
          getTotalTopicsCovered(),
          getTotalTutorSessions()
        ]);
        
        setOverallMastery(mastery);
        setTopicsCovered(topics);
        setTutorSessions(sessions);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderMetricCard = (
    icon: React.ReactNode,
    bgColor: string,
    iconColor: string,
    label: string,
    value: React.ReactNode
  ) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-tutor-gray">{label}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderMetricCard(
          <Award className="h-6 w-6 text-blue-600" />,
          "bg-blue-100",
          "text-blue-600",
          "Overall Mastery",
          overallMastery !== null ? `${overallMastery}%` : "N/A"
        )}
        
        {renderMetricCard(
          <BookOpen className="h-6 w-6 text-green-600" />,
          "bg-green-100",
          "text-green-600",
          "Topics Covered",
          topicsCovered !== null ? topicsCovered : "N/A"
        )}
        
        {renderMetricCard(
          <MessageSquare className="h-6 w-6 text-purple-600" />,
          "bg-purple-100",
          "text-purple-600",
          "Tutor Sessions",
          tutorSessions !== null ? tutorSessions : "N/A"
        )}
      </div>
      
      <WeeklyProgressChart />
      
      <Card className="bg-gradient-to-r from-tutor-orange/20 to-tutor-orange/5 border-none">
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="AI Tutor" />
              <AvatarFallback className="bg-tutor-orange text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">Do you want to work where you can improve?</h3>
              <p className="text-tutor-gray">Your AI tutor is ready to assist you anytime.</p>
            </div>
          </div>
          <Button 
            className="bg-tutor-orange hover:bg-tutor-dark-orange"
            asChild
          >
            <Link to="/learn?tab=chat-tutor">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Tutor
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

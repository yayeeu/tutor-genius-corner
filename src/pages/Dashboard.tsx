
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { DashboardAnalytics } from '@/components/dashboard/DashboardAnalytics';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { updateLearningActivity } from '@/services/tracking';

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'overview');
  const { user } = useAuth();
  
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam === 'subjects' ? 'overview' : tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    if (user) {
      const sessionStartTime = new Date();
      
      return () => {
        const sessionEndTime = new Date();
        const minutesSpent = Math.round((sessionEndTime.getTime() - sessionStartTime.getTime()) / 60000);
        
        if (minutesSpent > 0) {
          updateLearningActivity(user.id, 0, minutesSpent, 0);
        }
      };
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-tutor-beige/30 pb-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
            <p className="text-tutor-gray">Welcome back! Here's an overview of your learning progress.</p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-tutor-light-gray">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>
          
          <TabsContent value="analytics">
            <DashboardAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

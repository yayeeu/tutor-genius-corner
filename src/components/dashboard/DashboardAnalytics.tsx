
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; 
import { StrengthsChart } from './StrengthsChart';
import { LearningActivityBars } from './LearningActivityBars';
import { useWeakestTopics } from '@/hooks/useWeakestTopics';

export const DashboardAnalytics = () => {
  const { weakestTopics, isLoading } = useWeakestTopics();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StrengthsChart />
        <LearningActivityBars />
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recommended Focus Areas</CardTitle>
            <CardDescription>Based on your recent performance</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-tutor-light-gray">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-4/5 mb-3" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weakestTopics.map((topic, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-tutor-light-gray">
                    <h3 className="font-medium mb-2">{topic.topicName}</h3>
                    <p className="text-sm text-tutor-gray mb-3">
                      {getDescriptionForScore(topic.masteryScore)}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-tutor-orange/30 text-tutor-dark-orange"
                      asChild
                    >
                      <Link to={`/learn?tab=chat-tutor&topic=${encodeURIComponent(topic.topicName)}`}>
                        Practice Now
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function to generate descriptions based on mastery score
const getDescriptionForScore = (score: number): string => {
  if (score < 0.3) {
    return "You need significant improvement in this area.";
  } else if (score < 0.5) {
    return "Your quiz scores in this area need improvement.";
  } else if (score < 0.7) {
    return "You're making progress but need more practice.";
  } else {
    return "You're doing well, but could still improve.";
  }
};

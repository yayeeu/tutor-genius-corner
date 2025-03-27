
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
import { StrengthsChart } from './StrengthsChart';
import { LearningActivityBars } from './LearningActivityBars';

export const DashboardAnalytics = () => {
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
                  <Link to="/learn?tab=chat-tutor">
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
                  <Link to="/learn?tab=chat-tutor">
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
                  <Link to="/learn?tab=chat-tutor">
                    Practice Now
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export const LearningActivityBars = () => {
  return (
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
  );
};

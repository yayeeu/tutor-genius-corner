
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useStrengths } from '@/hooks/useStrengths';
import { FileBarChart } from 'lucide-react';

export const StrengthsChart = () => {
  const { strengthsData, isLoading } = useStrengths();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Strengths</CardTitle>
          <CardDescription>Subjects you're performing well in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <Skeleton className="w-full h-[250px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Strengths</CardTitle>
        <CardDescription>Subjects you're performing well in</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {strengthsData.length > 0 ? (
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
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-tutor-gray">
              <FileBarChart className="h-12 w-12 mb-3 text-tutor-light-gray" />
              <p className="text-center font-medium">No Activity</p>
              <p className="text-center text-sm mt-1">Complete lessons to see your strengths</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

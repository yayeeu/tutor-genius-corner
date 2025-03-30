
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getWeeklyProgressData } from '@/services/tracking';
import { Skeleton } from '@/components/ui/skeleton';
import { HelpCircle } from 'lucide-react';

export const WeeklyProgressChart = () => {
  const [weeklyProgressData, setWeeklyProgressData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeeklyProgressData();
        setWeeklyProgressData(data);
      } catch (error) {
        console.error('Error fetching weekly progress data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Weekly Learning Progress</CardTitle>
          <CardDescription>Your daily activity over the past week</CardDescription>
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
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Weekly Learning Progress</CardTitle>
            <CardDescription>Based on questions answered and topics covered</CardDescription>
          </div>
          <div className="flex items-center text-xs text-tutor-gray space-x-1">
            <HelpCircle className="h-4 w-4" />
            <span>Progress score = questions answered × 10 + topics viewed × 5</span>
          </div>
        </div>
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
  );
};


import React from 'react';
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

const weeklyProgressData = [
  { day: 'Mon', progress: 45 },
  { day: 'Tue', progress: 65 },
  { day: 'Wed', progress: 58 },
  { day: 'Thu', progress: 72 },
  { day: 'Fri', progress: 80 },
  { day: 'Sat', progress: 45 },
  { day: 'Sun', progress: 25 },
];

export const WeeklyProgressChart = () => {
  return (
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
  );
};

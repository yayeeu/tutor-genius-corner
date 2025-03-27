
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HelpCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  buttonText: string;
}

export const HelpCard = ({ icon, title, description, items, buttonText }: HelpCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc pl-5 text-tutor-dark-gray">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

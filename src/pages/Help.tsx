
import React from 'react';
import { HelpCircle, BookOpen, MessageCircle, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Help = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="h-8 w-8 text-tutor-purple" />
          <h1 className="text-3xl font-bold text-tutor-navy">Help Center</h1>
        </div>
        
        <p className="text-lg text-tutor-dark-gray mb-8">
          Welcome to the EduNova Help Center. Find answers to your questions or reach out for support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-tutor-orange" />
                Getting Started
              </CardTitle>
              <CardDescription>Learn how to use the EduNova platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-tutor-dark-gray">
                <li>How to navigate the dashboard</li>
                <li>Understanding your learning progress</li>
                <li>Using the AI Tutor for personalized help</li>
                <li>Taking practice tests and assessments</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Guides
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-tutor-purple" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-tutor-dark-gray">
                <li>How do I reset my password?</li>
                <li>Can I download materials for offline use?</li>
                <li>How are my study recommendations generated?</li>
                <li>What subjects are currently supported?</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View FAQ
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Separator className="my-8" />
        
        <div className="bg-tutor-beige/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-tutor-navy mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-tutor-orange" />
            Contact Support
          </h2>
          <p className="text-tutor-dark-gray mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Help;

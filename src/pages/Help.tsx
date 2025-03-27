
import React from 'react';
import { HelpCircle, BookOpen, MessageCircle, FileQuestion } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { HelpCard } from "@/components/help/HelpCard";
import { ContactSupportSection } from "@/components/help/ContactSupportSection";

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
          <HelpCard 
            icon={<BookOpen className="h-5 w-5 text-tutor-orange" />}
            title="Getting Started"
            description="Learn how to use the EduNova platform"
            items={[
              "How to navigate the dashboard",
              "Understanding your learning progress",
              "Using the AI Tutor for personalized help",
              "Taking practice tests and assessments"
            ]}
            buttonText="View Guides"
          />
          
          <HelpCard 
            icon={<FileQuestion className="h-5 w-5 text-tutor-purple" />}
            title="Frequently Asked Questions"
            description="Quick answers to common questions"
            items={[
              "How do I reset my password?",
              "Can I download materials for offline use?",
              "How are my study recommendations generated?",
              "What subjects are currently supported?"
            ]}
            buttonText="View FAQ"
          />
        </div>
        
        <Separator className="my-8" />
        
        <ContactSupportSection />
      </div>
    </div>
  );
};

export default Help;

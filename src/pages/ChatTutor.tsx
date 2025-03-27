
import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen } from 'lucide-react';

const ChatTutor = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Ethiopian Curriculum AI Tutor</h1>
          <p className="text-tutor-gray">
            Get personalized help with your studies based on the Ethiopian curriculum for your grade level.
          </p>
        </div>

        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-tutor-light-gray mb-4">
            <TabsTrigger value="chat">Chat with Tutor</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum Overview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="animate-fade-in">
            <ChatInterface />
          </TabsContent>
          
          <TabsContent value="curriculum" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle>Ethiopian Education System</CardTitle>
                  </div>
                  <CardDescription>
                    Our tutoring aligns with Ethiopia's 8-4-4 education system:
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Primary Education (Grades 1-8):</strong> Core subjects including languages, mathematics, sciences, and social studies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Secondary Education (Grades 9-12):</strong> More specialized subjects preparing for the Ethiopian School Leaving Certificate Examination.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Preparatory Education (Grades 11-12):</strong> Advanced studies preparing students for university entrance.</span>
                    </li>
                  </ul>
                </div>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle>How Our AI Tutor Helps</CardTitle>
                  </div>
                  <CardDescription>
                    Benefits tailored to Ethiopian curriculum students:
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Curriculum Alignment:</strong> Content and explanations specifically matched to your grade's Ethiopian curriculum.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Exam Preparation:</strong> Targeted practice for national examinations, including practice questions in the Ethiopian format.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Adaptive Learning:</strong> Personalized content that adjusts to your strengths and areas needing improvement.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-2.5 mr-1"></span>
                      <span><strong>Multilingual Support:</strong> Help in both English and Amharic to ensure complete understanding.</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChatTutor;

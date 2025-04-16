
import { Lightbulb, Stars } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WelcomeSection = () => {
  return (
    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
      <div className="mb-6">
        <div className="w-[33.6rem] h-[33.6rem] mx-auto lg:mx-0 bg-transparent flex items-center justify-center relative overflow-hidden">
          <img 
            src="/lovable-uploads/4577bbc7-f544-4d73-90d5-fea420d3c7a9.png" 
            alt="Aku Logo" 
            className="w-full h-full object-contain animate-float"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-tutor-orange to-tutor-purple">Aku</span>
        </h1>
        
        <p className="text-lg text-tutor-gray">
          Your personal AI tutor that makes learning exciting and helps you master the Ethiopian curriculum at your own pace!
        </p>
      </div>
      
      <div className="hidden lg:block space-y-6">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="space-y-4 p-0">
            <div className="flex items-start space-x-3">
              <div className="bg-tutor-orange/20 p-2 rounded-full">
                <Lightbulb className="h-5 w-5 text-tutor-orange" />
              </div>
              <div>
                <h3 className="font-medium">Learn at your own pace</h3>
                <p className="text-sm text-tutor-gray">Study when and how you want with personalized lessons</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-tutor-purple/20 p-2 rounded-full">
                <Stars className="h-5 w-5 text-tutor-purple" />
              </div>
              <div>
                <h3 className="font-medium">Track your progress</h3>
                <p className="text-sm text-tutor-gray">See how far you've come with fun achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeSection;

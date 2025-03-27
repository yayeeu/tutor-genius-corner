
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-tutor-gray" />
          <h3 className="text-xl font-medium mb-2">Select a Topic to Start Practicing</h3>
          <p className="text-tutor-gray max-w-md mx-auto">
            Choose a learning topic from the list on the left to start practicing with interactive questions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeScreen;

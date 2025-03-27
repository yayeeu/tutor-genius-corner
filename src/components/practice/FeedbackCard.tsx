
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface FeedbackCardProps {
  feedback: string;
  onNextQuestion?: () => void;
}

const FeedbackCard = ({ feedback, onNextQuestion }: FeedbackCardProps) => {
  if (!feedback) return null;
  
  return (
    <Card className="bg-gray-50">
      <CardContent className="pt-6">
        <h3 className="font-medium mb-2">Feedback</h3>
        <p className="mb-4">{feedback}</p>
        
        {onNextQuestion && (
          <Button 
            onClick={onNextQuestion}
            className="mt-2 bg-tutor-orange hover:bg-tutor-dark-orange flex items-center"
          >
            Next Question <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;

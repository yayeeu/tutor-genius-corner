
import { Card, CardContent } from '@/components/ui/card';

interface FeedbackCardProps {
  feedback: string;
}

const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  if (!feedback) return null;
  
  return (
    <Card className="bg-gray-50">
      <CardContent className="pt-6">
        <h3 className="font-medium mb-2">Feedback</h3>
        <p>{feedback}</p>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;

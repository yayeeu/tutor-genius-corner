
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";
import { Link } from "react-router-dom";

export interface SubjectCardProps {
  title: string;
  description: string;
  progress: number;
  recentTopics: string[];
}

const SubjectCard = ({
  title,
  description,
  progress,
  recentTopics
}: SubjectCardProps) => {
  return (
    <Card className="w-full h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold gradient-text">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-tutor-dark-gray">Recent Topics</h4>
          <ul className="space-y-1">
            {recentTopics.map((topic, index) => (
              <li key={index} className="text-sm text-tutor-gray flex items-start">
                <span className="inline-block w-1 h-1 rounded-full bg-tutor-orange mt-1.5 mr-2"></span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-2">
        <Button 
          size="sm"
          className="bg-tutor-orange hover:bg-tutor-dark-orange"
          asChild
        >
          <Link to={`/practice?subject=${title}`}>
            <BookCheck className="h-4 w-4 mr-2" />
            <span>Practice</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubjectCard;

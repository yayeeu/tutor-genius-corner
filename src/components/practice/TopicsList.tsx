
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface Topic {
  name: string;
  competency: number;
}

interface TopicsListProps {
  topics: Topic[];
  selectedTopic: string | null;
  onTopicSelect: (topicName: string) => void;
}

const TopicsList = ({ topics, selectedTopic, onTopicSelect }: TopicsListProps) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  
  const displayedTopics = showAllTopics ? topics : topics.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Learning Topics</CardTitle>
        <CardDescription>
          Select a topic to practice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayedTopics.map((topic, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border transition-all cursor-pointer hover:bg-gray-50 ${
                selectedTopic === topic.name ? 'border-tutor-orange bg-orange-50' : 'border-gray-200'
              }`}
              onClick={() => onTopicSelect(topic.name)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{topic.name}</span>
                <ChevronRight className="h-4 w-4 text-tutor-gray" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Progress value={topic.competency} className="h-1.5" />
                </div>
                <span className="text-xs font-medium text-tutor-gray">
                  {topic.competency}%
                </span>
              </div>
            </div>
          ))}

          {topics.length > 5 && (
            <Button
              variant="ghost" 
              className="w-full text-tutor-orange" 
              onClick={() => setShowAllTopics(!showAllTopics)}
            >
              {showAllTopics ? 'Show Less' : 'Show More'}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicsList;

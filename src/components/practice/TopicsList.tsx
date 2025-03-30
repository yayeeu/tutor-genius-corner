
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, BookOpen } from 'lucide-react';
import { UnitData } from '@/hooks/useUnits';

interface TopicsListProps {
  topics: UnitData[];
  isLoading: boolean;
  selectedTopic: string | null;
  onTopicSelect: (topicName: string) => void;
}

const TopicsList = ({ topics, isLoading, selectedTopic, onTopicSelect }: TopicsListProps) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  
  const displayedTopics = showAllTopics ? topics : topics.slice(0, 5);

  if (isLoading) {
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
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg border border-gray-200 animate-pulse"
              >
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (topics.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Learning Topics</CardTitle>
          <CardDescription>
            Select a topic to practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <BookOpen className="h-12 w-12 text-tutor-gray mb-4 opacity-50" />
            <p className="text-tutor-gray">
              No topics available for this subject. Check back later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              key={topic.id}
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

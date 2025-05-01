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
  onTopicSelect: (topicId: string) => void;
}

const TopicsList = ({ topics, isLoading, selectedTopic, onTopicSelect }: TopicsListProps) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  
  const displayedTopics = showAllTopics ? topics : topics.slice(0, 5);

  if (isLoading) {
    return (
      <Card className="w-[105%]">
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
      <Card className="w-[105%]">
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
    <Card className="w-[105%]">
      <CardHeader className="pb-3">
        <CardTitle>Learning Topics</CardTitle>
        <CardDescription>
          Select a topic to practice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayedTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onTopicSelect(topic.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors
                ${selectedTopic === topic.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50 border-gray-200'}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {topic.name}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <Progress value={topic.competency} className="w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {topics.length > 5 && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => setShowAllTopics(!showAllTopics)}
          >
            {showAllTopics ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TopicsList;

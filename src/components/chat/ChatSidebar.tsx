
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, BookOpen, ChevronRight, History } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { fetchRecentTopics } from '@/services/apiService';
import { useWeakestTopics } from '@/hooks/useWeakestTopics';

interface RecentTopic {
  topicName: string;
  createdAt: string;
}

interface ChatSidebarProps {
  onTopicSelect: (topicName: string) => void;
  isLoadingTopics: boolean;
}

const ChatSidebar = ({ onTopicSelect, isLoadingTopics }: ChatSidebarProps) => {
  const [recentTopics, setRecentTopics] = useState<RecentTopic[]>([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState<boolean>(true);
  const { weakestTopics, isLoading: isLoadingSuggested } = useWeakestTopics();
  
  // Fetch recent topics when component mounts
  useEffect(() => {
    const getRecentTopics = async () => {
      setIsLoadingRecent(true);
      try {
        const topics = await fetchRecentTopics();
        setRecentTopics(topics);
      } catch (error) {
        console.error("Failed to fetch recent topics:", error);
        toast({
          title: "Error",
          description: "Failed to load recent topics. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingRecent(false);
      }
    };
    
    getRecentTopics();
  }, []);

  return (
    <div className="hidden md:flex w-64 flex-col bg-tutor-beige border-r border-tutor-light-gray">
      <div className="p-4 border-b border-tutor-light-gray">
        <h2 className="font-semibold text-tutor-dark-gray">Learning Topics</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-tutor-gray flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recent Topics
            </h3>
            
            {isLoadingRecent ? (
              <div className="py-4 text-center text-tutor-gray">
                <div className="animate-pulse flex flex-col space-y-2">
                  <div className="h-6 bg-tutor-light-gray rounded w-3/4 mx-auto"></div>
                  <div className="h-6 bg-tutor-light-gray rounded w-full mx-auto"></div>
                  <div className="h-6 bg-tutor-light-gray rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ) : (
              <ul className="space-y-2">
                {recentTopics.length > 0 ? (
                  recentTopics.map((topic, index) => (
                    <li key={index}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                        onClick={() => onTopicSelect(topic.topicName)}
                      >
                        <span>{topic.topicName}</span>
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-3 px-2 text-center">
                    <History className="h-8 w-8 text-tutor-light-gray mb-2 opacity-70" />
                    <p className="text-sm text-tutor-gray">No recent activity found</p>
                    <p className="text-xs text-tutor-light-gray mt-1">
                      Topics you learn about will appear here
                    </p>
                  </div>
                )}
              </ul>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-tutor-gray flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Suggested Topics
            </h3>
            
            {isLoadingSuggested ? (
              <div className="py-4 text-center text-tutor-gray">
                <div className="animate-pulse flex flex-col space-y-2">
                  <div className="h-6 bg-tutor-light-gray rounded w-3/4 mx-auto"></div>
                  <div className="h-6 bg-tutor-light-gray rounded w-full mx-auto"></div>
                  <div className="h-6 bg-tutor-light-gray rounded w-5/6 mx-auto"></div>
                </div>
              </div>
            ) : (
              <ul className="space-y-2">
                {weakestTopics.length > 0 ? (
                  weakestTopics.map((topic) => (
                    <li key={topic.unitId}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                        onClick={() => onTopicSelect(topic.topicName)}
                      >
                        <span>{topic.topicName}</span>
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-3 px-2 text-center">
                    <BookOpen className="h-8 w-8 text-tutor-light-gray mb-2 opacity-70" />
                    <p className="text-sm text-tutor-gray">No suggested topics yet</p>
                    <p className="text-xs text-tutor-light-gray mt-1">
                      Start studying to get personalized suggestions
                    </p>
                  </div>
                )}
              </ul>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;

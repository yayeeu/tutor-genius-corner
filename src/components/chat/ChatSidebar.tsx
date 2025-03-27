
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { fetchRecentTopics } from '@/services/apiService';

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
  
  // Fetch recent topics when component mounts
  useEffect(() => {
    const getRecentTopics = async () => {
      try {
        const topics = await fetchRecentTopics();
        // Sort topics by createdAt in descending order (most recent first)
        const sortedTopics = topics.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        // Take the 5 most recent topics
        setRecentTopics(sortedTopics.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch recent topics:", error);
        toast({
          title: "Error",
          description: "Failed to load recent topics. Please try again later.",
          variant: "destructive",
        });
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
            
            {isLoadingTopics ? (
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
                  <p className="text-sm text-tutor-gray italic px-2">No recent topics found</p>
                )}
              </ul>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-tutor-gray flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Suggested Topics
            </h3>
            <ul className="space-y-2">
              {/* Static suggested topics */}
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                  onClick={() => onTopicSelect("Algebra Basics")}
                >
                  <span>Algebra Basics</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                  onClick={() => onTopicSelect("Scientific Method")}
                >
                  <span>Scientific Method</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-tutor-gray hover:text-tutor-dark-orange hover:bg-white"
                  onClick={() => onTopicSelect("Grammar Rules")}
                >
                  <span>Grammar Rules</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;

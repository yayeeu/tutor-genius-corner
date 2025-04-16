
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface StreamingMessageProps {
  content: string;
  isStreaming: boolean;
}

// Component for rendering messages that are streaming in
const StreamingMessage = ({ content, isStreaming }: StreamingMessageProps) => {
  const [visibleContent, setVisibleContent] = useState('');
  
  useEffect(() => {
    if (isStreaming) {
      setVisibleContent(content);
    }
  }, [content, isStreaming]);

  return (
    <div className="flex justify-start">
      <div className="flex-shrink-0 mr-2 mt-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="Aku" />
          <AvatarFallback className="bg-gradient-to-br from-tutor-orange to-tutor-purple text-white">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="bg-white shadow-sm border border-tutor-light-gray/50 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%]">
        <div className="whitespace-pre-wrap break-words">
          {visibleContent}
          {isStreaming && <span className="animate-pulse">▋</span>}
        </div>
      </div>
    </div>
  );
};

export default StreamingMessage;

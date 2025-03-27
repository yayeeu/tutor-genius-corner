
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="AI Tutor" />
        <AvatarFallback className="bg-tutor-orange text-white">
          AI
        </AvatarFallback>
      </Avatar>
      <div className="chat-message-ai">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

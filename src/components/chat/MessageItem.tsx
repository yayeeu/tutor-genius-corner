
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MessageItemProps {
  content: string;
  sender: 'user' | 'ai';
  id: number;
}

const MessageItem = ({ content, sender, id }: MessageItemProps) => {
  return (
    <div
      key={id}
      className={`flex ${
        sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {sender === 'ai' && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="AI Tutor" />
          <AvatarFallback className="bg-tutor-orange text-white">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={
          sender === 'user'
            ? 'chat-message-user'
            : 'chat-message-ai'
        }
      >
        {content}
      </div>
    </div>
  );
};

export default MessageItem;

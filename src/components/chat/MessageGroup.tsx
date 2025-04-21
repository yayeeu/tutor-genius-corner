
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import MessageItem from './MessageItem';

interface MessageGroupProps {
  messages: Message[];
}

const MessageGroup = ({ messages }: MessageGroupProps) => {
  if (!messages.length) return null;

  return (
    <div className={cn(
      "space-y-1",
      messages[0].sender === 'user' ? 'flex flex-col items-end' : 'flex flex-col items-start'
    )}>
      {messages.map((message) => (
        <MessageItem 
          key={message.id}
          id={message.id}
          content={message.content}
          sender={message.sender}
        />
      ))}
    </div>
  );
};

export default MessageGroup;


import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageInput = ({ value, onChange, onSend }: MessageInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFocus = () => {
    if (value.trim().length > 0) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="flex-1 relative">
      {isExpanded ? (
        <Textarea
          placeholder="Ask your tutor anything..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10 min-h-[100px] border-tutor-light-gray"
          autoFocus
        />
      ) : (
        <Input
          placeholder="Ask your tutor anything..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="pr-10 border-tutor-light-gray"
        />
      )}
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full text-tutor-orange hover:text-tutor-dark-orange hover:bg-transparent"
        onClick={onSend}
        disabled={!value.trim()}
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInput;

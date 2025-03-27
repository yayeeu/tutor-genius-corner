
import { useState } from 'react';
import { SendHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void;
}

const ChatInputArea = ({ onSendMessage }: ChatInputAreaProps) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-tutor-light-gray bg-white">
      <div className="max-w-3xl mx-auto flex space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-tutor-light-gray"
            >
              <Sparkles className="h-4 w-4 text-tutor-orange" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              Explain this concept
            </DropdownMenuItem>
            <DropdownMenuItem>
              Give me practice problems
            </DropdownMenuItem>
            <DropdownMenuItem>
              Help me with homework
            </DropdownMenuItem>
            <DropdownMenuItem>
              Simplify this topic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex-1 relative">
          <Input
            placeholder="Ask your tutor anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-10 border-tutor-light-gray"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full text-tutor-orange hover:text-tutor-dark-orange hover:bg-transparent"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputArea;

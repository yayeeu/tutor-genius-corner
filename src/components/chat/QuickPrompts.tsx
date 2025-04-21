
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const QuickPrompts = ({ onPromptSelect }: QuickPromptsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 border-tutor-light-gray bg-white"
        >
          <Sparkles className="h-4 w-4 text-tutor-orange" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Quick prompts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onPromptSelect("Please explain this concept simply")}>
          <span className="mr-2">🧠</span> Explain this concept
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPromptSelect("Can you give me practice problems?")}>
          <span className="mr-2">📝</span> Give me practice problems
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPromptSelect("I need help with my homework")}>
          <span className="mr-2">📚</span> Help me with homework
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPromptSelect("Can you draw a picture about this?")}>
          <span className="mr-2">🎨</span> Create a visualization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickPrompts;

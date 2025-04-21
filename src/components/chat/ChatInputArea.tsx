import { useState, useRef } from 'react';
import { SendHorizontal, Sparkles, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void;
}

const ChatInputArea = ({ onSendMessage }: ChatInputAreaProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const progressIntervalRef = useRef<number | null>(null);
  const maxRecordingTime = 30; // seconds
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
    setIsExpanded(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = handleAudioStop;
      
      mediaRecorder.start();
      setIsRecording(true);
      toast({ 
        title: "Recording started", 
        description: "Speak clearly into your microphone" 
      });
      
      // Start progress timer
      let secondsElapsed = 0;
      setRecordingProgress(0);
      
      progressIntervalRef.current = window.setInterval(() => {
        secondsElapsed++;
        const progress = Math.min((secondsElapsed / maxRecordingTime) * 100, 100);
        setRecordingProgress(progress);
        
        if (secondsElapsed >= maxRecordingTime) {
          stopRecording();
        }
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Microphone access denied",
        description: "Please enable microphone access to use voice input",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  };
  
  const handleAudioStop = async () => {
    if (audioChunksRef.current.length === 0) return;
    
    setRecordingProgress(0);
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    
    // Convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      const base64Audio = base64data.split(',')[1]; // Remove data URL prefix
      
      try {
        toast({ title: "Converting speech to text..." });
        
        // Replace with actual endpoint URL
        const response = await fetch("/api/speech-to-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audio: base64Audio }),
        });
        
        if (!response.ok) {
          throw new Error("Speech recognition failed");
        }
        
        const { text } = await response.json();
        
        if (text && text.trim()) {
          setInputValue(text);
          // Don't auto-send to allow user to edit
          toast({ title: "Speech converted to text", description: "You can edit before sending" });
        } else {
          toast({ 
            title: "Could not recognize speech", 
            description: "Please try speaking more clearly", 
            variant: "destructive" 
          });
        }
      } catch (error) {
        console.error("Error in speech recognition:", error);
        toast({
          title: "Speech recognition error",
          description: "Please try again or use text input",
          variant: "destructive",
        });
      }
    };
  };

  const handleFocus = () => {
    if (inputValue.trim().length > 0) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="p-4 border-t border-tutor-light-gray bg-white">
      <div className="max-w-3xl mx-auto flex flex-col space-y-2">
        {isRecording && (
          <div className="w-full mb-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-tutor-orange font-medium">Recording...</span>
              <span>{Math.floor(recordingProgress / 100 * maxRecordingTime)}s / {maxRecordingTime}s</span>
            </div>
            <Progress value={recordingProgress} className="h-1.5" />
          </div>
        )}
        
        <div className="flex space-x-2">
          <div className="flex space-x-2">
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
                <DropdownMenuItem onClick={() => setInputValue("Please explain this concept simply")}>
                  <span className="mr-2">🧠</span> Explain this concept
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setInputValue("Can you give me practice problems?")}>
                  <span className="mr-2">📝</span> Give me practice problems
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setInputValue("I need help with my homework")}>
                  <span className="mr-2">📚</span> Help me with homework
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setInputValue("Can you draw a picture about this?")}>
                  <span className="mr-2">🎨</span> Create a visualization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 border-tutor-light-gray ${isRecording ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white'}`}
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex-1 relative">
            {isExpanded ? (
              <Textarea
                placeholder="Ask your tutor anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10 min-h-[100px] border-tutor-light-gray"
                autoFocus
              />
            ) : (
              <Input
                placeholder="Ask your tutor anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                className="pr-10 border-tutor-light-gray"
              />
            )}
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
    </div>
  );
};

export default ChatInputArea;

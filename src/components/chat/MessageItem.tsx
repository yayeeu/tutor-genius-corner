import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Copy, CheckCircle, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Logger from '@/utils/logger';
import { useResponsive } from '@/hooks/useResponsive';

interface MessageItemProps {
  content: string;
  sender: 'user' | 'ai';
  id: number;
}

const MessageItem = ({ content, sender, id }: MessageItemProps) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { isMobile } = useResponsive();
  const speechSynthesis = window.speechSynthesis;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast({ title: "Copied to clipboard!" });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      Logger.error('Failed to copy to clipboard', {
        context: 'MessageItem',
        error
      });
      toast({ 
        title: "Failed to copy", 
        variant: "destructive" 
      });
    }
  };
  
  const handleTextToSpeech = () => {
    try {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        Logger.error('Speech synthesis error', {
          context: 'MessageItem',
          error: event
        });
        setIsSpeaking(false);
        toast({ 
          title: "Failed to speak text", 
          variant: "destructive" 
        });
      };
      
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } catch (error) {
      Logger.error('Text-to-speech failed', {
        context: 'MessageItem',
        error
      });
      toast({ 
        title: "Text-to-speech unavailable", 
        variant: "destructive" 
      });
    }
  };

  const renderContent = () => {
    return content.split(/(\p{Emoji})/gu).map((part, index) => {
      const isEmoji = /^\p{Emoji}$/gu.test(part);
      return isEmoji ? (
        <span key={index} className="text-xl mx-0.5">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      );
    });
  };

  return (
    <div
      className={`flex ${
        sender === 'user' ? 'justify-end' : 'justify-start'
      } group relative`}
    >
      {sender === 'ai' && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <Avatar className="h-6 w-6 md:h-8 md:w-8 animate-float-slow">
            <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="Aku" />
            <AvatarFallback className="bg-gradient-to-br from-tutor-orange to-tutor-purple text-white text-xs md:text-sm">
              AK
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[90%] md:max-w-[85%] px-3 md:px-4 py-2 md:py-2.5 rounded-2xl mb-2 text-sm md:text-base",
          sender === 'user' 
            ? "bg-tutor-purple/20 border border-tutor-purple/10 text-black rounded-tr-none" 
            : "bg-white shadow-sm border border-tutor-light-gray/50 rounded-tl-none"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{renderContent()}</div>
      </div>
      
      <div className={cn(
        "absolute top-0 -mt-7 md:-mt-9 opacity-0 group-hover:opacity-100 transition-opacity",
        isMobile ? "opacity-100" : "",
        sender === 'user' ? "right-0" : "left-9"
      )}>
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 md:h-6 md:w-6 rounded-full"
            onClick={handleCopy}
            title="Copy text"
          >
            {isCopied ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
          
          {sender === 'ai' && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 md:h-6 md:w-6 rounded-full"
              onClick={handleTextToSpeech}
              title={isSpeaking ? "Stop speaking" : "Read aloud"}
            >
              {isSpeaking ? (
                <VolumeX className="h-3 w-3 text-red-500" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;

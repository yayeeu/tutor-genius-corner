
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';

const TypingIndicator = () => {
  const [emojis, setEmojis] = useState(['🤔', '💭', '✨']);
  const [currentEmoji, setCurrentEmoji] = useState(0);

  // Rotate emojis for a fun effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 2000);
    
    return () => clearInterval(timer);
  }, [emojis.length]);

  return (
    <div className="flex justify-start items-start">
      <div className="flex-shrink-0 mr-2 mt-1">
        <Avatar className="h-8 w-8 animate-pulse">
          <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="Aku" />
          <AvatarFallback className="bg-gradient-to-br from-tutor-orange to-tutor-purple text-white">
            AK
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="bg-white shadow-sm border border-tutor-light-gray/50 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%]">
        <div className="flex items-center space-x-1">
          <span className="text-xl mr-1">{emojis[currentEmoji]}</span>
          <div className="flex space-x-1 items-center">
            <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-tutor-light-gray rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;

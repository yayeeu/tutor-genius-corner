
import { useState } from 'react';
import QuickPrompts from './QuickPrompts';
// import VoiceRecorder from './VoiceRecorder';  // Commented out as requested
import MessageInput from './MessageInput';

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

  return (
    <div className="p-4 border-t border-tutor-light-gray bg-white">
      <div className="max-w-3xl mx-auto flex flex-col space-y-2">
        <div className="flex space-x-2">
          <div className="flex space-x-2">
            <QuickPrompts onPromptSelect={setInputValue} />
            {/* <VoiceRecorder onTranscriptionComplete={setInputValue} />  // Commented out as requested */}
          </div>
          
          <MessageInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInputArea;

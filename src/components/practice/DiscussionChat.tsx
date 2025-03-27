
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatMessage {
  sender: string;
  message: string;
}

interface DiscussionChatProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const DiscussionChat = ({ chatHistory, onSendMessage }: DiscussionChatProps) => {
  const [chatMessage, setChatMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    onSendMessage(chatMessage);
    setChatMessage("");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Discussion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <p className="text-tutor-gray text-sm">
              Ask for hints or clarification about this question.
            </p>
          ) : (
            chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  chat.sender === 'ai' 
                    ? 'bg-orange-50 border border-orange-100' 
                    : 'bg-gray-100'
                }`}
              >
                <p>{chat.message}</p>
              </div>
            ))
          )}
        </div>
        
        <div className="flex gap-2">
          <Input 
            placeholder="Ask a question about this topic..." 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-tutor-orange hover:bg-tutor-dark-orange"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionChat;

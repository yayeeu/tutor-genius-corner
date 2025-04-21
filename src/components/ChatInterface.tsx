
import { useResponsive } from '@/hooks/useResponsive';
import ChatContainer from './chat/ChatContainer';

const ChatInterface = () => {
  const { isMobile } = useResponsive();
  
  return (
    <div className={`min-h-screen ${isMobile ? 'px-2' : 'px-4'}`}>
      <ChatContainer />
    </div>
  );
};

export default ChatInterface;

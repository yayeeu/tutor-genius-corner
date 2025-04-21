
import ChatContainer from '@/components/chat/ChatContainer';
import { useGradeLevel } from '@/hooks/useGradeLevel';
import { useResponsive } from '@/hooks/useResponsive';

const Chat = () => {
  const gradeLevel = useGradeLevel();
  const { isMobile } = useResponsive();
  
  return (
    <div className="min-h-screen bg-white p-2 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className={`${isMobile ? 'mb-3 px-2' : 'mb-6'}`}>
          <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">Chat with AI Tutor</h1>
          <p className="text-sm md:text-base text-tutor-gray">
            {gradeLevel ? `Get personalized help with all your Grade ${gradeLevel} Courses` : 'Loading...'}
          </p>
        </div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;

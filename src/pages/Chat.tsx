
import ChatContainer from '@/components/chat/ChatContainer';
import { useGradeLevel } from '@/hooks/useGradeLevel';

const Chat = () => {
  const gradeLevel = useGradeLevel();
  
  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Chat with AI Tutor</h1>
          <p className="text-tutor-gray">
            {gradeLevel ? `Get personalized help with all your Grade ${gradeLevel} Courses` : 'Loading...'}
          </p>
        </div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;

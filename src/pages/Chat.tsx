
import ChatContainer from '@/components/chat/ChatContainer';

const Chat = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Chat with AI Tutor</h1>
          <p className="text-tutor-gray">
            Get personalized help with your studies based on the Ethiopian curriculum for your grade level.
          </p>
        </div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;

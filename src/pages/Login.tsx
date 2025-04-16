
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { Lightbulb, Stars } from 'lucide-react';

const Login = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we have a user and we're not loading
    if (user && !isLoading) {
      // Use localStorage to check if this is the first login
      const hasLoggedInBefore = localStorage.getItem(`has_logged_in_before_${user.id}`);
      
      if (!hasLoggedInBefore) {
        // First time login - mark it
        localStorage.setItem(`has_logged_in_before_${user.id}`, 'true');
      }
      
      // Always redirect to learn page
      navigate('/learn');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-tutor-orange/10 via-tutor-purple/5 to-transparent p-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto lg:mx-0 bg-transparent flex items-center justify-center relative overflow-hidden">
              <img 
                src="/lovable-uploads/4577bbc7-f544-4d73-90d5-fea420d3c7a9.png" 
                alt="Aku Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-tutor-orange to-tutor-purple">Aku</span>
          </h1>
          
          <p className="text-lg text-tutor-gray mb-6">
            Your personal AI tutor that makes learning exciting and helps you master the Ethiopian curriculum at your own pace!
          </p>
          
          <div className="hidden lg:block space-y-4 mt-8">
            <div className="flex items-start space-x-3">
              <div className="bg-tutor-orange/20 p-2 rounded-full">
                <Lightbulb className="h-5 w-5 text-tutor-orange" />
              </div>
              <div>
                <h3 className="font-medium">Learn at your own pace</h3>
                <p className="text-sm text-tutor-gray">Study when and how you want with personalized lessons</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-tutor-purple/20 p-2 rounded-full">
                <Stars className="h-5 w-5 text-tutor-purple" />
              </div>
              <div>
                <h3 className="font-medium">Track your progress</h3>
                <p className="text-sm text-tutor-gray">See how far you've come with fun achievements</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold mb-6 text-center text-tutor-navy">Log in to start learning</h2>
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


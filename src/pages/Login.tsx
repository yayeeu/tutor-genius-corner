
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-tutor-orange/10 to-transparent p-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-tutor-orange to-tutor-purple">Aku</span>
          </h1>
          <p className="text-lg text-tutor-gray">
            Your personal AI tutor that makes learning exciting and helps you master the Ethiopian curriculum at your own pace!
          </p>
        </div>
        
        <div className="w-full lg:w-1/2">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

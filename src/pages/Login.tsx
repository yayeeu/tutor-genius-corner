
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import WelcomeSection from '@/components/auth/WelcomeSection';
import AuthSection from '@/components/auth/AuthSection';

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
      
      // Always redirect to chat page
      navigate('/chat');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tutor-orange/5 via-tutor-purple/5 to-transparent p-6 animate-fade-in">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        <WelcomeSection />
        <AuthSection />
      </div>
    </div>
  );
};

export default Login;


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
      
      // Always redirect to chat-tutor
      navigate('/chat-tutor');
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-tutor-orange/10 to-transparent p-6">
      <AuthForm />
    </div>
  );
};

export default Login;

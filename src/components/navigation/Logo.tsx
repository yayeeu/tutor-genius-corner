
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Logo = () => {
  const { user } = useAuth();
  const redirectPath = user ? '/learn' : '/login';

  return (
    <Link to={redirectPath} className="flex items-center space-x-2">
      <div className="w-14 h-14 bg-transparent flex items-center justify-center relative overflow-hidden">
        <img 
          src="/lovable-uploads/4577bbc7-f544-4d73-90d5-fea420d3c7a9.png" 
          alt="Aku Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;


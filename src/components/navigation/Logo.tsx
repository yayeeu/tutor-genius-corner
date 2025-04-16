import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Logo = () => {
  const { user } = useAuth();
  const redirectPath = user ? '/learn' : '/login';

  return (
    <Link to={redirectPath} className="flex items-center space-x-2">
      <div className="w-14 h-14 bg-transparent flex items-center justify-center relative overflow-hidden">
        <img 
          src="/lovable-uploads/4486bd33-6ab3-4b92-a5e1-6e4694772ae3.png" 
          alt="Aku Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;

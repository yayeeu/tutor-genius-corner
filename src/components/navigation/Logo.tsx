
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Logo = () => {
  const { user } = useAuth();
  const redirectPath = user ? '/learn' : '/login';

  return (
    <Link to={redirectPath} className="flex items-center space-x-2">
      <div className="w-14 h-14 bg-gradient-to-br from-tutor-purple to-tutor-orange rounded-lg flex items-center justify-center relative overflow-hidden">
        <BookOpen className="h-8 w-8 text-white absolute z-10" />
        <GraduationCap className="h-4 w-4 text-yellow-200 absolute top-2 right-2 z-20" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl text-tutor-navy leading-tight">Aku</span>
        <span className="text-xs text-tutor-gray leading-tight">Learning Platform</span>
      </div>
    </Link>
  );
};

export default Logo;

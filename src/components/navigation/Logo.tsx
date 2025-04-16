
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Logo = () => {
  const { user } = useAuth();
  const redirectPath = user ? '/learn' : '/login';

  return (
    <Link to={redirectPath} className="flex items-center space-x-2">
      <div className="w-14 h-14 bg-gradient-to-br from-aku-green to-aku-yellow rounded-2xl flex items-center justify-center relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-aku-green via-aku-yellow to-aku-cream opacity-80"></div>
        <BookOpen className="h-8 w-8 text-white absolute z-10 animate-pulse-subtle" />
        <GraduationCap className="h-4 w-4 text-aku-blue absolute top-2 right-2 z-20 animate-float" />
        <Sparkles className="h-3 w-3 text-white absolute bottom-2 left-2 z-20" />
      </div>
      <div className="flex flex-col">
        <span className="font-courier font-bold text-2xl text-aku-blue leading-tight">Aku</span>
        <span className="text-xs text-aku-blue/70 leading-tight font-inter">Your Learning Friend</span>
      </div>
    </Link>
  );
};

export default Logo;

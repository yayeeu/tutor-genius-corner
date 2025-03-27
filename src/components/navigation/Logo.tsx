
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-14 h-14 bg-tutor-orange rounded-lg flex items-center justify-center">
        <GraduationCap className="h-8 w-8 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-2xl text-tutor-navy leading-tight">EduNova</span>
        <span className="text-xs text-tutor-gray leading-tight">Ethiopian Curriculum</span>
      </div>
    </Link>
  );
};

export default Logo;

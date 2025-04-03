
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, HelpCircle, BookOpen, Star, Trophy } from 'lucide-react';

interface DesktopNavigationProps {
  user: any;
  isActive: (path: string) => boolean;
}

const DesktopNavigation = ({ user, isActive }: DesktopNavigationProps) => {
  // Check if user has teacher or admin role (for future implementation)
  const isTeacher = user?.user_metadata?.role === 'teacher';
  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <div className="hidden md:flex items-center space-x-2">
      {user && (
        <>
          <Link to="/learn" className={`${isActive('/learn') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-tutor-orange/10`}>
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>Learn</span>
          </Link>
          
          <Link to="/practice" className={`${isActive('/practice') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-tutor-purple/10`}>
            <BookOpen className="h-4 w-4 mr-2" />
            <span>Practice</span>
          </Link>
          
          <Link to="/dashboard" className={`${isActive('/dashboard') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-tutor-orange/10`}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span>Dashboard</span>
          </Link>
          
          {/* Achievement section for students */}
          {!isTeacher && !isAdmin && (
            <Link to="/achievements" className={`${isActive('/achievements') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-yellow-100`}>
              <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
              <span>Achievements</span>
            </Link>
          )}
          
          {/* Teacher-specific navigation (for future) */}
          {isTeacher && (
            <Link to="/my-students" className={`${isActive('/my-students') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-blue-100`}>
              <Star className="h-4 w-4 mr-2 text-blue-500" />
              <span>My Students</span>
            </Link>
          )}
          
          {/* Admin-specific navigation (for future) */}
          {isAdmin && (
            <Link to="/school-admin" className={`${isActive('/school-admin') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-green-100`}>
              <Star className="h-4 w-4 mr-2 text-green-500" />
              <span>School Admin</span>
            </Link>
          )}
          
          <Link to="/help" className={`${isActive('/help') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-tutor-purple/10`}>
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>Help</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default DesktopNavigation;

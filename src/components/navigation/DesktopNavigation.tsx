
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, HelpCircle, Star, Globe, LogIn } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

interface DesktopNavigationProps {
  user: any;
  isActive: (path: string) => boolean;
}

const DesktopNavigation = ({ user, isActive }: DesktopNavigationProps) => {
  const isTeacher = user?.user_metadata?.role === 'teacher';
  const isAdmin = user?.user_metadata?.role === 'admin';
  const { t } = useTranslation();
  const location = useLocation();

  const showSignIn = !user && location.pathname !== '/login';

  return (
    <div className="hidden md:flex items-center space-x-2">
      {user && (
        <>
          <Link to="/learn" className={`${isActive('/learn') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-yellow/10`}>
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>{t('nav.learn')}</span>
          </Link>
          
          <Link to="/dashboard" className={`${isActive('/dashboard') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-yellow/10`}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span>{t('nav.dashboard')}</span>
          </Link>
          
          {/* Teacher-specific navigation */}
          {isTeacher && (
            <Link to="/my-students" className={`${isActive('/my-students') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10`}>
              <Star className="h-4 w-4 mr-2 text-aku-green" />
              <span>{t('nav.myStudents')}</span>
            </Link>
          )}
          
          {/* Admin-specific navigation */}
          {isAdmin && (
            <Link to="/school-admin" className={`${isActive('/school-admin') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10`}>
              <Star className="h-4 w-4 mr-2 text-aku-green" />
              <span>{t('nav.schoolAdmin')}</span>
            </Link>
          )}
          
          <Link to="/help" className={`${isActive('/help') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10`}>
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>{t('nav.help')}</span>
          </Link>
        </>
      )}

      {showSignIn && (
        <Link to="/login" className="flex items-center gap-2 text-tutor-dark-gray hover:text-tutor-orange transition-colors">
          <LogIn className="h-4 w-4" />
          <span>{t('nav.signIn')}</span>
        </Link>
      )}
    </div>
  );
};

export default DesktopNavigation;


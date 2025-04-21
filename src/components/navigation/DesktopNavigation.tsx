import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, HelpCircle, Star, LogIn, BookOpen } from 'lucide-react';
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
          <Link to="/chat" className={`${isActive('/chat') ? 'nav-link-active bg-aku-green/10 text-aku-green' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10 hover:text-aku-green`}>
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>{t('nav.chat')}</span>
          </Link>
          
          <Link to="/learn" className={`${isActive('/learn') ? 'nav-link-active bg-aku-green/10 text-aku-green' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10 hover:text-aku-green`}>
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{t('nav.learn')}</span>
          </Link>
          
          <Link to="/dashboard" className={`${isActive('/dashboard') ? 'nav-link-active bg-aku-green/10 text-aku-green' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10 hover:text-aku-green`}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span>{t('nav.dashboard')}</span>
          </Link>
          
          {isTeacher && (
            <Link to="/my-students" className={`${isActive('/my-students') ? 'nav-link-active bg-aku-green/10 text-aku-green' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10 hover:text-aku-green`}>
              <Star className="h-4 w-4 mr-2 text-aku-green" />
              <span>{t('nav.myStudents')}</span>
            </Link>
          )}
          
          {isAdmin && (
            <Link to="/school-admin" className={`${isActive('/school-admin') ? 'nav-link-active bg-aku-green/10 text-aku-green' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10 hover:text-aku-green`}>
              <Star className="h-4 w-4 mr-2 text-aku-green" />
              <span>{t('nav.schoolAdmin')}</span>
            </Link>
          )}
          
          <Link to="/help" className={`${isActive('/help') ? 'nav-link-active bg-aku-green/10 text-aku-green' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10 hover:text-aku-green`}>
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>{t('nav.help')}</span>
          </Link>
        </>
      )}

      {showSignIn && (
        <Link to="/login" className="flex items-center gap-2 text-tutor-dark-gray hover:text-aku-green transition-colors">
          <LogIn className="h-4 w-4" />
          <span>{t('nav.signIn')}</span>
        </Link>
      )}
    </div>
  );
};

export default DesktopNavigation;

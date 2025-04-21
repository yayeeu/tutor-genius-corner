import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, HelpCircle, BookOpen, Star, Trophy, Globe, LogIn } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

interface DesktopNavigationProps {
  user: any;
  isActive: (path: string) => boolean;
}

const DesktopNavigation = ({ user, isActive }: DesktopNavigationProps) => {
  const isTeacher = user?.user_metadata?.role === 'teacher';
  const isAdmin = user?.user_metadata?.role === 'admin';
  const { languages, currentLanguage, changeLanguage } = useLanguage();
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
          
          <Link to="/practice" className={`${isActive('/practice') ? 'nav-link-active' : 'nav-link'} flex items-center rounded-full px-4 py-2 transition-all duration-200 hover:bg-aku-green/10`}>
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{t('nav.practice')}</span>
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

          {/* Commented out Language selector */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 px-3 py-2 rounded-full hover:bg-aku-cream/50 transition-colors">
              <Globe className="h-4 w-4 text-aku-blue" />
              <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-aku-cream">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="rounded-lg cursor-pointer"
                >
                  <span className="font-medium mr-2">{lang.code.toUpperCase()}</span>
                  <span className="text-sm text-aku-blue/70">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
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

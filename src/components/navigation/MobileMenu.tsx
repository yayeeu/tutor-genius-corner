
import { Link } from 'react-router-dom';
import { LogIn, LogOut, FileText, MessageCircle, LayoutDashboard, HelpCircle, BookOpen, Globe, Trophy } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import UserAvatar from '../UserAvatar';
import { useState } from 'react';

interface MobileMenuProps {
  isMenuOpen: boolean;
  isActive: (path: string) => boolean;
  user: any;
  signOut: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isMenuOpen, isActive, user, signOut, setIsMenuOpen }: MobileMenuProps) => {
  const isTeacher = user?.user_metadata?.role === 'teacher';
  const isAdmin = user?.user_metadata?.role === 'admin';
  const [language, setLanguage] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'አማ', name: 'Amharic' },
    { code: 'OM', name: 'Oromo' },
    { code: 'ትግ', name: 'Tigrinya' }
  ];

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg animate-fade-in rounded-b-2xl">
      <div className="flex flex-col p-4 space-y-3">
        {user ? (
          <div className="flex items-center p-2 mb-2 bg-aku-cream/30 rounded-2xl">
            <UserAvatar className="mr-2" showName={true} />
          </div>
        ) : (
          <Link 
            to="/login" 
            className="flex items-center gap-2 p-2 text-aku-blue rounded-xl hover:bg-aku-yellow/10 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn className="h-4 w-4" />
            <span className="font-medium">Sign In</span>
          </Link>
        )}
        
        {user && (
          <>
            <Link 
              to="/learn" 
              className={`${isActive('/learn') ? 'bg-aku-yellow/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-yellow/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Learn</span>
            </Link>
            <Link 
              to="/practice" 
              className={`${isActive('/practice') ? 'bg-aku-green/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-green/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Practice</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`${isActive('/dashboard') ? 'bg-aku-yellow/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-yellow/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span>Dashboard</span>
            </Link>

            {!isTeacher && !isAdmin && (
              <Link 
                to="/achievements" 
                className={`${isActive('/achievements') ? 'bg-aku-yellow/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-yellow/10 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="h-4 w-4 mr-2" />
                <span>Achievements</span>
              </Link>
            )}

            {/* Teacher-specific navigation (for future) */}
            {isTeacher && (
              <Link 
                to="/my-students" 
                className={`${isActive('/my-students') ? 'bg-aku-green/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-green/10 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Star className="h-4 w-4 mr-2" />
                <span>My Students</span>
              </Link>
            )}
            
            {/* Admin-specific navigation (for future) */}
            {isAdmin && (
              <Link 
                to="/school-admin" 
                className={`${isActive('/school-admin') ? 'bg-aku-green/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-green/10 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Star className="h-4 w-4 mr-2" />
                <span>School Admin</span>
              </Link>
            )}

            <Link 
              to="/help" 
              className={`${isActive('/help') ? 'bg-aku-green/10 text-aku-blue font-medium' : 'text-aku-blue'} flex items-center p-2 rounded-xl hover:bg-aku-green/10 transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              <span>Help</span>
            </Link>
          </>
        )}
        
        {/* Language selector */}
        <div className="p-2">
          <div className="flex items-center mb-2">
            <Globe className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Language</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-center py-1 px-2 text-sm rounded-lg transition-colors ${
                  language === lang.code 
                    ? 'bg-aku-yellow font-medium text-aku-blue' 
                    : 'bg-aku-cream/30 text-aku-blue hover:bg-aku-cream/50'
                }`}
              >
                {lang.code}
              </button>
            ))}
          </div>
        </div>
        
        <Separator className="my-2 bg-aku-cream" />
        
        <div className="flex flex-col space-y-3 text-sm">
          <Link 
            to="/terms" 
            className="flex items-center gap-2 text-aku-blue hover:text-aku-green rounded-xl p-2 hover:bg-aku-green/5 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </Link>
          
          <Link 
            to="/privacy" 
            className="flex items-center gap-2 text-aku-blue hover:text-aku-green rounded-xl p-2 hover:bg-aku-green/5 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileText className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
          
          {user && (
            <button 
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 text-aku-red hover:text-aku-red/80 p-2 rounded-xl hover:bg-aku-red/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

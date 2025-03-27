
import { Link } from 'react-router-dom';
import { LogIn, LogOut, FileText, MessageCircle, LayoutDashboard, HelpCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import UserAvatar from '../UserAvatar';

interface MobileMenuProps {
  isMenuOpen: boolean;
  isActive: (path: string) => boolean;
  user: any;
  signOut: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isMenuOpen, isActive, user, signOut, setIsMenuOpen }: MobileMenuProps) => {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg animate-fade-in">
      <div className="flex flex-col p-4 space-y-3">
        {user ? (
          <div className="flex items-center p-2 mb-2 bg-tutor-beige/30 rounded-md">
            <UserAvatar className="mr-2" showName={true} />
          </div>
        ) : (
          <Link 
            to="/login" 
            className="flex items-center gap-2 p-2 text-tutor-dark-gray"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        )}
        
        {!user && (
          <>
            <Link 
              to="/" 
              className={isActive('/') ? 'nav-link-active' : 'nav-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/products" 
              className={isActive('/products') ? 'nav-link-active' : 'nav-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            
            <Link 
              to="/about" 
              className={isActive('/about') ? 'nav-link-active' : 'nav-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </>
        )}
        
        {user && (
          <>
            <Link 
              to="/learn" 
              className={`${isActive('/learn') ? 'nav-link-active' : 'nav-link'} flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Learn</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`${isActive('/dashboard') ? 'nav-link-active' : 'nav-link'} flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/help" 
              className={`${isActive('/help') ? 'nav-link-active' : 'nav-link'} flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              <span>Help</span>
            </Link>
          </>
        )}
        
        <Separator className="my-2" />
        
        <div className="flex flex-col space-y-3 text-sm">
          <Link 
            to="/terms" 
            className="flex items-center gap-2 text-tutor-gray hover:text-tutor-purple"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </Link>
          
          <Link 
            to="/privacy" 
            className="flex items-center gap-2 text-tutor-gray hover:text-tutor-purple"
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
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
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


import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './navigation/Logo';
import DesktopNavigation from './navigation/DesktopNavigation';
import UserMenu from './navigation/UserMenu';
import MobileMenu from './navigation/MobileMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navigation */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <DesktopNavigation user={user} isActive={isActive} />
          
          {/* User Menu */}
          <div className="hidden md:block">
            <UserMenu user={user} signOut={signOut} />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-tutor-dark-gray" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu 
          isMenuOpen={isMenuOpen} 
          isActive={isActive} 
          user={user} 
          signOut={signOut} 
          setIsMenuOpen={setIsMenuOpen} 
        />
      </div>
    </nav>
  );
};

export default Navigation;

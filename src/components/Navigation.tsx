
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogIn, Info, LogOut, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from './UserAvatar';

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
      {/* Secondary Navigation - Small top bar */}
      <div className="bg-tutor-navy text-white py-1 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left section - empty for now */}
          <div></div>
          
          {/* Right section with links */}
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/about" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
              <Info className="w-3 h-3" />
              <span>About</span>
            </Link>
            <Link to="/terms" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
              <FileText className="w-3 h-3" />
              <span>Terms</span>
            </Link>
            <Link to="/privacy" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
              <FileText className="w-3 h-3" />
              <span>Privacy</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tutor-orange rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-tutor-navy leading-tight">EduNova</span>
              <span className="text-xs text-tutor-gray leading-tight">Ethiopian Curriculum</span>
            </div>
          </Link>
          
          {/* Desktop Navigation - Changed order of Dashboard and AI Tutor */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={isActive('/') ? 'nav-link-active' : 'nav-link'}>
              Home
            </Link>
            {user && (
              <>
                <Link to="/chat-tutor" className={isActive('/chat-tutor') ? 'nav-link-active' : 'nav-link'}>
                  AI Tutor
                </Link>
                <Link to="/dashboard" className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}>
                  Dashboard
                </Link>
              </>
            )}
          </div>
          
          {/* Student profile with dropdown menu */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <UserAvatar showName={true} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600">
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 text-tutor-dark-gray hover:text-tutor-orange transition-colors">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
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
        
        {/* Mobile Menu - Changed order of Dashboard and AI Tutor */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[calc(4rem+1px)] inset-x-0 bg-white shadow-lg animate-fade-in">
            <div className="flex flex-col p-4 space-y-3">
              {/* Mobile user profile */}
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
              
              <Link 
                to="/" 
                className={isActive('/') ? 'nav-link-active' : 'nav-link'}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/chat-tutor" 
                    className={isActive('/chat-tutor') ? 'nav-link-active' : 'nav-link'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    AI Tutor
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </>
              )}
              
              <Separator className="my-2" />
              
              {/* Secondary mobile menu items */}
              <div className="flex flex-col space-y-3 text-sm">
                <Link 
                  to="/about" 
                  className="flex items-center gap-2 text-tutor-gray hover:text-tutor-purple"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Link>
                
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
        )}
      </div>
    </nav>
  );
};

export default Navigation;

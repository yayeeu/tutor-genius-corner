
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogIn, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // In a real app, this would trigger language context changes
    console.log(`Language changed to: ${lang}`);
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Secondary Navigation - Small top bar */}
      <div className="bg-tutor-navy text-white py-1 px-6">
        <div className="max-w-7xl mx-auto flex justify-end items-center space-x-4 text-xs">
          <Link to="/about" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
            <Info className="w-3 h-3" />
            <span>About</span>
          </Link>
          
          <Separator orientation="vertical" className="h-4 bg-white/20" />
          
          {/* Login Link */}
          <Link to="/login" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
            <LogIn className="w-3 h-3" />
            <span>Login</span>
          </Link>
          
          <Separator orientation="vertical" className="h-4 bg-white/20" />
          
          {/* Profile Link */}
          <Link to="/dashboard" className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
            <User className="w-3 h-3" />
            <span>Account</span>
          </Link>
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={isActive('/') ? 'nav-link-active' : 'nav-link'}>
              Home
            </Link>
            <Link to="/dashboard" className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}>
              Dashboard
            </Link>
            <Link to="/chat-tutor" className={isActive('/chat-tutor') ? 'nav-link-active' : 'nav-link'}>
              AI Tutor
            </Link>
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
        {isMenuOpen && (
          <div className="md:hidden absolute top-[calc(4rem+1px)] inset-x-0 bg-white shadow-lg animate-fade-in">
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/" 
                className={isActive('/') ? 'nav-link-active' : 'nav-link'}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/chat-tutor" 
                className={isActive('/chat-tutor') ? 'nav-link-active' : 'nav-link'}
                onClick={() => setIsMenuOpen(false)}
              >
                AI Tutor
              </Link>
              
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
                  to="/login" 
                  className="flex items-center gap-2 text-tutor-gray hover:text-tutor-purple"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 text-tutor-gray hover:text-tutor-purple"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Account</span>
                </Link>
                
                {/* Language dropdown removed from mobile menu too for consistency */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;


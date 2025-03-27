
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages, GraduationCap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
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
          <Link to="/about" className={isActive('/about') ? 'nav-link-active' : 'nav-link'}>
            About
          </Link>
          <Link to="/dashboard" className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}>
            Dashboard
          </Link>
          <Link to="/chat-tutor" className={isActive('/chat-tutor') ? 'nav-link-active' : 'nav-link'}>
            AI Tutor
          </Link>
          
          {/* Language Selector - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link flex items-center gap-1">
              <Languages className="w-4 h-4" />
              <span>{language}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem onClick={() => handleLanguageChange('English')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('Amharic')}>
                Amharic
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center ml-4">
            <Link to="/login" className="text-tutor-purple hover:text-tutor-light-purple font-medium transition-colors">
              Login
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Login Link - Mobile */}
          <Link to="/login" className="text-tutor-purple font-medium mr-2">
            Login
          </Link>
          
          {/* Language Selector - Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 text-tutor-dark-gray">
              <Languages className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem onClick={() => handleLanguageChange('English')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('Amharic')}>
                Amharic
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-3">
            <Link 
              to="/" 
              className={isActive('/') ? 'nav-link-active' : 'nav-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={isActive('/about') ? 'nav-link-active' : 'nav-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              About
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

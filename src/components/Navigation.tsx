
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-tutor-orange rounded-lg flex items-center justify-center">
            <span className="font-bold text-white">AI</span>
          </div>
          <span className="font-bold text-xl text-tutor-dark-gray">TutorGenius</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/" className={isActive('/') ? 'nav-link-active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/login" className={isActive('/login') ? 'nav-link-active' : 'nav-link'}>
            Login
          </Link>
          <Link to="/dashboard" className={isActive('/dashboard') ? 'nav-link-active' : 'nav-link'}>
            Dashboard
          </Link>
          <Link to="/chat-tutor" className={isActive('/chat-tutor') ? 'nav-link-active' : 'nav-link'}>
            AI Tutor
          </Link>
          <Link to="/screening" className='primary-button'>
            Get Started
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-tutor-dark-gray" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
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
              to="/login" 
              className={isActive('/login') ? 'nav-link-active' : 'nav-link'}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
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
            <Link 
              to="/screening" 
              className='primary-button text-center'
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

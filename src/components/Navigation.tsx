
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogIn, Info, LogOut } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
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
          
          {/* Student profile with dropdown menu */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="Student" />
                    <AvatarFallback className="bg-tutor-orange text-white">ST</AvatarFallback>
                  </Avatar>
                  <div className="text-tutor-dark-gray">
                    <p className="font-medium text-sm">Alex Johnson</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600">
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              {/* Mobile student profile with dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full focus:outline-none">
                  <div className="flex items-center p-2 mb-2 bg-tutor-beige/30 rounded-md">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/lovable-uploads/e8e2205f-1e97-49b4-9f64-a561042e0a3b.png" alt="Student" />
                      <AvatarFallback className="bg-tutor-orange text-white">ST</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium text-sm text-tutor-dark-gray">Alex Johnson</p>
                      <p className="text-xs text-tutor-gray">Grade 10</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>My Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600">
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
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
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

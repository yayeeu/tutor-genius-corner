
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  
  return (
    <footer className="py-6 mt-auto bg-white border-t border-aku-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <p className="text-aku-blue/70 text-sm">
              © {currentYear} Aku Education. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/terms" 
              className="text-aku-blue/70 hover:text-aku-green transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/privacy" 
              className="text-aku-blue/70 hover:text-aku-green transition-colors"
            >
              Privacy
            </Link>
            
            {user && (
              <Link 
                to="/help" 
                className="text-aku-blue/70 hover:text-aku-green transition-colors"
              >
                Help
              </Link>
            )}

            <div className="hidden md:flex items-center space-x-2">
              <Globe className="h-3 w-3 text-aku-blue/70" />
              <div className="flex space-x-1">
                <span className={cn("cursor-pointer hover:text-aku-yellow transition-colors", "text-aku-yellow font-medium")}>EN</span>
                <span className={cn("cursor-pointer hover:text-aku-yellow transition-colors")}>አማ</span>
                <span className={cn("cursor-pointer hover:text-aku-yellow transition-colors")}>OM</span>
                <span className={cn("cursor-pointer hover:text-aku-yellow transition-colors")}>ትግ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

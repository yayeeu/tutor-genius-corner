
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 mt-auto bg-white border-t border-tutor-light-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <p className="text-tutor-gray text-sm">
              © {currentYear} EduNova. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/terms" className="text-tutor-gray hover:text-tutor-orange transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-tutor-gray hover:text-tutor-orange transition-colors">
              Privacy
            </Link>
            <Link 
              to="/contact" 
              className="text-tutor-gray hover:text-tutor-orange transition-colors flex items-center gap-1"
              aria-label="Contact us"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 mt-8 text-center text-sm text-tutor-gray border-t border-tutor-light-gray">
      <div className="container mx-auto">
        <p>© {currentYear} EduNova. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

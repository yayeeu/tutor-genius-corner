
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, HelpCircle } from 'lucide-react';

interface DesktopNavigationProps {
  user: any;
  isActive: (path: string) => boolean;
}

const DesktopNavigation = ({ user, isActive }: DesktopNavigationProps) => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      {!user && (
        <>
          <Link to="/" className={isActive('/') ? 'nav-link-active' : 'nav-link'}>
            Home
          </Link>
          <Link to="/products" className={isActive('/products') ? 'nav-link-active' : 'nav-link'}>
            Products
          </Link>
          <Link to="/about" className={isActive('/about') ? 'nav-link-active' : 'nav-link'}>
            About
          </Link>
        </>
      )}
      {user && (
        <>
          <Link to="/learn" className={`${isActive('/learn') ? 'nav-link-active' : 'nav-link'} flex items-center`}>
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>Learn</span>
          </Link>
          <Link to="/dashboard" className={`${isActive('/dashboard') ? 'nav-link-active' : 'nav-link'} flex items-center`}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            <span>Dashboard</span>
          </Link>
          <Link to="/help" className={`${isActive('/help') ? 'nav-link-active' : 'nav-link'} flex items-center`}>
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>Help</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default DesktopNavigation;

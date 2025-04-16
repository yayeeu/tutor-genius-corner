
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  return (
    <footer className="py-6 mt-auto bg-white border-t border-aku-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <p className="text-aku-blue/70 text-sm">
              © {currentYear} Aku Education. {t('footer.allRightsReserved')}
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/terms" 
              className="text-aku-blue/70 hover:text-aku-green transition-colors"
            >
              {t('footer.termsOfService')}
            </Link>
            <Link 
              to="/privacy" 
              className="text-aku-blue/70 hover:text-aku-green transition-colors"
            >
              {t('footer.privacyPolicy')}
            </Link>
            
            {user && (
              <Link 
                to="/help" 
                className="text-aku-blue/70 hover:text-aku-green transition-colors"
              >
                {t('footer.help')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

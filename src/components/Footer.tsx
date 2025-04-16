
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const { languages, currentLanguage, changeLanguage } = useLanguage();
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

            <div className="hidden md:flex items-center space-x-2">
              <Globe className="h-3 w-3 text-aku-blue/70" />
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <span 
                    key={lang.code}
                    className={cn(
                      "cursor-pointer hover:text-aku-yellow transition-colors text-xs",
                      currentLanguage === lang.code ? "text-aku-yellow font-medium" : ""
                    )}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

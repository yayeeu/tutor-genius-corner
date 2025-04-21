import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-4">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          className="h-full py-6"
          onClick={() => changeLanguage(lang.code)}
        >
          <div className="flex items-center justify-between w-full">
            <span>{lang.name}</span>
            {currentLanguage === lang.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;

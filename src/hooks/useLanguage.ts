
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Optionally save the language preference
    localStorage.setItem('preferredLanguage', lng);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'am', name: 'አማርኛ' },
      { code: 'om', name: 'Afaan Oromoo' },
      { code: 'ti', name: 'ትግርኛ' }
    ]
  };
};

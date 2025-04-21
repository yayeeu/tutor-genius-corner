import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  // For now, we'll keep the languages array but only use English
  return {
    currentLanguage: i18n.language,
    changeLanguage,
    languages: [
      { code: 'en', name: 'English' }
      // Other languages commented out but kept for future use
      // { code: 'am', name: 'አማርኛ' },
      // { code: 'om', name: 'Afaan Oromoo' },
      // { code: 'ti', name: 'ትግርኛ' }
    ]
  };
};

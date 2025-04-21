
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import amTranslations from './locales/am.json';
import omTranslations from './locales/om.json';
import tiTranslations from './locales/ti.json';

const savedLanguage = localStorage.getItem('preferredLanguage');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      am: {
        translation: amTranslations
      },
      om: {
        translation: omTranslations
      },
      ti: {
        translation: tiTranslations
      }
    },
    lng: savedLanguage || 'en', // Force English if no language is saved
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false
    }
  });

// Set initial language preference if not already set
if (!savedLanguage) {
  localStorage.setItem('preferredLanguage', 'en');
}

export default i18n;

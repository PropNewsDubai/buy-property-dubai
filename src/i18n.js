import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationFA from './locales/fa/translation.json';
import translationTR from './locales/tr/translation.json';
import translationRU from './locales/ru/translation.json';
import translationZH from './locales/zh/translation.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  fa: { translation: translationFA },
  tr: { translation: translationTR },
  ru: { translation: translationRU },
  zh: { translation: translationZH },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // Ensure this line is present
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: true, // Enable debug mode to catch issues
  });

export default i18n;
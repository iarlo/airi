import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from '../../public/locales/en/translation.json';
import translationPT from '../../public/locales/pt/translation.json';

export const resources = {
  en: {
    translation: translationEN,
  },
  'pt-BR': {
    translation: translationPT,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: true,
    },
  });

export default i18n;

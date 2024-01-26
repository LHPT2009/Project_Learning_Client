import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationsEN from './country/english/translation'; // Đường dẫn tới file translations.js
import translationsVN from './country/vietnam/translation'; // Đường dẫn tới file translations.js

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      vn: { translation: translationsVN },
      en: { translation: translationsEN },
    },
  });

export default i18n;

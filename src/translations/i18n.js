import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationsEN from './country/english/translation';
import translationsVN from './country/vietnam/translation';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'vn',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    vn: { translation: translationsVN },
    en: { translation: translationsEN },
  },
});

export default i18n;

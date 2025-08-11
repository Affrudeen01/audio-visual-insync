import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ar from './locales/ar.json';
import ja from './locales/ja.json';
import ta from './locales/ta.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  ar: { translation: ar },
  ja: { translation: ja },
  ta: { translation: ta },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;
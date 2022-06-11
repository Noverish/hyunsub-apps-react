import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en';
import ko from './ko';

const lang = new URLSearchParams(window.location.search).get('lang') || 'ko';

i18n
  .use(initReactI18next)
  .init({
    resources: { en, ko },
    lng: lang,
    fallbackLng: lang,
    interpolation: {
      escapeValue: false
    }
  });

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en';
import ko from './ko';
import TimeAgo from 'javascript-time-ago';
import timeAgoEn from 'javascript-time-ago/locale/en';
import timeAgoKo from 'javascript-time-ago/locale/ko';

const lang = new URLSearchParams(window.location.search).get('lang') || 'ko';

TimeAgo.addLocale(timeAgoEn);
TimeAgo.addLocale(timeAgoKo);
TimeAgo.setDefaultLocale(lang);

export const timeAgo = new TimeAgo(lang);

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

export default i18n.t;

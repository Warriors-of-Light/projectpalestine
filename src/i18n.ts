"use client"

import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import TRANSLATIONS_AR from './locales/ar/common.json';
import TRANSLATIONS_EN from './locales/en/common.json';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  // .use(LanguageDetector)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      ar: {
        translation: TRANSLATIONS_AR,
      },
      en: {
        translation: TRANSLATIONS_EN,
      }
    },
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      bindI18n: 'loaded languageChanged',
      bindI18nStore: 'added',
      useSuspense: true,
    },
    debug:true
  });

export default i18n;

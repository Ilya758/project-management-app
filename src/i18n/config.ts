import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ns1En from './en/ns1.json';
import ns1Ru from './ru/ns1.json';

export const defaultNS = 'ns1';
export const resources = {
  en: {
    ns1: ns1En,
  },
  ru: {
    ns1: ns1Ru,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    ns: ['ns1'],
    defaultNS,
    resources,
  })
  .then(() => {})
  .catch(() => {});

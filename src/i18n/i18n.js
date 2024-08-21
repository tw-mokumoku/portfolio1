import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import JPi18n from './jp.js';
import ENi18n from './en.js';
import KOi18n from './ko.js';
import CNi18n from './cn.js';
import ESi18n from './es.js';
import FRi18n from './fr.js';

const STORAGE_KEY = 'i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        debug: true,
        detection: {
            lookupCookie: STORAGE_KEY,
            lookupLocalStorage: STORAGE_KEY,
            lookupSessionStorage: STORAGE_KEY,
        },
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            ja: JPi18n,
            en: ENi18n,
            ko: KOi18n,
            cn: CNi18n,
            es: ESi18n,
            fr: FRi18n,
        },
        //lng: "ja", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
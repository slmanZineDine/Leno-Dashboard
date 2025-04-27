import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// import { Environments } from "@data/enums";

i18n
  .use(HttpBackend) // Load translations from backend (e.g., JSON files)
  .use(LanguageDetector) // Detect user language automatically
  .use(initReactI18next) // Integrate with React
  .init({
    fallbackLng: "en",
    // debug: import.meta.env.MODE === Environments.DEV,
    interpolation: {
      escapeValue: false,
    },
    ns: ["translation", "errors"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;

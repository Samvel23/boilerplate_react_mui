import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Login: "Login",
      Welcome: "Welcome back",
      toContinue: "Sign in to continue.",
    },
  },
  fr: {
    translation: {
      Login: "se connecter",
      Welcome: "Content de te revoir",
      toContinue: "Connectez-vous pour continuer.",
    },
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;

import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import type { TLanguage } from "./types";

import { de } from "./locales/de";

import { en } from "./locales/en";

import { fr } from "./locales/fr";

const LANGUAGE_STORAGE_KEY = "inventory-language";

const getStoredLanguage = (): TLanguage => {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (
    storedLanguage === "en" ||
    storedLanguage === "fr" ||
    storedLanguage === "de"
  ) {
    return storedLanguage;
  }

  return "en";
};

export const resources = {
  en: {
    common: en.common,
  },

  fr: {
    common: fr.common,
  },

  de: {
    common: de.common,
  },
};

const updateHtmlLanguage = (language: TLanguage) => {
  document.documentElement.lang = language;
};

const initialLanguage = getStoredLanguage();

void i18n.use(initReactI18next).init({
  resources,

  lng: initialLanguage,

  fallbackLng: "en",

  defaultNS: "common",

  interpolation: {
    escapeValue: false,
  },

  pluralSeparator: "_",
});

updateHtmlLanguage(initialLanguage);

export const changeLanguage = async (language: TLanguage) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

  await i18n.changeLanguage(language);

  updateHtmlLanguage(language);
};

export const getCurrentLanguage = (): TLanguage => {
  const language = i18n.language;

  if (language === "fr" || language === "de") {
    return language;
  }

  return "en";
};

export { i18n };

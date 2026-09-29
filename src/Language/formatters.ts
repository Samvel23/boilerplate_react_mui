import type { TLanguage } from "./types";

const localeMap: Record<TLanguage, string> = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
};

export const formatCurrency = (value: number, language: TLanguage): string => {
  return new Intl.NumberFormat(localeMap[language], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (
  value: Date | string | number,
  language: TLanguage,
): string => {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(localeMap[language], {
    dateStyle: "medium",
  }).format(date);
};

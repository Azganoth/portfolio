import en from "$lib/features/i18n/locales/en.json" with { type: "json" };
import pt from "$lib/features/i18n/locales/pt.json" with { type: "json" };
import { DEFAULT_LOCALE } from "$lib/shared/constants";
import { derived, get, writable } from "svelte/store";

export type Locale = "pt" | "en";
export type LocaleStructure = typeof pt;
const locales: Record<Locale, LocaleStructure> = { pt, en };

export type TranslationKey = keyof LocaleStructure;

export const locale = writable<Locale>(DEFAULT_LOCALE);

export const getTranslation = (key: TranslationKey) =>
  locales[get(locale)][key];

export const t = derived(
  locale,
  (loc) => (key: TranslationKey, values?: Record<string, string>) => {
    let text = locales[loc]?.[key];
    if (!text) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        text = text.replaceAll(`{${key}}`, value);
      });
    }

    return text;
  },
);

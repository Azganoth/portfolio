import en from "$lib/assets/locales/en.json" with { type: "json" };
import pt from "$lib/assets/locales/pt.json" with { type: "json" };
import { DEFAULT_LOCALE } from "$lib/constants";
import { derived, get, writable } from "svelte/store";

const locales = { en, pt };

export type Locale = keyof typeof locales;
export type TranslationKey = keyof typeof en;

export const locale = writable<Locale>(DEFAULT_LOCALE);

export const getTranslation = (key: TranslationKey) =>
  locales[get(locale)][key];

export const t = derived(
  locale,
  (loc) => (key: TranslationKey, values?: Record<string, string>) => {
    let text = locales[loc][key];
    if (values) {
      Object.entries(values).forEach(([key, value]) => {
        text = text.replaceAll(`{${key}}`, value);
      });
    }

    return text;
  },
);

import { DEFAULT_LOCALE } from "$lib/shared/constants";
import en from "./locales/en.json" with { type: "json" };
import pt from "./locales/pt.json" with { type: "json" };

export type Locale = "pt" | "en";
export type LocaleStructure = typeof pt;
export type TranslationKey = keyof LocaleStructure;

const locales: Record<Locale, LocaleStructure> = { pt, en };

class TranslationStore {
  locale = $state<Locale>(DEFAULT_LOCALE);

  t = (key: TranslationKey, values?: Record<string, string>) => {
    let text = locales[this.locale]?.[key];
    if (!text) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }

    if (values) {
      Object.entries(values).forEach(([k, v]) => {
        text = text.replaceAll(`{${k}}`, v);
      });
    }

    return text;
  };
}

export const translationStore = new TranslationStore();

export const t = (key: TranslationKey, values?: Record<string, string>) =>
  translationStore.t(key, values);

export const getTranslation = (key: TranslationKey) =>
  locales[translationStore.locale][key];

import { page } from "$app/state";
import type { Locale } from "$lib/features/i18n/translation.svelte";
import { DEFAULT_LOCALE } from "$lib/shared/constants";
import { localizePathname, stripLocaleFromPathname } from "./path";

const currentLocale = () => (page.params.lang as Locale) || DEFAULT_LOCALE;

export const getCurrentLocalizedPath = (pathname: string) =>
  localizePathname(pathname, currentLocale());

export const getCurrentUnlocalizedPath = (pathname: string) =>
  stripLocaleFromPathname(pathname, currentLocale());

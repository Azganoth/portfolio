import { page } from "$app/state";
import { DEFAULT_LOCALE, isSupportedLocale } from "$lib/shared/constants";
import { localizePathname, stripSupportedLocaleFromPathname } from "./path";

const currentLocale = () =>
  isSupportedLocale(page.params.lang) ? page.params.lang : DEFAULT_LOCALE;

export const getCurrentLocalizedPath = (pathname: string) =>
  localizePathname(pathname, currentLocale());

export const getCurrentUnlocalizedPath = stripSupportedLocaleFromPathname;

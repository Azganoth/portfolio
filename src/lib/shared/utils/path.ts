import {
  DEFAULT_LOCALE,
  SITE_URL,
  SUPPORTED_LOCALES,
  type Locale,
} from "../constants";

export const HREFLANG_BY_LOCALE: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export const OG_LOCALE_BY_LOCALE: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
};

export const normalizePathname = (pathname: string) => {
  if (pathname === "/") return pathname;
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
};

const localePrefixPattern = new RegExp(
  `^/(${SUPPORTED_LOCALES.join("|")})(?=/|$)`,
);

export const stripSupportedLocaleFromPathname = (pathname: string) => {
  const normalized = normalizePathname(pathname);
  const stripped = normalized.replace(localePrefixPattern, "");
  return stripped ? normalizePathname(stripped) : "/";
};

export const localizePathname = (pathname: string, locale: Locale) => {
  const normalized = stripSupportedLocaleFromPathname(pathname);

  if (locale === DEFAULT_LOCALE) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};

export const localizeUrl = (
  pathname: string,
  locale: Locale,
  base = SITE_URL,
) => new URL(localizePathname(pathname, locale), base).toString();

export const absoluteUrl = (pathname: string, base = SITE_URL) =>
  new URL(pathname, base).toString();

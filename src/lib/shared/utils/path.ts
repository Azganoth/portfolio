import type { Locale } from "$lib/features/i18n/translation.svelte";
import { DEFAULT_LOCALE, SITE_URL } from "$lib/shared/constants";

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

export const stripLocaleFromPathname = (pathname: string, locale: Locale) => {
  if (pathname === "/") return pathname;
  const normalized = normalizePathname(pathname);
  return normalized.replace(new RegExp(`^/${locale}(/|$)`), "/");
};

export const localizePathname = (pathname: string, locale: Locale) => {
  const normalized = normalizePathname(pathname);

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

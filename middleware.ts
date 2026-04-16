import { next } from "@vercel/functions";
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  type Locale,
} from "./src/lib/shared/constants";
import {
  localizePathname,
  stripSupportedLocaleFromPathname,
} from "./src/lib/shared/utils/path";

const LANG_COOKIE = "lang";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const PUBLIC_FILE = /\/[^/]+\.[^/]+$/;
const EXCLUDED_PATH_PREFIXES = ["/api/", "/_app/", "/.well-known/"];

const isPageRequest = (pathname: string) =>
  !PUBLIC_FILE.test(pathname) &&
  !EXCLUDED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const parseCookies = (cookieHeader: string | null) => {
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [key, ...valueParts] = cookie.trim().split("=");
      if (!key) return;

      try {
        cookies[key] = decodeURIComponent(valueParts.join("="));
      } catch {
        cookies[key] = valueParts.join("=");
      }
    });
  }

  return cookies;
};

const serializeLangCookie = (locale: Locale) =>
  `${LANG_COOKIE}=${locale}; Path=/; Max-Age=${LANG_COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax`;

const getPathLocale = (pathname: string) => {
  const locale = pathname.split("/").at(1);
  return isSupportedLocale(locale) ? locale : undefined;
};

const getBrowserLocale = (acceptLanguage: string | null) =>
  acceptLanguage
    ?.split(",")
    .map((part, index) => {
      const [languageRange, ...params] = part.trim().split(";");
      const qValue = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="))
        ?.slice(2);
      const quality = qValue ? Number(qValue) : 1;

      return {
        index,
        locale: languageRange?.split("-").at(0)?.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .find(({ locale, quality }) => quality > 0 && isSupportedLocale(locale))
    ?.locale as Locale | undefined;

const redirect = (url: URL, locale?: Locale) =>
  new Response(null, {
    status: 307,
    headers: {
      Location: url.toString(),
      ...(locale ? { "Set-Cookie": serializeLangCookie(locale) } : {}),
    },
  });

const nextWithLocaleCookie = (locale: Locale) =>
  next({
    headers: {
      "Set-Cookie": serializeLangCookie(locale),
    },
  });

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (!isPageRequest(url.pathname)) {
    return next();
  }

  const cookies = parseCookies(request.headers.get("cookie"));
  const langCookie = cookies[LANG_COOKIE];
  const cookieLocale = isSupportedLocale(langCookie) ? langCookie : undefined;
  const pathLocale = getPathLocale(url.pathname);

  if (pathLocale === DEFAULT_LOCALE) {
    url.pathname = stripSupportedLocaleFromPathname(url.pathname);
    return redirect(url, DEFAULT_LOCALE);
  }

  if (pathLocale) {
    return cookieLocale === pathLocale
      ? next()
      : nextWithLocaleCookie(pathLocale);
  }

  const lang =
    cookieLocale ?? getBrowserLocale(request.headers.get("accept-language"));

  if (!lang || lang === DEFAULT_LOCALE) {
    return next();
  }

  url.pathname = localizePathname(url.pathname, lang);
  return redirect(url, lang);
}

export const config = {
  matcher: "/:path*",
};

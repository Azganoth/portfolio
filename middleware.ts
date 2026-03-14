import { next, rewrite } from "@vercel/functions";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./src/lib/shared/constants";

const parseCookies = (cookieHeader: string | null) => {
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
    });
  }

  return cookies;
};

export function middleware(request: Request) {
  let lang = DEFAULT_LOCALE;

  const cookies = parseCookies(request.headers.get("cookie"));
  const langCookie = cookies["lang"];
  const langHeader = request.headers.get("accept-language");

  // Prioritize cookie
  if (langCookie && SUPPORTED_LOCALES.includes(langCookie)) {
    lang = langCookie;
  } // Check browser preference
  else if (langHeader) {
    const langBrowser = langHeader.split(",")[0].split("-")[0];
    if (SUPPORTED_LOCALES.includes(langBrowser)) {
      lang = langBrowser;
    }
  }

  // If the detected locale is the default, no redirect is needed
  if (lang === DEFAULT_LOCALE) {
    return next();
  }

  // Otherwise, redirect to the prefixed path
  const localizedUrl = new URL(`/${lang}`, request.url);
  localizedUrl.search = new URL(request.url).search;
  return rewrite(localizedUrl);
}

export const config = {
  // runtime: "nodejs",
  matcher: "/",
};

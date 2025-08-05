import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "$lib/constants";
import { type Locale } from "$lib/i18n";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let lang: Locale = DEFAULT_LOCALE;

  const pathname = event.url.pathname;
  const pathnameLang = pathname.split("/").at(1);
  if (pathnameLang && SUPPORTED_LOCALES.includes(pathnameLang)) {
    lang = pathnameLang as Locale;
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", lang),
  });
};

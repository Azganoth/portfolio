import { DEFAULT_LOCALE, isSupportedLocale } from "$lib/shared/constants";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  let lang = DEFAULT_LOCALE;

  const pathname = event.url.pathname;
  const pathnameLang = pathname.split("/").at(1);
  if (isSupportedLocale(pathnameLang)) {
    lang = pathnameLang;
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", lang),
  });
};

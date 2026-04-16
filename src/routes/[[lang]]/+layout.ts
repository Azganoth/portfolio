import { DEFAULT_LOCALE, isSupportedLocale } from "$lib/shared/constants";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load: LayoutLoad = async ({ params }) => {
  const lang = params.lang || DEFAULT_LOCALE;

  if (!isSupportedLocale(lang)) {
    throw error(404, "Not Found");
  }

  return {
    lang,
  };
};

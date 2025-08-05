import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "$lib/constants";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load: LayoutLoad = async ({ params }) => {
  const lang = params.lang || DEFAULT_LOCALE;

  if (!SUPPORTED_LOCALES.includes(lang)) {
    throw error(404, "Not Found");
  }

  return {
    lang,
  };
};

import { dev } from "$app/environment";
import { getProject } from "$lib/features/projects/loader.server";
import { DEFAULT_LOCALE, isSupportedLocale } from "$lib/shared/constants";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
  if (!dev) error(404);

  const locale = url.searchParams.get("locale") ?? DEFAULT_LOCALE;
  if (!isSupportedLocale(locale)) {
    error(400, `Unsupported locale "${locale}"`);
  }

  const slug = url.searchParams.get("slug");
  if (!slug) return { locale, project: null };

  const project = await getProject(locale, slug);
  if (!project) error(404, `No project "${slug}" for locale "${locale}"`);

  return { locale, project };
};

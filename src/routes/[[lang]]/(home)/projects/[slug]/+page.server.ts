import { getProject } from "$lib/features/projects/loader.server";
import { DEFAULT_LOCALE, isSupportedLocale } from "$lib/shared/constants";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  const lang = isSupportedLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const project = await getProject(lang, slug);

  if (!project) {
    error(404, "Project not found");
  }

  return {
    project,
  };
};

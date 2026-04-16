import { DEFAULT_LOCALE, isSupportedLocale } from "$lib/shared/constants";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { projects } = await parent();
  const { slug } = params;
  const lang = isSupportedLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const project = projects[lang]?.find((p) => p.slug === slug);

  if (!project) {
    error(404, "Project not found");
  }

  return {
    project,
  };
};

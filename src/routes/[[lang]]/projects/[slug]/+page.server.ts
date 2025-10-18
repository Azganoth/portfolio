import { getProject } from "$lib/features/projects/loader/server";
import { DEFAULT_LOCALE } from "$lib/shared/constants";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const { lang = DEFAULT_LOCALE, slug } = params;
  const project = await getProject(lang, slug);

  if (!project) {
    error(404, "Project not found");
  }

  return {
    project,
  };
};

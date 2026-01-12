import type { Locale } from "$lib/features/i18n/translation.svelte";
import { DEFAULT_LOCALE } from "$lib/shared/constants";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { projects } = await parent();
  const { lang = DEFAULT_LOCALE, slug } = params;
  const project = projects[lang as Locale]?.find((p) => p.slug === slug);

  if (!project) {
    error(404, "Project not found");
  }

  return {
    project,
  };
};

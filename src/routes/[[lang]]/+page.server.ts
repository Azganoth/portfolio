import type { Locale } from "$lib/features/i18n/translation.svelte";
import { getAllProjects } from "$lib/features/projects/loader/server";
import { type Project } from "$lib/features/projects/schema";
import { SUPPORTED_LOCALES } from "$lib/shared/constants";
import type { PageServerLoad } from "./$types";

const loadAllProjects = async () =>
  Object.fromEntries(
    await Promise.all(
      SUPPORTED_LOCALES.map(
        async (locale) =>
          [locale, await getAllProjects(locale)] as [Locale, Project[]],
      ),
    ),
  );

export const load: PageServerLoad = async () => {
  // Load projects for all supported locales to enable instant, client-side
  // language switching without triggering a new server request or navigation.
  return {
    props: {
      projects: await loadAllProjects(),
    },
  };
};

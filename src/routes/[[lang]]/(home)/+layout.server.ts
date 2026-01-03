import { getProjectsMap } from "$lib/features/projects/loader/server";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
  // Load projects for all supported locales to enable instant, client-side
  // language switching without triggering a new server request or navigation.
  return {
    projects: await getProjectsMap(),
  };
};

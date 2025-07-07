import { getAllProjects } from "$lib/server/projects";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    props: { projects: await getAllProjects() },
  };
};

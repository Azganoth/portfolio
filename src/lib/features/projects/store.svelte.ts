import type { Project } from "$lib/features/projects/schema";

class ProjectStore {
  selected = $state<Project | undefined>();
}

export const projectStore = new ProjectStore();

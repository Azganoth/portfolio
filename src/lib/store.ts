import { writable } from "svelte/store";

export const activeProject = writable<ProjectData | undefined>();
export const projectFilters = writable<string[]>([]);

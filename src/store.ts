import type { Project } from "@utils/projects";
import { writable } from "svelte/store";

export const activeProject = writable<Project | undefined>();
export const projectFilters = writable<string[]>([]);

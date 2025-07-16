import type { Project } from "$lib/projects.schema";
import { writable } from "svelte/store";

export const activeProject = writable<Project | undefined>();

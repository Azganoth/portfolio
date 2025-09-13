import type { Project } from "$lib/features/projects/schema";
import { writable } from "svelte/store";

export const selectedProject = writable<Project | undefined>();

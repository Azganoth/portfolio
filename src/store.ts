import type { Project } from "@utils/projects";
import { writable } from "svelte/store";

export const activeProject = writable<Project | undefined>();

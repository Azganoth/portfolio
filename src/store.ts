import type { Project } from "@utils/projects";
import { atom } from "nanostores";

export const activeProject = atom<Project | undefined>();

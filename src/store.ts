import type { ProjectWithId } from "@utils/projects";
import { atom } from "nanostores";

export const activeProject = atom<ProjectWithId | undefined>();

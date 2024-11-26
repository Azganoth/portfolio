import { atom } from "nanostores";
import type { ProjectWithId } from "./utils/projects";

export const $currentProject = atom<ProjectWithId | undefined>();

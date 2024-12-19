import type { ProjectWithId } from "@utils/projects";
import { atom } from "nanostores";

export const $currentProject = atom<ProjectWithId | undefined>();

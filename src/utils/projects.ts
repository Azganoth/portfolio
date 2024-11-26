import { projects } from "../assets/data.json";
import azganoth_0 from "../assets/images/azganoth_0.webp";
import azganoth_1 from "../assets/images/azganoth_1.webp";
import azganoth_2 from "../assets/images/azganoth_2.webp";
import azganoth_3 from "../assets/images/azganoth_3.webp";
import bmicalc_0 from "../assets/images/bmicalc_0.webp";
import bmicalc_1 from "../assets/images/bmicalc_1.webp";
import bmicalc_2 from "../assets/images/bmicalc_2.webp";
import bmicalc_3 from "../assets/images/bmicalc_3.webp";
import devfinder_0 from "../assets/images/devfinder_0.webp";
import devfinder_1 from "../assets/images/devfinder_1.webp";
import devfinder_2 from "../assets/images/devfinder_2.webp";
import devfinder_3 from "../assets/images/devfinder_3.webp";
import equalizer_0 from "../assets/images/equalizer_0.webp";
import equalizer_1 from "../assets/images/equalizer_1.webp";
import equalizer_2 from "../assets/images/equalizer_2.webp";
import equalizer_3 from "../assets/images/equalizer_3.webp";
import galleria_0 from "../assets/images/galleria_0.webp";
import galleria_1 from "../assets/images/galleria_1.webp";
import galleria_2 from "../assets/images/galleria_2.webp";
import galleria_3 from "../assets/images/galleria_3.webp";
import skilled_0 from "../assets/images/skilled_0.webp";
import skilled_1 from "../assets/images/skilled_1.webp";
import skilled_2 from "../assets/images/skilled_2.webp";
import skilled_3 from "../assets/images/skilled_3.webp";
import suite_0 from "../assets/images/suite_0.webp";
import suite_1 from "../assets/images/suite_1.webp";
import suite_2 from "../assets/images/suite_2.webp";
import suite_3 from "../assets/images/suite_3.webp";
import tictactoe_0 from "../assets/images/tictactoe_0.webp";
import tictactoe_1 from "../assets/images/tictactoe_1.webp";
import tictactoe_2 from "../assets/images/tictactoe_2.webp";
import tictactoe_3 from "../assets/images/tictactoe_3.webp";
import workit_0 from "../assets/images/workit_0.webp";
import workit_1 from "../assets/images/workit_1.webp";
import workit_2 from "../assets/images/workit_2.webp";
import workit_3 from "../assets/images/workit_3.webp";
import type { Project } from "../types";

const projectsData = projects as Record<string, Project>;
const projectsSlides: Record<
  string,
  [
    thumb: ImageMetadata,
    desktop: ImageMetadata,
    tablet: ImageMetadata,
    mobile: ImageMetadata,
  ]
> = {
  azganoth: [azganoth_0, azganoth_1, azganoth_2, azganoth_3],
  galleria: [galleria_0, galleria_1, galleria_2, galleria_3],
  devfinder: [devfinder_0, devfinder_1, devfinder_2, devfinder_3],
  tictactoe: [tictactoe_0, tictactoe_1, tictactoe_2, tictactoe_3],
  bmicalc: [bmicalc_0, bmicalc_1, bmicalc_2, bmicalc_3],
  skilled: [skilled_0, skilled_1, skilled_2, skilled_3],
  equalizer: [equalizer_0, equalizer_1, equalizer_2, equalizer_3],
  workit: [workit_0, workit_1, workit_2, workit_3],
  suite: [suite_0, suite_1, suite_2, suite_3],
};
const projectsWithIds = Object.entries(projectsData).map(
  ([id, data]) =>
    ({
      id,
      ...data,
    }) as ProjectWithId,
);

export type ProjectId = keyof typeof projects;
export type ProjectWithId = { id: ProjectId } & Project;
export type ProjectImage = ImageMetadata;

export function getProject(id: ProjectId | string): ProjectWithId | undefined {
  return projectsWithIds.find((proj) => proj.id === id);
}

export function getAllProjects(): ProjectWithId[] {
  return projectsWithIds;
}

export function getProjectSlides(id: ProjectId | string): ImageMetadata[] {
  return projectsSlides[id] ?? [];
}

import { PREVIEW_SIZE, PROJECTS_ORDER } from "$lib/shared/constants";
import { describe, expect, it } from "vitest";
import { getProjects } from "./server";

describe("project loader", () => {
  it("loads localized projects in display order", async () => {
    const projects = await getProjects();

    expect(Object.keys(projects).sort()).toEqual(["en", "pt"]);
    expect(projects.pt.map((project) => project.slug)).toEqual(PROJECTS_ORDER);
    expect(projects.en.map((project) => project.slug)).toEqual(PROJECTS_ORDER);
  });

  it("parses markdown descriptions and attaches sorted previews", async () => {
    const projects = await getProjects();
    const nexus = projects.pt.find((project) => project.slug === "nexus");

    expect(nexus).toBeDefined();
    expect(nexus?.description).toContain("<p>");
    expect(nexus?.previews.map((preview) => preview.url)).toEqual([
      "/images/preview/nexus_0.webp",
      "/images/preview/nexus_1.webp",
      "/images/preview/nexus_2.webp",
      "/images/preview/nexus_3.webp",
    ]);
    expect(nexus?.previews[0]).toMatchObject(PREVIEW_SIZE);
  });
});

import { PREVIEW_SIZE, PROJECTS_ORDER } from "$lib/shared/constants";
import { describe, expect, it } from "vitest";
import { getProject, getProjects } from "./server";

const NEXUS_PREVIEWS = [
  "/images/preview/nexus_0.webp",
  "/images/preview/nexus_1.webp",
  "/images/preview/nexus_2.webp",
  "/images/preview/nexus_3.webp",
];

describe("project loader", () => {
  it("loads localized projects in display order", async () => {
    const projects = await getProjects();

    expect(Object.keys(projects).sort()).toEqual(["en", "pt"]);
    expect(projects.pt.map((project) => project.slug)).toEqual(PROJECTS_ORDER);
    expect(projects.en.map((project) => project.slug)).toEqual(PROJECTS_ORDER);
  });

  it("attaches sorted previews to summaries", async () => {
    const projects = await getProjects();
    const nexus = projects.pt.find((project) => project.slug === "nexus");

    expect(nexus).toBeDefined();
    expect(nexus?.previews.map((preview) => preview.url)).toEqual(
      NEXUS_PREVIEWS,
    );
    expect(nexus?.previews[0]).toMatchObject(PREVIEW_SIZE);
  });

  it("keeps markdown bodies out of the summary list", async () => {
    const projects = await getProjects();

    for (const locale of ["pt", "en"] as const) {
      for (const project of projects[locale]) {
        expect(project).not.toHaveProperty("description");
      }
    }
  });

  it("parses the markdown description for a single project", async () => {
    const nexus = await getProject("pt", "nexus");

    expect(nexus).not.toBeNull();
    expect(nexus?.slug).toBe("nexus");
    expect(nexus?.description).toContain("<p>");
    expect(nexus?.previews.map((preview) => preview.url)).toEqual(
      NEXUS_PREVIEWS,
    );
  });

  it("returns null for an unknown slug", async () => {
    expect(await getProject("pt", "does-not-exist")).toBeNull();
  });
});

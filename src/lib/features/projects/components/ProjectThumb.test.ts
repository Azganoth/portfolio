import type { Project } from "$lib/features/projects/schema";
import { projectStore } from "$lib/features/projects/store.svelte";
import { composeProjectLinkId } from "$lib/features/projects/utils";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectThumb from "./ProjectThumb.svelte";

const pushState = vi.hoisted(() => vi.fn());
const page = vi.hoisted(() => ({
  params: { lang: "pt" },
}));

vi.mock("$app/navigation", () => ({
  pushState,
}));

vi.mock("$app/state", () => ({
  page,
}));

const project: Project = {
  slug: "nexus",
  title: "Nexus",
  category: "Web",
  year: 2026,
  summary: "A project summary.",
  outcome: "A project outcome.",
  tags: ["TypeScript", "Svelte"],
  description: "<p>Description</p>",
  previews: [
    {
      url: "/images/preview/nexus_0.webp",
      width: 720,
      height: 540,
    },
  ],
};

describe("ProjectThumb", () => {
  beforeEach(() => {
    projectStore.selected = undefined;
  });

  it("renders project content with accessible controls", () => {
    render(ProjectThumb, { project });

    expect(screen.getByRole("article")).toHaveAccessibleName(
      "Abrir detalhes do projeto Nexus",
    );
    expect(
      screen.getByRole("link", {
        name: "Abrir detalhes do projeto Nexus",
      }),
    ).toHaveAttribute("href", "/projects/nexus");
    expect(screen.getByAltText("Prévia do projeto Nexus")).toHaveAttribute(
      "src",
      "/images/preview/nexus_0.webp",
    );
    expect(document.getElementById(composeProjectLinkId("nexus"))).toBeTruthy();
  });

  it("selects the project with shallow routing on click", async () => {
    const user = userEvent.setup();
    render(ProjectThumb, { project });

    await user.click(
      screen.getByRole("link", {
        name: "Abrir detalhes do projeto Nexus",
      }),
    );

    expect(projectStore.selected).toEqual(project);
    expect(pushState).toHaveBeenCalledWith("/projects/nexus", {
      selectedProject: expect.objectContaining({
        slug: "nexus",
        title: "Nexus",
      }),
    });
  });
});

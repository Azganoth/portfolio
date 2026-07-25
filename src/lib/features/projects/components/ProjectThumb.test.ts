import type { Project, ProjectSummary } from "$lib/features/projects/schema";
import { projectStore } from "$lib/features/projects/store.svelte";
import { composeProjectLinkId } from "$lib/features/projects/utils";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectThumb from "./ProjectThumb.svelte";

const pushState = vi.hoisted(() => vi.fn());
const preloadData = vi.hoisted(() => vi.fn());
const goto = vi.hoisted(() => vi.fn());
const page = vi.hoisted(() => ({
  params: { lang: "pt" },
}));

vi.mock("$app/navigation", () => ({
  pushState,
  preloadData,
  goto,
}));

vi.mock("$app/state", () => ({
  page,
}));

const project: ProjectSummary = {
  slug: "nexus",
  title: "Nexus",
  category: "Web",
  year: 2026,
  summary: "A project summary.",
  outcome: "A project outcome.",
  tags: ["TypeScript", "Svelte"],
  previews: [
    {
      url: "/images/preview/nexus_0.webp",
      width: 720,
      height: 540,
    },
  ],
};

const fullProject: Project = {
  ...project,
  description: "<p>Description</p>",
};

const openLink = () =>
  screen.getByRole("link", { name: "Abrir detalhes do projeto Nexus" });

describe("ProjectThumb", () => {
  beforeEach(() => {
    projectStore.selected = undefined;
    pushState.mockClear();
    goto.mockClear();
    preloadData.mockReset();
  });

  it("renders project content with accessible controls", () => {
    render(ProjectThumb, { project });

    expect(screen.getByRole("article")).toHaveAccessibleName(
      "Abrir detalhes do projeto Nexus",
    );
    expect(openLink()).toHaveAttribute("href", "/projects/nexus");
    expect(screen.getByAltText("Prévia do projeto Nexus")).toHaveAttribute(
      "src",
      "/images/preview/nexus_0.webp",
    );
    expect(document.getElementById(composeProjectLinkId("nexus"))).toBeTruthy();
  });

  it("pushes the loaded project, including its body, on click", async () => {
    preloadData.mockResolvedValue({
      type: "loaded",
      status: 200,
      data: { project: fullProject },
    });

    const user = userEvent.setup();
    render(ProjectThumb, { project });

    await user.click(openLink());

    expect(preloadData).toHaveBeenCalledWith("/projects/nexus");
    expect(pushState).toHaveBeenCalledWith("/projects/nexus", {
      selectedProject: fullProject,
    });
    expect(goto).not.toHaveBeenCalled();
  });

  it("falls back to a full navigation when preloading fails", async () => {
    preloadData.mockResolvedValue({ type: "redirect", location: "/" });

    const user = userEvent.setup();
    render(ProjectThumb, { project });

    await user.click(openLink());

    expect(pushState).not.toHaveBeenCalled();
    expect(goto).toHaveBeenCalledWith("/projects/nexus");
  });
});

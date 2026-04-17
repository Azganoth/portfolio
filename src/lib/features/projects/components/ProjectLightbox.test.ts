import { projectStore } from "$lib/features/projects/store.svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import ProjectLightbox from "./ProjectLightbox.svelte";

const previews = [
  {
    url: "/images/preview/nexus_0.webp",
    width: 720,
    height: 540,
  },
  {
    url: "/images/preview/nexus_1.webp",
    width: 720,
    height: 540,
  },
];

describe("ProjectLightbox", () => {
  beforeEach(() => {
    projectStore.lightbox = undefined;
  });

  it("renders slides and updates the selected image", async () => {
    const user = userEvent.setup();
    projectStore.openLightbox(previews, "Nexus");
    render(ProjectLightbox);

    expect(
      screen.getByRole("dialog", { name: "Galeria de imagens" }),
    ).toBeTruthy();
    expect(
      screen.getByAltText("Captura de tela 1 de 2 do projeto Nexus"),
    ).toHaveAttribute("src", "/images/preview/nexus_0.webp");

    await user.click(screen.getByRole("button", { name: "Próxima imagem" }));
    expect(projectStore.lightbox?.index).toBe(1);

    await user.keyboard("{ArrowLeft}");
    expect(projectStore.lightbox?.index).toBe(0);
  });

  it("closes the lightbox", async () => {
    const user = userEvent.setup();
    projectStore.openLightbox(previews, "Nexus");
    render(ProjectLightbox);

    await user.click(
      screen.getByRole("button", { name: "Fechar galeria de imagens" }),
    );

    expect(projectStore.lightbox).toBeUndefined();
  });
});

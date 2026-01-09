import type { Project, ProjectPreview } from "$lib/features/projects/schema";

export interface PreviewsLightbox {
  previews: ProjectPreview[];
  index: number;
}

class ProjectStore {
  selected = $state<Project | undefined>();

  lightbox = $state<PreviewsLightbox>();

  openLightbox = (previews: ProjectPreview[]) => {
    this.lightbox = { previews, index: 0 };
  };

  closeLightbox = () => {
    this.lightbox = undefined;
  };

  toImage = (index: number) => {
    if (this.lightbox) {
      this.lightbox.index = Math.min(
        Math.max(index, 0),
        this.lightbox.previews.length - 1,
      );
    }
  };

  nextImage = () => {
    if (this.lightbox) {
      this.lightbox.index =
        (this.lightbox.index + 1) % this.lightbox.previews.length;
    }
  };

  prevImage = () => {
    if (this.lightbox) {
      this.lightbox.index =
        (this.lightbox.index - 1 + this.lightbox.previews.length) %
        this.lightbox.previews.length;
    }
  };
}

export const projectStore = new ProjectStore();

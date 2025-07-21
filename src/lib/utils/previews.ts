import { PREVIEW_SIZE } from "$lib/constants";

export interface ProjectPreview {
  url: string;
  width: number;
  height: number;
}

export const composePreviews = (slug: string): ProjectPreview[] =>
  Array.from({ length: slug === "simplemotionreact" ? 1 : 4 }, (_, i) => ({
    url: `/images/preview/${slug}_${i}.webp`,
    width: PREVIEW_SIZE.width,
    height: PREVIEW_SIZE.height,
  }));

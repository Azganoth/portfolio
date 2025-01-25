import { PROJECTS_ORDER } from "@app/constants";
import type { TechStack } from "@app/types";
import type { ProjectEntry } from "@lib/contentful";
import { contentfulClient } from "@lib/contentful";
import { inferRemoteSize } from "astro:assets";

export interface Project {
  name: string;
  title: string;
  description: string;
  website: string;
  repository: string;
  technologies: TechStack[];
  previews: { src: string; width: number; height: number }[];
}

export const getAllProjects = async (): Promise<Project[]> => {
  const entries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<ProjectEntry>({
      content_type: "project",
    });

  return (
    await Promise.all(
      entries.items.map(async (entry) => {
        const previewImages = await Promise.all(
          entry.fields.previews
            .filter((asset) => !!asset)
            .map(async (asset) => {
              if (!asset?.fields?.file?.url) {
                throw new Error("Invalid asset");
              }

              const imageUrl = `https:${asset.fields.file.url}`;
              const { details } = asset.fields.file;

              const { width, height } =
                (typeof details === "object" &&
                  "image" in details &&
                  details.image) ||
                (await inferRemoteSize(imageUrl));

              return {
                src: imageUrl,
                width,
                height,
              };
            }),
        );

        return {
          name: entry.fields.name,
          title: entry.fields.title,
          description: entry.fields.description,
          website: entry.fields.website,
          repository: entry.fields.repository,
          technologies: entry.fields.technologies ?? [],
          previews: previewImages,
        };
      }),
    )
  ).sort((a, b) => {
    const indexA = PROJECTS_ORDER.indexOf(a.name);
    const indexB = PROJECTS_ORDER.indexOf(b.name);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

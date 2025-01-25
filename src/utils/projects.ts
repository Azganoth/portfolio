import { PROJECTS_ORDER, TECH_ORDER, type Tech } from "@app/constants";
import type { ProjectEntry } from "@lib/contentful";
import { contentfulClient } from "@lib/contentful";
import { compareOrderBy } from "@utils/sort";
import { inferRemoteSize } from "astro:assets";

export interface Project {
  name: string;
  title: string;
  description: string;
  website: string;
  repository: string;
  technologies: Tech[];
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
          technologies: (entry.fields.technologies ?? []).sort(
            compareOrderBy(TECH_ORDER, (item) => item),
          ),
          previews: previewImages,
        };
      }),
    )
  ).sort(compareOrderBy(PROJECTS_ORDER, (item) => item.name));
};

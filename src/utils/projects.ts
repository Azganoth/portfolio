import { TECH_ORDER, type Tech } from "@app/constants";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { PortfolioProjectsEntry } from "@lib/contentful";
import { contentfulClient } from "@lib/contentful";
import { compareOrderBy } from "@utils/sort";
import { inferRemoteSize } from "astro:assets";

export interface Project {
  name: string;
  title: string;
  summary: string;
  description: string;
  website: string;
  repository: string;
  technologies: Tech[];
  previews: { src: string; width: number; height: number }[];
}

export const getAllProjects = async (): Promise<Project[]> => {
  const projects =
    await contentfulClient.withoutUnresolvableLinks.getEntry<PortfolioProjectsEntry>(
      "7xLOF4tOhPnyTABeZwdDTR",
    );

  return await Promise.all(
    projects.fields.items
      .filter((entry) => entry !== undefined)
      .map(async (entry) => {
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
          summary: entry.fields.summary,
          description: documentToHtmlString(entry.fields.description),
          website: entry.fields.website,
          repository: entry.fields.repository,
          technologies: (entry.fields.technologies ?? []).sort(
            compareOrderBy(TECH_ORDER, (item) => item),
          ),
          previews: previewImages,
        };
      }),
  );
};

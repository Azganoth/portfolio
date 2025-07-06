import { CONTENTFUL_PROJECTS_ENTRY_ID } from "$env/static/private";
import { TECH_ORDER } from "$lib/constants";
import type { PortfolioProjectsEntry } from "$lib/server/contentful";
import { contentfulClient } from "$lib/server/contentful";
import { compareOrderBy } from "$lib/utils/sort";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const getAllProjects = async (): Promise<ProjectData[]> => {
  const projects =
    await contentfulClient.withoutUnresolvableLinks.getEntry<PortfolioProjectsEntry>(
      CONTENTFUL_PROJECTS_ENTRY_ID,
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

              const { width, height } = (typeof details === "object" &&
                "image" in details &&
                details.image) || { width: 720, height: 540 };

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
        } satisfies ProjectData;
      }),
  );
};

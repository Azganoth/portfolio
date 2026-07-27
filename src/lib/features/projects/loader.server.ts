import type { Locale } from "$lib/features/i18n/translation.svelte";
import {
  type Project,
  type ProjectPreview,
  projectSchema,
  type ProjectSummary,
} from "$lib/features/projects/schema";
import { PROJECTS_ORDER, SUPPORTED_LOCALES } from "$lib/shared/constants";
import { compareOrderBy } from "$lib/shared/utils/sort";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";

const PROJECTS_DIR = path.join(process.cwd(), "src/lib/features/projects/data");
const PREVIEWS_DIR = path.join(process.cwd(), "static/images/preview");

export const getProjects = async () =>
  Object.fromEntries(
    await Promise.all(
      SUPPORTED_LOCALES.map(
        async (locale) =>
          [locale, await getAllProjects(locale)] as [Locale, ProjectSummary[]],
      ),
    ),
  ) as Record<Locale, ProjectSummary[]>;

const composePreviews = async (
  previewFilenames: string[],
  slug: string,
): Promise<ProjectPreview[]> => {
  const filenames = previewFilenames
    .filter(
      (filename) =>
        filename.startsWith(`${slug}_`) && filename.endsWith(".webp"),
    )
    .sort((a, b) => {
      const indexA = parseInt(a.split("_")[1]);
      const indexB = parseInt(b.split("_")[1]);
      return indexA - indexB;
    });

  return Promise.all(
    filenames.map(async (filename) => {
      const { width, height } = imageSize(
        await fs.readFile(path.join(PREVIEWS_DIR, filename)),
      );

      if (!width || !height) {
        throw new Error(`Could not read dimensions of preview ${filename}`);
      }

      return { url: `/images/preview/${filename}`, width, height };
    }),
  );
};

const readProjectFile = async (locale: string, slug: string) => {
  const fullPath = path.join(PROJECTS_DIR, locale, `${slug}.md`);

  try {
    await fs.access(fullPath, fs.constants.F_OK);
  } catch {
    return null;
  }

  return matter(await fs.readFile(fullPath, "utf8"));
};

const getProjectSummary = async (
  locale: string,
  slug: string,
  previews: ProjectPreview[],
): Promise<ProjectSummary | null> => {
  const file = await readProjectFile(locale, slug);
  if (!file) return null;

  return {
    slug,
    ...(await projectSchema.parseAsync(file.data)),
    previews,
  };
};

export const getProject = async (
  locale: string,
  slug: string,
): Promise<Project | null> => {
  const file = await readProjectFile(locale, slug);
  if (!file) return null;

  const previewFilenames = await fs.readdir(PREVIEWS_DIR);

  return {
    slug,
    ...(await projectSchema.parseAsync(file.data)),
    previews: await composePreviews(previewFilenames, slug),
    description: await marked.parse(file.content),
  };
};

const getAllProjects = async (locale: string): Promise<ProjectSummary[]> => {
  const filenames = await fs.readdir(path.join(PROJECTS_DIR, locale));
  const previewFilenames = await fs.readdir(PREVIEWS_DIR);

  const projects = await Promise.all<ProjectSummary | null>(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const slug = filename.split(".")[0];
        return getProjectSummary(
          locale,
          slug,
          await composePreviews(previewFilenames, slug),
        );
      }),
  );

  const validProjects = projects.filter((p): p is ProjectSummary => p !== null);

  // Sort projects by the display order in the shared constants
  validProjects.sort(compareOrderBy(PROJECTS_ORDER, (p) => p.slug));

  return validProjects;
};

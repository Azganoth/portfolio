import type { Locale } from "$lib/features/i18n/translation.svelte";
import {
  type Project,
  type ProjectPreview,
  projectSchema,
} from "$lib/features/projects/schema";
import {
  PREVIEW_SIZE,
  PROJECTS_ORDER,
  SUPPORTED_LOCALES,
} from "$lib/shared/constants";
import { compareOrderBy } from "$lib/shared/utils/sort";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";

export const getProjects = async () =>
  Object.fromEntries(
    await Promise.all(
      SUPPORTED_LOCALES.map(
        async (locale) =>
          [locale, await getAllProjects(locale)] as [Locale, Project[]],
      ),
    ),
  ) as Record<Locale, Project[]>;

const composePreviews = (
  previewFilenames: string[],
  slug: string,
): ProjectPreview[] =>
  previewFilenames
    .filter(
      (filename) =>
        filename.startsWith(`${slug}_`) && filename.endsWith(".webp"),
    )
    .sort((a, b) => {
      const indexA = parseInt(a.split("_")[1]);
      const indexB = parseInt(b.split("_")[1]);
      return indexA - indexB;
    })
    .map((filename) => ({
      url: `/images/preview/${filename}`,
      width: PREVIEW_SIZE.width,
      height: PREVIEW_SIZE.height,
    }));

const getProject = async (
  locale: string,
  slug: string,
  previews: ProjectPreview[],
): Promise<Project | null> => {
  const projectsDir = path.join(
    process.cwd(),
    "src/lib/features/projects/data",
  );
  const fullPath = path.join(projectsDir, locale, `${slug}.md`);

  try {
    await fs.access(fullPath, fs.constants.F_OK);
  } catch {
    return null;
  }

  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = await projectSchema.parseAsync(data);
  const description = await marked.parse(content);

  return {
    slug,
    ...frontmatter,
    description,
    previews,
  };
};

const getAllProjects = async (locale: string): Promise<Project[]> => {
  const projectsDir = path.join(
    process.cwd(),
    "src/lib/features/projects/data",
  );
  const dirPath = path.join(projectsDir, locale);
  const filenames = await fs.readdir(dirPath);
  const previewFilenames = await fs.readdir(
    path.join(process.cwd(), "static/images/preview"),
  );

  const projects = await Promise.all<Project | null>(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const slug = filename.split(".")[0];
        return getProject(
          locale,
          slug,
          composePreviews(previewFilenames, slug),
        );
      }),
  );

  const validProjects = projects.filter((p): p is Project => p !== null);

  // Sort projects by the 'order' field in the frontmatter
  validProjects.sort(compareOrderBy(PROJECTS_ORDER, (p) => p.slug));

  return validProjects;
};

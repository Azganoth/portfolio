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

export const getProjectsMap = async () =>
  Object.fromEntries(
    await Promise.all(
      SUPPORTED_LOCALES.map(
        async (locale) =>
          [locale, await getAllProjects(locale)] as [Locale, Project[]],
      ),
    ),
  );

const composePreviews = async (slug: string) => {
  const previews: ProjectPreview[] = [];
  const staticPath = path.join(process.cwd(), "static");

  for (let i = 0; ; i++) {
    const imagePath = `/images/preview/${slug}_${i}.webp`;
    const filePath = path.join(staticPath, imagePath);

    try {
      await fs.access(filePath, fs.constants.F_OK);
      previews.push({
        url: imagePath,
        width: PREVIEW_SIZE.width,
        height: PREVIEW_SIZE.height,
      });
    } catch {
      break;
    }
  }

  return previews;
};

export const getProject = async (
  locale: string,
  slug: string,
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
    previews: await composePreviews(slug),
  };
};

export const getAllProjects = async (locale: string): Promise<Project[]> => {
  const projectsDir = path.join(
    process.cwd(),
    "src/lib/features/projects/data",
  );
  const dirPath = path.join(projectsDir, locale);
  const filenames = await fs.readdir(dirPath);

  const projects = await Promise.all<Project | null>(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const slug = filename.split(".")[0];
        return getProject(locale, slug);
      }),
  );

  const validProjects = projects.filter((p): p is Project => p !== null);

  // Sort projects by the 'order' field in the frontmatter
  validProjects.sort(compareOrderBy(PROJECTS_ORDER, (p) => p.slug));

  return validProjects;
};

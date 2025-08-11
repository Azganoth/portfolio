import { PROJECTS_ORDER, SUPPORTED_LOCALES } from "$lib/constants";
import type { Locale } from "$lib/i18n";
import { projectSchema, type Project } from "$lib/projects.schema";
import { composePreviews } from "$lib/utils/previews";
import { compareOrderBy } from "$lib/utils/sort";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";
import type { PageServerLoad } from "./$types";

const processProjects = async (dirPath: string) => {
  const filenames = await fs.readdir(dirPath);

  const projects = await Promise.all<Promise<Project>>(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const slug = filename.split(".")[0];
        const fullPath = path.join(dirPath, filename);
        const fileContents = await fs.readFile(fullPath, "utf8");

        const { data, content } = matter(fileContents);
        const frontmatter = await projectSchema.parseAsync(data);

        const description = await marked.parse(content);

        return {
          slug,
          ...frontmatter,
          description,
          previews: composePreviews(slug),
        };
      }),
  );

  // Sort projects by the 'order' field in the frontmatter
  projects.sort(compareOrderBy(PROJECTS_ORDER, (p) => p.slug));

  return projects;
};

const projectsDir = path.join(process.cwd(), "src/lib/projects");

const getAllProjects = async () =>
  Object.fromEntries(
    await Promise.all(
      SUPPORTED_LOCALES.map(
        async (locale) =>
          [locale, await processProjects(path.join(projectsDir, locale))] as [
            Locale,
            Project[],
          ],
      ),
    ),
  );

export const load: PageServerLoad = async () => {
  return {
    props: { projects: await getAllProjects() },
  };
};

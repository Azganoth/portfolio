import { PROJECTS_ORDER } from "$lib/constants";
import { projectSchema, type Project } from "$lib/projects.schema";
import { composePreviews } from "$lib/utils/previews";
import { compareOrderBy } from "$lib/utils/sort";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";
import type { PageServerLoad } from "./$types";

const projectsDir = path.join(process.cwd(), "src/lib/projects");

async function getAllProjects(): Promise<Project[]> {
  const filenames = await fs.readdir(projectsDir);

  const projects = await Promise.all<Promise<Project>>(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const slug = filename.split(".")[0];
        const fullPath = path.join(projectsDir, filename);
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
}

export const load: PageServerLoad = async () => {
  return {
    props: { projects: await getAllProjects() },
  };
};

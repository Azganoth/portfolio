import { z } from "zod";

export const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  year: z.number(),
  summary: z.string(),
  outcome: z.string(),
  repository: z.url().optional(),
  website: z.url().optional(),
  tags: z.array(z.string()),
});

export type ProjectSummary = z.infer<typeof projectSchema> & {
  slug: string;
  previews: ProjectPreview[];
};

export type Project = ProjectSummary & {
  description: string;
};

export interface ProjectPreview {
  url: string;
  width: number;
  height: number;
}

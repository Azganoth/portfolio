import { z } from "zod";

export const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  year: z.number(),
  summary: z.string(),
  repository: z.url().optional(),
  website: z.url().optional(),
  tags: z.array(z.string()),
});

export type Project = z.infer<typeof projectSchema> & {
  slug: string;
  description: string;
  previews: ProjectPreview[];
};

export interface ProjectPreview {
  url: string;
  width: number;
  height: number;
}

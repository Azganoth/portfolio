import { z } from "zod";
import type { ProjectPreview } from "./utils/previews";

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

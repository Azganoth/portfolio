export type SkillGroupEmphasis = "primary" | "supporting" | "additional";

export interface SkillGroup {
  titleKey:
    | "skills_category_primary"
    | "skills_category_quality"
    | "skills_category_additional";
  emphasis: SkillGroupEmphasis;
  skills: string[];
}

export const SKILL_GROUPS = [
  {
    titleKey: "skills_category_primary",
    emphasis: "primary",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
    ],
  },
  {
    titleKey: "skills_category_quality",
    emphasis: "supporting",
    skills: [
      "Git",
      "Vitest",
      "Playwright",
      "Jest",
      "Testing Library",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    titleKey: "skills_category_additional",
    emphasis: "additional",
    skills: [
      "Python",
      "Svelte",
      "Vue",
      "SASS",
      "Rust",
      "Tauri",
      "MongoDB",
      "GraphQL",
      "WebAssembly",
    ],
  },
] satisfies SkillGroup[];

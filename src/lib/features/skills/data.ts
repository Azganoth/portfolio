export interface SkillGroup {
  titleKey:
    | "skills_category_interfaces"
    | "skills_category_systems"
    | "skills_category_quality";
  descriptionKey:
    | "skills_interfaces_description"
    | "skills_systems_description"
    | "skills_quality_description";
  icon: string;
  skills: string[];
}

export const SKILL_GROUPS = [
  {
    titleKey: "skills_category_interfaces",
    descriptionKey: "skills_interfaces_description",
    icon: "lucide:panels-top-left",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    titleKey: "skills_category_systems",
    descriptionKey: "skills_systems_description",
    icon: "lucide:braces",
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "GraphQL"],
  },
  {
    titleKey: "skills_category_quality",
    descriptionKey: "skills_quality_description",
    icon: "lucide:badge-check",
    skills: [
      "Git",
      "Vitest",
      "Playwright",
      "Docker",
      "GitHub Actions",
      "Rust",
      "Tauri",
    ],
  },
] satisfies SkillGroup[];

export const ADDITIONAL_SKILLS = [
  "Python",
  "Svelte",
  "Vue",
  "SASS",
  "MongoDB",
  "WebAssembly",
  "Jest",
  "Testing Library",
];

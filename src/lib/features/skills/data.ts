import {
  IconBadgeCheck,
  IconBraces,
  IconC,
  IconCircle,
  IconDocker,
  IconExpress,
  IconGit,
  IconGitHubActions,
  IconGraphQL,
  IconJavaScript,
  IconJest,
  IconMongoDB,
  IconMongoose,
  IconNext,
  IconNode,
  IconPanelsTopLeft,
  IconPlaywright,
  IconPostgreSQL,
  IconPrisma,
  IconPython,
  IconReact,
  IconRust,
  IconSass,
  IconStorybook,
  IconSvelte,
  IconTailwind,
  IconTauri,
  IconTestingLibrary,
  IconTypeScript,
  IconVitest,
  IconVSCode,
  IconVue,
  IconWebAssembly,
} from "$lib/shared/icons";
import type { Component } from "svelte";

export interface SkillGroup {
  titleKey:
    | "skills_category_interfaces"
    | "skills_category_systems"
    | "skills_category_quality";
  descriptionKey:
    | "skills_interfaces_description"
    | "skills_systems_description"
    | "skills_quality_description";
  icon: Component;
  skills: string[];
}

export const SKILL_GROUPS = [
  {
    titleKey: "skills_category_interfaces",
    descriptionKey: "skills_interfaces_description",
    icon: IconPanelsTopLeft,
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    titleKey: "skills_category_systems",
    descriptionKey: "skills_systems_description",
    icon: IconBraces,
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "GraphQL"],
  },
  {
    titleKey: "skills_category_quality",
    descriptionKey: "skills_quality_description",
    icon: IconBadgeCheck,
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

export interface TagMeta {
  color: string;
  icon: Component;
}

/** Brand mark and colour for each named skill, with a neutral fallback. */
export const TAG_META: Record<string, TagMeta> = {
  JavaScript: { color: "#F7DF1E", icon: IconJavaScript },
  TypeScript: { color: "#3178C6", icon: IconTypeScript },
  Python: { color: "#3776AB", icon: IconPython },
  React: { color: "#61DAFB", icon: IconReact },
  Svelte: { color: "#FF3E00", icon: IconSvelte },
  "VS Code": { color: "#007ACC", icon: IconVSCode },
  Next: { color: "#FFFFFF", icon: IconNext },
  "Next.js": { color: "#FFFFFF", icon: IconNext },
  SASS: { color: "#CC6699", icon: IconSass },
  TailwindCSS: { color: "#06B6D4", icon: IconTailwind },
  "Tailwind CSS": { color: "#06B6D4", icon: IconTailwind },
  Node: { color: "#5FA04E", icon: IconNode },
  "Node.js": { color: "#5FA04E", icon: IconNode },
  PostgreSQL: { color: "#4169E1", icon: IconPostgreSQL },
  MongoDB: { color: "#47A248", icon: IconMongoDB },
  Prisma: { color: "#D2C8B7", icon: IconPrisma },
  Mongoose: { color: "#880000", icon: IconMongoose },
  GraphQL: { color: "#E10098", icon: IconGraphQL },
  Jest: { color: "#C21325", icon: IconJest },
  Vitest: { color: "#6E9F18", icon: IconVitest },
  Playwright: { color: "#2EAD33", icon: IconPlaywright },
  "Testing Library": { color: "#E33332", icon: IconTestingLibrary },
  Storybook: { color: "#FF4785", icon: IconStorybook },
  Git: { color: "#F05032", icon: IconGit },
  "GitHub Actions": { color: "#2088FF", icon: IconGitHubActions },
  Docker: { color: "#2496ED", icon: IconDocker },
  C: { color: "#A8B9CC", icon: IconC },
  Rust: { color: "#FFFFFF", icon: IconRust },
  Tauri: { color: "#24C8D8", icon: IconTauri },
  WebAssembly: { color: "#654FF0", icon: IconWebAssembly },
  Vue: { color: "#4FC08D", icon: IconVue },
  Express: { color: "#FFFFFF", icon: IconExpress },
  fallback: { color: "#FFFFFF", icon: IconCircle },
};

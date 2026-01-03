export const SKILLS_BY_CATEGORY = {
  skills_category_languages: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Python",
  ],
  skills_category_frontend: [
    "React",
    "Next",
    "Vue",
    "Svelte",
    "SASS",
    "TailwindCSS",
  ],
  skills_category_backend: [
    "Node",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Mongoose",
    "GraphQL",
  ],
  skills_category_tests: ["Vitest", "Jest", "Testing Library", "Storybook"],
  skills_category_devops: ["Git", "Docker", "Figma"],
} satisfies Record<string, string[]>;

export type Tech =
  | "html5"
  | "css3"
  | "javascript"
  | "typescript"
  | "python"
  | "react"
  | "preact"
  | "vue"
  | "svelte"
  | "next"
  | "astro"
  | "sass"
  | "tailwindcss"
  | "styledcomponents"
  | "node"
  | "docker"
  | "postgresql"
  | "mongodb"
  | "contentful"
  | "jest"
  | "vitest"
  | "testinglibrary"
  | "cypress"
  | "storybook"
  | "git"
  | "github"
  | "githubactions"
  | "figma";

export const TECH_META: Record<Tech, { label: string; color: string }> = {
  html5: { label: "HTML5", color: "#E34F26" },
  css3: { label: "CSS3", color: "#1572B6" },
  javascript: { label: "Javascript", color: "#F7DF1E" },
  typescript: { label: "Typescript", color: "#3178C6" },
  python: { label: "Python", color: "#3776AB" },
  react: { label: "React", color: "#61DAFB" },
  preact: { label: "Preact", color: "#673AB8" },
  vue: { label: "Vue", color: "#4FC08D" },
  svelte: { label: "Svelte", color: "#FF3E00" },
  next: { label: "Next", color: "#FFFFFF" },
  astro: { label: "Astro", color: "#BC52EE" },
  sass: { label: "SASS", color: "#C69" },
  tailwindcss: { label: "TailwindCSS", color: "#06B6D4" },
  styledcomponents: { label: "Styled Components", color: "#DB7093" },
  node: { label: "Node", color: "#5FA04E" },
  docker: { label: "Docker", color: "#2496ED" },
  postgresql: { label: "PostgreSQL", color: "#4169E1" },
  mongodb: { label: "MongoDB", color: "#47A248" },
  contentful: { label: "Contentful", color: "#2478CC" },
  jest: { label: "Jest", color: "#C21325" },
  vitest: { label: "Vitest", color: "#6E9F18" },
  testinglibrary: { label: "Testing Library", color: "#E33332" },
  cypress: { label: "Cypress", color: "#69D3A7" },
  storybook: { label: "Storybook", color: "#FF4785" },
  git: { label: "Git", color: "#F05032" },
  github: { label: "GitHub", color: "#E7E8E8" },
  githubactions: { label: "GitHub Actions", color: "#2088FF" },
  figma: { label: "Figma", color: "#F24E1E" },
};

export const TECH_ORDER = Object.keys(TECH_META);

export const PROJECTS_ORDER = [
  "azganoth",
  "galleria",
  "github-user-search",
  "tic-tac-toe",
  "body-mass-index-calculator",
  "skilled-e-learning",
  "workit",
  "suite",
  "equalizer",
];

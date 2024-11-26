export type Tech =
  | "html5"
  | "css3"
  | "javascript"
  | "typescript"
  | "python"
  | "react"
  | "next"
  | "vue"
  | "astro"
  | "sass"
  | "tailwindcss"
  | "styledcomponents"
  | "node"
  | "docker"
  | "postgresql"
  | "mongodb"
  | "jest"
  | "vitest"
  | "testinglibrary"
  | "cypress"
  | "git"
  | "github"
  | "githubactions"
  | "figma";

export type Project = {
  title: string;
  description: string;
  link: string;
  repoLink: string;
  tech: Tech[];
};

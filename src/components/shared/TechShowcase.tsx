import type { Tech } from "../../types";
import { simpleCX } from "../../utils/cx";
import Icon from "./Icon";

export const TECH_LABELS = {
  html5: "HTML",
  css3: "CSS",
  javascript: "Javascript",
  typescript: "Typescript",
  python: "Python",
  react: "React",
  vue: "Vue",
  next: "Next",
  astro: "Astro",
  sass: "SASS",
  tailwindcss: "TailwindCSS",
  styledcomponents: "Styled Components",
  node: "Node",
  docker: "Docker",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  jest: "Jest",
  vitest: "Vitest",
  testinglibrary: "Testing Library",
  cypress: "Cypress",
  git: "Git",
  github: "GitHub",
  githubactions: "GitHub Actions",
  figma: "Figma",
};

export type TechShowcaseProps = {
  class?: string;
  tech: Tech[];
  isResponsive?: boolean;
};

function TechShowcase({
  class: className,
  tech,
  isResponsive,
}: TechShowcaseProps) {
  return (
    <ul
      class={simpleCX("flex flex-wrap gap-2", className)}
      aria-label="Tecnologias usadas"
    >
      {tech.map((tec) => (
        <li
          key={tec}
          class={simpleCX(
            "opacity-50 transition-opacity duration-300 ease-out hover:opacity-100",
            isResponsive &&
              "lg:flex lg:items-center lg:gap-2 lg:rounded-2xl lg:bg-charcoal lg:px-3 lg:py-2 lg:opacity-100",
          )}
          title={TECH_LABELS[tec]}
        >
          <Icon class="text-xl" name={tec} />
          <span
            class={simpleCX(
              "sr-only cursor-default text-s font-bold text-gray",
              isResponsive && "lg:not-sr-only",
            )}
          >
            {TECH_LABELS[tec]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TechShowcase;

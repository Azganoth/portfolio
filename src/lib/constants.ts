// NOTE: don't import anything, it will break vercel's middleware

// --- CONTACT ---
export const CONTACT_INFO = {
  Email: "mailto:ademirj.ferreirajunior@gmail.com",
  WhatsApp: "https://wa.me/48991984443",
  GitHub: "https://github.com/Azganoth",
  LinkedIn: "https://www.linkedin.com/in/ademirjferreirajunior/",
};

// --- PROJECTS ---
export const PROJECTS_ORDER = [
  "azganoth",
  "nexus",
  "galleria",
  "simplemotionreact",
  "devfinder",
  "tictactoe",
  "passwordgen",
  "bmicalc",
  "skilled",
  "workit",
  "suite",
  "equalizer",
];

export const PROJECT_LINK_BASE = "#project-";

// --- UI ---
export const PREVIEW_SIZE = {
  width: 720,
  height: 540,
};

export const TAG_META: Record<string, { color: string; icon: string }> = {
  HTML: { color: "#E34F26", icon: "simple-icons:html5" },
  CSS: { color: "#1572B6", icon: "simple-icons:css3" },
  JavaScript: { color: "#F7DF1E", icon: "simple-icons:javascript" },
  TypeScript: { color: "#3178C6", icon: "simple-icons:typescript" },
  React: { color: "#61DAFB", icon: "simple-icons:react" },
  Preact: { color: "#673AB8", icon: "simple-icons:preact" },
  Svelte: { color: "#FF3E00", icon: "simple-icons:svelte" },
  Next: { color: "#FFFFFF", icon: "simple-icons:nextdotjs" },
  SASS: { color: "#CC6699", icon: "simple-icons:sass" },
  TailwindCSS: { color: "#06B6D4", icon: "simple-icons:tailwindcss" },
  Node: { color: "#5FA04E", icon: "simple-icons:nodedotjs" },
  PostgreSQL: { color: "#4169E1", icon: "simple-icons:postgresql" },
  Prisma: { color: "#2D3748", icon: "simple-icons:prisma" },
  Jest: { color: "#C21325", icon: "simple-icons:jest" },
  Vitest: { color: "#6E9F18", icon: "simple-icons:vitest" },
  "Testing Library": { color: "#E33332", icon: "simple-icons:testinglibrary" },
  Storybook: { color: "#FF4785", icon: "simple-icons:storybook" },
  Postman: { color: "#FF6C37", icon: "simple-icons:postman" },
  Git: { color: "#F05032", icon: "simple-icons:git" },
  GitHub: { color: "#E7E8E8", icon: "simple-icons:github" },
  Docker: { color: "#2496ED", icon: "simple-icons:docker" },
  Figma: { color: "#F24E1E", icon: "simple-icons:figma" },
  Vue: { color: "#4FC08D", icon: "simple-icons:vuedotjs" },
  Express: { color: "#000000", icon: "simple-icons:express" },
  "CSS Modules": { color: "#000000", icon: "simple-icons:cssmodules" },
  SvelteKit: { color: "#FF3E00", icon: "simple-icons:svelte" },
};

// IDs
export const ID_START_SECTION = "start";
export const ID_BIO_SECTION = "bio";
export const ID_SKILLS_SECTION = "skills";
export const ID_PROJECTS_SECTION = "projects";
export const ID_CONTACT_SECTION = "contact";

export const ID_MOBILE_MENU = "mobile-nav-menu";

// --- i18n ---
export const SUPPORTED_LOCALES: string[] = ["pt", "en"];
export const DEFAULT_LOCALE = "pt";

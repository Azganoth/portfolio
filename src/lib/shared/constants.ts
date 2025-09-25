// NOTE: don't import anything, it will break vercel's middleware

// --- CONFIGURATION & DEFAULTS ---

export const SUPPORTED_LOCALES = ["pt", "en"];
export const DEFAULT_LOCALE = "pt";

export const PREVIEW_SIZE = {
  width: 720,
  height: 540,
};

export const PROJECT_LINK_BASE = "#project-";

// --- CONTENT ---

export const PROJECTS_ORDER = [
  "azganoth",
  "nexus",
  "simplemotionreact",
  "galleria",
  "treesitterlua",
  "devfinder",
  "tictactoe",
  "passwordgen",
  "bmicalc",
  "skilled",
  "workit",
  "suite",
  "equalizer",
];

// --- IDENTIFIERS ---

export const ID_START_SECTION = "start";
export const ID_BIO_SECTION = "bio";
export const ID_SKILLS_SECTION = "skills";
export const ID_PROJECTS_SECTION = "projects";
export const ID_CONTACT_SECTION = "contact";

export const ID_MOBILE_MENU = "mobile-nav-menu";
export const ID_PROJECT_DETAILS = "project-details-modal";
export const ID_PROJECT_TITLE = "project-details-title";
export const ID_IMAGE_GALLERY = "image-gallery-modal";

// --- METADATA ---

export const TAG_META: Record<string, { color: string; icon: string }> = {
  HTML: { color: "#E34F26", icon: "simple-icons:html5" },
  CSS: { color: "#1572B6", icon: "simple-icons:css3" },
  JavaScript: { color: "#F7DF1E", icon: "simple-icons:javascript" },
  TypeScript: { color: "#3178C6", icon: "simple-icons:typescript" },
  Python: { color: "#3776AB", icon: "simple-icons:python" },
  React: { color: "#61DAFB", icon: "simple-icons:react" },
  Preact: { color: "#673AB8", icon: "simple-icons:preact" },
  Svelte: { color: "#FF3E00", icon: "simple-icons:svelte" },
  Next: { color: "#FFFFFF", icon: "simple-icons:nextdotjs" },
  SASS: { color: "#CC6699", icon: "simple-icons:sass" },
  TailwindCSS: { color: "#06B6D4", icon: "simple-icons:tailwindcss" },
  Node: { color: "#5FA04E", icon: "simple-icons:nodedotjs" },
  PostgreSQL: { color: "#4169E1", icon: "simple-icons:postgresql" },
  MongoDB: { color: "#47A248", icon: "simple-icons:mongodb" },
  Prisma: { color: "#2D3748", icon: "simple-icons:prisma" },
  Mongoose: { color: "#880000", icon: "simple-icons:mongoose" },
  GraphQL: { color: "#E10098", icon: "simple-icons:graphql" },
  Jest: { color: "#C21325", icon: "simple-icons:jest" },
  Vitest: { color: "#6E9F18", icon: "simple-icons:vitest" },
  "Testing Library": { color: "#E33332", icon: "simple-icons:testinglibrary" },
  Cypress: { color: "#69D3A7", icon: "simple-icons:cypress" },
  Storybook: { color: "#FF4785", icon: "simple-icons:storybook" },
  Postman: { color: "#FF6C37", icon: "simple-icons:postman" },
  Git: { color: "#F05032", icon: "simple-icons:git" },
  GitHub: { color: "#E7E8E8", icon: "simple-icons:github" },
  Docker: { color: "#2496ED", icon: "simple-icons:docker" },
  Figma: { color: "#F24E1E", icon: "simple-icons:figma" },
  C: { color: "#A8B9CC", icon: "simple-icons:c" },
  Lua: { color: "#6668c3", icon: "simple-icons:lua" },
  Rust: { color: "#FFFFFF", icon: "simple-icons:rust" },
  Vue: { color: "#4FC08D", icon: "simple-icons:vuedotjs" },
  Express: { color: "#FFFFFF", icon: "simple-icons:express" },
  "CSS Modules": { color: "#FFFFFF", icon: "simple-icons:cssmodules" },
  SvelteKit: { color: "#FF3E00", icon: "simple-icons:svelte" },
};

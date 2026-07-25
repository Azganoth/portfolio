// --- CONFIGURATION & DEFAULTS ---

export const SITE_URL = "https://azganoth.vercel.app";

export const SUPPORTED_LOCALES = ["pt", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt";

export const isSupportedLocale = (locale: unknown): locale is Locale =>
  typeof locale === "string" && SUPPORTED_LOCALES.includes(locale as Locale);

export const PREVIEW_SIZE = {
  width: 720,
  height: 540,
};

// --- CONTENT ---

export const PROJECTS_ORDER = [
  "leafdown",
  "nexus",
  "fixmyhalo",
  "simplemotionreact",
  "cropandquest",
  "pixelicons",
  "treesitterlua",
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

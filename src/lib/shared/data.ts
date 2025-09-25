export const CONTACT_INFO = {
  Email: "mailto:ademirj.ferreirajunior@gmail.com",
  WhatsApp: "https://wa.me/48991984443",
  GitHub: "https://github.com/Azganoth",
  LinkedIn: "https://www.linkedin.com/in/ademirjferreirajunior/",
};

interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

export const CONTACT_SHORTCUTS: ContactLink[] = [
  {
    label: "GitHub",
    href: CONTACT_INFO.GitHub,
    icon: "simple-icons:github",
  },
  {
    label: "LinkedIn",
    href: CONTACT_INFO.LinkedIn,
    icon: "simple-icons:linkedin",
  },
  {
    label: "WhatsApp",
    href: CONTACT_INFO.WhatsApp,
    icon: "simple-icons:whatsapp",
  },
  {
    label: "Email",
    href: CONTACT_INFO.Email,
    icon: "simple-icons:gmail",
  },
];

interface ContactItem {
  label: string;
  href: string;
}

export const CONTACT_LIST: ContactItem[] = [
  { label: "ademirj.ferreirajunior@gmail.com", href: CONTACT_INFO.Email },
  { label: "WhatsApp", href: CONTACT_INFO.WhatsApp },
  { label: "LinkedIn", href: CONTACT_INFO.LinkedIn },
];

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

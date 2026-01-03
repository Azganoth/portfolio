export const CONTACT_INFO = {
  Email: "ademirj.ferreirajunior@gmail.com",
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
    label: "Email",
    href: `emailto:${CONTACT_INFO.Email}`,
    icon: "simple-icons:gmail",
  },
  {
    label: "WhatsApp",
    href: CONTACT_INFO.WhatsApp,
    icon: "simple-icons:whatsapp",
  },
  {
    label: "LinkedIn",
    href: CONTACT_INFO.LinkedIn,
    icon: "simple-icons:linkedin",
  },
  {
    label: "GitHub",
    href: CONTACT_INFO.GitHub,
    icon: "simple-icons:github",
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

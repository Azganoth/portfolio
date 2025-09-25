import { page } from "$app/state";

export const getLocalizedPath = (path: string) => {
  const lang = page.params.lang;
  const prefix = lang ? `/${lang}` : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
};

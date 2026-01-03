import { page } from "$app/state";

/**
 * Convenience wrapper for getLocalizedPath using the current page locale.
 */
export const getLocalizedPath = (path: string) => {
  const lang = page.params.lang;
  path = path.startsWith("/") ? path : `/${path}`;
  return lang ? `/${lang}${path}` : path;
};

/**
 * Convenience wrapper for getUnlocalizedPath using the current page locale.
 */
export const getUnlocalizedPath = (path: string) => {
  const lang = page.params.lang;
  path = path.startsWith("/") ? path : `/${path}`;
  if (lang) {
    path = path.replace(new RegExp(`^/${lang}(/|$)`), "/");
  }

  return path;
};

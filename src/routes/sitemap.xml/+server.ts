import type { Locale } from "$lib/features/i18n/translation.svelte";
import { getProjects } from "$lib/features/projects/loader/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "$lib/shared/constants";
import { HREFLANG_BY_LOCALE, localizeUrl } from "$lib/shared/utils";
import type { RequestHandler } from "./$types";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'"]/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[char] ?? char,
  );

const xml = (strings: TemplateStringsArray, ...values: string[]) =>
  strings.reduce(
    (result, string, i) => `${result}${string}${escapeXml(values[i] ?? "")}`,
    "",
  );

export const prerender = true;

export const GET: RequestHandler = async () => {
  const locales = SUPPORTED_LOCALES as Locale[];
  const projectsByLocale = await getProjects();
  const slugs = [
    ...new Set(
      Object.values(projectsByLocale).flatMap((projects) =>
        projects.map((project) => project.slug),
      ),
    ),
  ];
  const paths = ["/", ...slugs.map((slug) => `/projects/${slug}`)];

  const entries = paths.flatMap((path) =>
    locales
      .filter((locale) => {
        if (path === "/") return true;
        const slug = path.split("/").at(-1);
        return projectsByLocale[locale].some(
          (project) => project.slug === slug,
        );
      })
      .map((locale) => {
        const alternates = locales
          .filter((alternateLocale) => {
            if (path === "/") return true;
            const slug = path.split("/").at(-1);
            return projectsByLocale[alternateLocale].some(
              (project) => project.slug === slug,
            );
          })
          .map(
            (alternateLocale) =>
              xml`    <xhtml:link rel="alternate" hreflang="${HREFLANG_BY_LOCALE[alternateLocale]}" href="${localizeUrl(path, alternateLocale)}" />`,
          );

        alternates.push(
          xml`    <xhtml:link rel="alternate" hreflang="x-default" href="${localizeUrl(path, DEFAULT_LOCALE as Locale)}" />`,
        );

        return `  <url>
    <loc>${escapeXml(localizeUrl(path, locale))}</loc>
${alternates.join("\n")}
  </url>`;
      }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};

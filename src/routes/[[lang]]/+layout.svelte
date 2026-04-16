<script lang="ts">
  import { dev } from "$app/environment";
  import { page } from "$app/state";
  import { CONTACT_INFO } from "$lib/features/contact/data";
  import LanguageSelector from "$lib/features/i18n/components/LanguageSelector.svelte";
  import {
    t,
    translationStore,
    type Locale,
  } from "$lib/features/i18n/translation.svelte";
  import type { Project } from "$lib/features/projects/schema";
  import { projectStore } from "$lib/features/projects/store.svelte";
  import StarfieldBackground from "$lib/shared/components/StarfieldBackground.svelte";
  import {
    DEFAULT_LOCALE,
    SITE_URL,
    SUPPORTED_LOCALES,
  } from "$lib/shared/constants";
  import {
    HREFLANG_BY_LOCALE,
    localizeUrl,
    OG_LOCALE_BY_LOCALE,
  } from "$lib/shared/utils";
  import { getCurrentUnlocalizedPath } from "$lib/shared/utils/currentPath.svelte";
  import interVarWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";
  import spaceGroteskWoff2 from "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import "../../app.css";

  let { data, children } = $props();

  const serializeJsonLd = (data: unknown) =>
    JSON.stringify(data).replace(/</g, "\\u003c");

  const syncLocale = () => {
    translationStore.locale = data.lang as Locale;
  };

  syncLocale();

  const activeProject = $derived<Project | undefined>(
    page.data.project || projectStore.selected,
  );

  $effect(() => {
    syncLocale();
    document.documentElement.setAttribute("lang", translationStore.locale);
  });

  const title = $derived(
    activeProject ? `${activeProject.title} | Azganoth` : t("meta_title"),
  );
  const siteDescription = $derived(t("meta_description"));
  const description = $derived(activeProject?.summary ?? siteDescription);
  const unlocalizedPath = $derived(
    getCurrentUnlocalizedPath(page.url.pathname),
  );
  const url = $derived(localizeUrl(unlocalizedPath, translationStore.locale));
  const localeAlternates = $derived(
    SUPPORTED_LOCALES.map((locale) => {
      const typedLocale = locale as Locale;

      return {
        href: localizeUrl(unlocalizedPath, typedLocale),
        hreflang: HREFLANG_BY_LOCALE[typedLocale],
        locale: typedLocale,
      };
    }),
  );
  const xDefaultUrl = $derived(
    localizeUrl(unlocalizedPath, DEFAULT_LOCALE as Locale),
  );
  const metaImage = $derived(
    new URL(
      activeProject?.previews[0]?.url ?? "/meta_image.png",
      SITE_URL,
    ).toString(),
  );
  const metaImageAlt = $derived(
    activeProject
      ? t("a11y_project_preview", { title: activeProject.title })
      : t("meta_image_alt"),
  );
  const ogLocale = $derived(OG_LOCALE_BY_LOCALE[translationStore.locale]);
  const alternateOgLocales = $derived(
    localeAlternates
      .filter(({ locale }) => locale !== translationStore.locale)
      .map(({ locale }) => OG_LOCALE_BY_LOCALE[locale]),
  );
  const jsonLdScript = $derived.by(() => {
    const jsonLd = serializeJsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: "Ademir Ferreira Junior",
          alternateName: "Azganoth",
          url: SITE_URL,
          image: new URL("/meta_image.png", SITE_URL).toString(),
          jobTitle: t("start_role"),
          email: `mailto:${CONTACT_INFO.Email}`,
          sameAs: [CONTACT_INFO.GitHub, CONTACT_INFO.LinkedIn],
        },
        {
          "@type": "WebSite",
          name: "Azganoth",
          url: SITE_URL,
          inLanguage: HREFLANG_BY_LOCALE[translationStore.locale],
          description: siteDescription,
        },
        ...(activeProject
          ? [
              {
                "@type": "SoftwareSourceCode",
                name: activeProject.title,
                description: activeProject.summary,
                url,
                image: metaImage,
                codeRepository: activeProject.repository,
                programmingLanguage: activeProject.tags,
              },
            ]
          : []),
      ],
    });

    return `<script type="application/ld+json">${jsonLd}</${"script"}>`;
  });

  injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href={interVarWoff2}
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href={spaceGroteskWoff2}
    crossorigin="anonymous"
  />
  <title>{title}</title>
  <link rel="canonical" href={url} />
  {#each localeAlternates as { href, hreflang } (hreflang)}
    <link rel="alternate" {hreflang} {href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={xDefaultUrl} />
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={ogLocale} />
  {#each alternateOgLocales as locale (locale)}
    <meta property="og:locale:alternate" content={locale} />
  {/each}
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={metaImage} />
  <meta property="og:image:alt" content={metaImageAlt} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={metaImage} />
  <meta property="twitter:image:alt" content={metaImageAlt} />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript}
</svelte:head>

<StarfieldBackground />
<LanguageSelector />
{@render children()}

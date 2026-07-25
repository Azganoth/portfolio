<script lang="ts">
  import { page } from "$app/state";
  import LanguageSelector from "$lib/features/i18n/components/LanguageSelector.svelte";
  import { t, translationStore } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";
  import { getPathnameLocale, localizePathname } from "$lib/shared/utils/path";

  // Unmatched URLs render this outside the `[[lang]]` tree, where `page.params`
  // carries no locale, so it is resolved from the pathname instead.
  const locale = $derived(getPathnameLocale(page.url.pathname));

  // Applied during init as well, so the server renders the language matching
  // the requested URL instead of the store's default.
  translationStore.locale = getPathnameLocale(page.url.pathname);

  $effect(() => {
    translationStore.locale = locale;
  });

  const is404 = $derived(page.status === 404);
  const title = $derived(
    is404 ? t("error_not_found_title") : t("error_generic_title"),
  );
  const description = $derived(
    is404 ? t("error_not_found_description") : t("error_generic_description"),
  );
</script>

<svelte:head>
  <title>{title} | Azganoth</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<LanguageSelector />
<main
  class="flex min-h-svh flex-col items-center justify-center p-8 text-center"
>
  <div class="mb-16">
    <Logo />
  </div>

  <h1 class="mb-8 font-display text-3xl font-bold tracking-wide md:text-4xl">
    {title}
  </h1>
  <p class="text-lg text-muted-foreground">
    {description}
  </p>

  <Link
    href={localizePathname("/", locale)}
    class="mt-24 block rounded-full bg-secondary px-6 py-3 font-mono text-background hover:bg-secondary/90"
    variant="none"
  >
    {t("error_back_home")}
  </Link>
</main>

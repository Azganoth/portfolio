<script lang="ts">
  import { page } from "$app/state";
  import LanguageSelector from "$lib/features/i18n/components/LanguageSelector.svelte";
  import { t } from "$lib/features/i18n/translation";
  import { getLocalizedPath } from "$lib/features/i18n/utils";
  import { reveal } from "$lib/shared/attachments/reveal.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Logo from "$lib/shared/components/Logo.svelte";
  import Starfield from "$lib/shared/components/StarfieldBackground.svelte";

  const is404 = $derived(page.status === 404);
  const title = $derived(
    is404 ? $t("error_not_found_title") : $t("error_generic_title"),
  );
  const description = $derived(
    is404 ? $t("error_not_found_description") : $t("error_generic_description"),
  );
</script>

<svelte:head>
  <title>{title} | Azganoth</title>
</svelte:head>

<Starfield />
<LanguageSelector />
<main
  class="flex min-h-svh flex-col items-center justify-center p-8 text-center"
>
  <div class="mb-16">
    <Logo />
  </div>

  <h1
    class="mb-8 font-display text-3xl font-bold tracking-wide md:text-4xl"
    {@attach reveal()}
  >
    {title}
  </h1>
  <p class="text-lg text-muted-foreground" {@attach reveal()}>
    {description}
  </p>

  <div class="reveal-slide-up duration-700" {@attach reveal()}>
    <Link
      href={getLocalizedPath("/")}
      class="mt-24 block rounded-full bg-secondary px-6 py-3 font-mono text-background transition-colors hover:bg-secondary/90"
      variant="none"
    >
      {$t("error_back_home")}
    </Link>
  </div>
</main>

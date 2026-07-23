<script lang="ts">
  import { CONTACT_SHORTCUTS } from "$lib/features/contact/data";
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_PROJECTS_SECTION, ID_START_SECTION } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  const cvHref = $derived(t("_cv_href"));
</script>

{#snippet name()}
  <span class="text-primary">Ademir</span>
{/snippet}

<Section
  id={ID_START_SECTION}
  class="relative flex min-h-[calc(100svh-6rem)] items-center"
>
  <div class="relative w-full max-w-5xl">
    <Reveal
      class="delay-75 duration-400 ease-out-expo not-in-view:-translate-y-4 not-in-view:opacity-0"
    >
      <p
        class="mb-5 text-center font-mono font-bold tracking-widest text-secondary uppercase md:text-start"
      >
        {t("start_role")}
      </p>
      <h1
        class="max-w-4xl text-center font-display text-4xl leading-12 font-semibold tracking-wide text-balance md:text-start md:text-5xl md:leading-16"
      >
        <Translation key="start_hello" values={{ name }} />
      </h1>
    </Reveal>
    <Reveal
      class="delay-200 duration-400 not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <p
        class="mt-6 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground md:text-start md:text-xl"
      >
        {t("start_value_prop")}
      </p>
    </Reveal>
    <Reveal
      class="delay-500 duration-400 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <div class="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
        <Link
          variant="none"
          href={`#${ID_PROJECTS_SECTION}`}
          class="flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-mono font-bold tracking-wide text-background shadow-glow transition-transform hover:-translate-y-1"
        >
          <span>{t("start_projects_cta")}</span>
          <Icon icon="fa6-solid:arrow-down" />
        </Link>
        <Link
          variant="none"
          href={cvHref}
          newTab
          aria-label={t("a11y_download_cv")}
          class="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono font-bold tracking-wide text-foreground transition-all hover:-translate-y-1 hover:border-secondary/40 hover:text-secondary"
        >
          <span>{t("start_curriculum")}</span>
          <Icon icon="fa6-solid:arrow-up-right-from-square" />
        </Link>
      </div>
      <ul class="mt-10 flex justify-center gap-6 md:ml-8 md:justify-start">
        {#each CONTACT_SHORTCUTS as { label, href, icon } (href)}
          <li class="transition-transform ease-snappy hover:scale-110">
            <Link
              {href}
              class="text-muted-foreground hover:text-foreground focus-visible:text-foreground"
              aria-label={label}
              newTab
            >
              <Icon class="size-8" {icon} />
            </Link>
          </li>
        {/each}
      </ul>
    </Reveal>
  </div>
  <div
    class="absolute bottom-8 center-x flex h-14 w-7 justify-center rounded-full border-2 border-muted-foreground/50 p-2"
  >
    <div
      class="h-4 w-2 animate-scroll-wheel rounded-full bg-muted-foreground/50"
    ></div>
  </div>
</Section>

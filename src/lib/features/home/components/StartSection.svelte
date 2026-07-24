<script lang="ts">
  import { CONTACT_INFO } from "$lib/features/contact/data";
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import {
    ID_BIO_SECTION,
    ID_PROJECTS_SECTION,
    ID_START_SECTION,
  } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  const cvHref = $derived(t("_cv_href"));
  const contactList = $derived(
    Object.entries(CONTACT_INFO).filter(
      ([, href]) => href !== CONTACT_INFO.WhatsApp,
    ),
  );
</script>

{#snippet name()}
  <span class="text-primary">Ademir</span>
{/snippet}

<Section
  id={ID_START_SECTION}
  class="relative flex min-h-svh items-center pt-28 pb-20 md:pt-32"
>
  <div
    class="pointer-events-none absolute top-14 -left-64 h-120 w-120 rounded-full bg-primary/8 blur-3xl"
  ></div>
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
        class="max-w-4xl text-center font-display text-5xl font-semibold tracking-tight text-balance md:text-start md:text-7xl"
      >
        <Translation key="start_hello" values={{ name }} />
      </h1>
    </Reveal>
    <Reveal
      class="delay-200 duration-400 not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <p
        class="mt-7 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground md:text-start md:text-xl"
      >
        {t("start_value_prop")}
      </p>
    </Reveal>
    <Reveal
      class="delay-500 duration-400 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <div class="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
        <Link
          variant="none"
          href={`#${ID_PROJECTS_SECTION}`}
          class="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono font-bold tracking-wide text-background shadow-glow transition-colors hover:bg-primary/85"
        >
          <span>{t("start_projects_cta")}</span>
          <Icon icon="fa6-solid:arrow-down" />
        </Link>
        <Link
          variant="none"
          href={cvHref}
          newTab
          aria-label={t("a11y_download_cv")}
          class="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-mono font-bold tracking-wide text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
        >
          <span>{t("start_curriculum")}</span>
          <Icon icon="fa6-solid:arrow-up-right-from-square" />
        </Link>
      </div>
      <ul
        class="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 md:justify-start"
      >
        {#each contactList as [label, href] (href)}
          <li>
            <Link
              {href}
              variant="none"
              class="group flex items-center gap-2 text-muted-foreground hover:text-foreground focus-visible:text-foreground"
              aria-label={label}
              newTab
            >
              <span>{label}</span>
              <Icon
                class="size-3"
                icon="fa6-solid:arrow-up-right-from-square"
              />
            </Link>
          </li>
        {/each}
      </ul>
    </Reveal>
  </div>
  <Link
    variant="none"
    href={`#${ID_BIO_SECTION}`}
    class="absolute bottom-8 left-6 hidden items-center gap-3 font-mono text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground md:left-12 md:flex xl:left-16"
  >
    <span>{t("start_scroll_label")}</span>
    <Icon icon="fa6-solid:arrow-down" class="size-3" />
  </Link>
</Section>

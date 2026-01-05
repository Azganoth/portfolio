<script lang="ts">
  import { CONTACT_SHORTCUTS } from "$lib/features/contact/data";
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_START_SECTION } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";
</script>

{#snippet name()}
  <br /><span class="text-primary">Ademir</span>
{/snippet}

<Section id={ID_START_SECTION} class="relative flex min-h-svh items-center">
  <div class="relative w-full">
    <Reveal
      class="duration-500 not-in-view:-translate-y-4 not-in-view:opacity-0"
    >
      <h1
        class="mb-4 text-center font-display text-4xl leading-16 font-semibold tracking-wide md:text-start md:text-5xl md:leading-20"
      >
        <Translation key="start_hello" values={{ name }} />
      </h1>
    </Reveal>
    <Reveal
      class="delay-200 duration-500 not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <h2
        class="text-center font-display text-lg font-semibold tracking-wide text-muted-foreground md:text-start md:text-xl"
      >
        {t("start_role")}
      </h2>
    </Reveal>
    <Reveal
      class="delay-500 duration-500 not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <ul class=" mt-8 flex justify-center gap-6 md:justify-start">
        {#each CONTACT_SHORTCUTS as { label, href, icon } (href)}
          <li class="transition-transform hover:scale-110">
            <Link
              {href}
              class="text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
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
  <Link
    class={[
      "absolute bottom-8 center-x flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-mono text-lg font-bold text-background transition-transform hover:scale-105 hover:bg-secondary/90 md:bottom-10",
      "before:absolute before:inset-0 before:-z-1 before:animate-pulse before:rounded-full before:bg-secondary before:blur-sm before:content-['']",
    ]}
    variant="none"
    href="/cv.pdf"
    newTab
    aria-label={t("a11y_download_cv")}
  >
    <span>{t("start_curriculum")}</span>
    <Icon icon="fa6-solid:arrow-up-right-from-square" />
  </Link>
</Section>

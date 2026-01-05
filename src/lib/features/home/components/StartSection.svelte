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
      class="delay-75 duration-400 ease-out-expo not-in-view:-translate-y-4 not-in-view:opacity-0"
    >
      <h1
        class="mb-4 text-center font-display text-4xl leading-16 font-semibold tracking-wide md:text-start md:text-5xl md:leading-20"
      >
        <Translation key="start_hello" values={{ name }} />
      </h1>
    </Reveal>
    <Reveal
      class="delay-200 duration-400 not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <h2
        class="text-center font-display text-lg font-semibold tracking-wide text-muted-foreground md:text-start md:text-xl"
      >
        {t("start_role")}
      </h2>
    </Reveal>
    <Reveal
      class="delay-500 duration-400 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0"
    >
      <ul class=" mt-8 flex justify-center gap-6 md:justify-start">
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
    class="absolute bottom-12 center-x flex h-14 w-7 justify-center rounded-full border-2 border-muted-foreground p-2 opacity-50 transition-opacity hover:opacity-100"
  >
    <div
      class="h-4 w-2 animate-scroll-wheel rounded-full bg-muted-foreground"
    ></div>
  </div>
</Section>

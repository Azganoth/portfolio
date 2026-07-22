<script lang="ts">
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import { t } from "$lib/features/i18n/translation.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Reveal from "$lib/shared/components/Reveal.svelte";
  import Section from "$lib/shared/components/Section.svelte";
  import { ID_BIO_SECTION } from "$lib/shared/constants";
  import profileImage from "$lib/shared/images/profile.webp?enhanced";
  import { getCurrentLocalizedPath } from "$lib/shared/utils/currentPath.svelte";
  import Icon from "@iconify/svelte";

  const cardClass =
    "relative flex flex-col overflow-hidden rounded-3xl bg-muted/20 p-6 shadow-sm ring-1 ring-white/10 backdrop-blur-md";

  const footerSections = $derived([
    {
      label: t("bio_stat_education_label"),
      value: t("bio_stat_education_value"),
      icon: "lucide:graduation-cap",
      accent: "text-primary",
    },
    {
      label: t("bio_stat_languages_label"),
      value: t("bio_stat_languages_value"),
      icon: "lucide:globe",
      accent: "text-secondary",
    },
    {
      label: t("bio_stat_location_label"),
      value: t("bio_stat_location_value"),
      icon: "lucide:map-pin",
      accent: "text-accent",
    },
  ]);
</script>

{#snippet nexus()}
  <Link class="text-white" href={getCurrentLocalizedPath("/projects/nexus")}>
    Nexus
  </Link>
{/snippet}
{#snippet smr()}
  <Link
    class="text-white"
    href={getCurrentLocalizedPath("/projects/simplemotionreact")}
  >
    Simple Motion React
  </Link>
{/snippet}
{#snippet fixmyhalo()}
  <Link
    class="text-white"
    href={getCurrentLocalizedPath("/projects/fixmyhalo")}
  >
    Fix My Halo
  </Link>
{/snippet}

<Section id={ID_BIO_SECTION}>
  <div
    class="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]"
  >
    <!-- Profile Card -->
    <Reveal
      class={[
        cardClass,
        "duration-700 ease-out-expo not-in-view:-translate-x-4 not-in-view:opacity-0",
        "min-h-90 p-0!",
      ]}
    >
      <div
        class="absolute inset-0 z-0 after:absolute after:inset-0 after:bg-linear-to-t after:from-background/90 after:via-background/20 after:to-transparent"
      >
        <enhanced:img
          class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          src={profileImage}
          alt={t("a11y_avatar_alt")}
        />
      </div>
      <div class="relative z-10 mt-auto flex flex-col p-6">
        <div
          class="flex w-fit items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 backdrop-blur-sm"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
            ></span>
          </span>
          {t("contact_status_available")}
        </div>
      </div>
    </Reveal>

    <!-- Intro Card -->
    <Reveal
      class={[
        cardClass,
        "duration-700 ease-out-expo not-in-view:translate-x-4 not-in-view:opacity-0",
        "md:col-span-2",
      ]}
    >
      <h2 class="mb-4 font-display text-2xl font-bold text-foreground">
        {t("bio_title")}
      </h2>
      <div class="space-y-4 text-muted-foreground">
        <p class="leading-relaxed">
          <Translation key="bio_description_1" />
        </p>
        <p class="leading-relaxed">
          <Translation
            key="bio_description_2"
            values={{ nexus, smr, fixmyhalo }}
          />
        </p>
        <p class="leading-relaxed">
          <Translation key="bio_description_3" />
        </p>
      </div>
    </Reveal>

    <!-- Stats Bar -->
    <Reveal
      class={[
        cardClass,
        "delay-500 duration-700 ease-out-expo not-in-view:translate-y-4 not-in-view:opacity-0",
        "md:col-span-3",
      ]}
    >
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        {#each footerSections as { label, value, icon, accent } (value)}
          <div class="flex items-center gap-4">
            <div
              class={[
                "flex size-10 items-center justify-center rounded-full bg-current/10",
                accent,
              ]}
            >
              <Icon {icon} class="size-6" />
            </div>
            <div>
              <p
                class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
              >
                {label}
              </p>
              <p class="font-semibold text-foreground">
                {value}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </Reveal>
  </div>
</Section>

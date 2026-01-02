<script lang="ts">
  import { page } from "$app/state";
  import LanguageSelector from "$lib/features/i18n/components/LanguageSelector.svelte";
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import {
    locale,
    t,
    type TranslationKey,
  } from "$lib/features/i18n/translation";
  import { getLocalizedPath } from "$lib/features/i18n/utils";
  import ProjectList from "$lib/features/projects/components/ProjectList.svelte";
  import { selectedProject } from "$lib/features/projects/store";
  import { reveal } from "$lib/shared/attachments/reveal.svelte";
  import Header from "$lib/shared/components/Header.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import StarfieldBackground from "$lib/shared/components/StarfieldBackground.svelte";
  import {
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
    ID_START_SECTION,
    TAG_META,
  } from "$lib/shared/constants";
  import {
    CONTACT_LIST,
    CONTACT_SHORTCUTS,
    SKILLS_BY_CATEGORY,
  } from "$lib/shared/data";
  import profileImage from "$lib/shared/images/profile.webp?enhanced";
  import Icon from "@iconify/svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  const categorizedSkills = $derived(
    Object.entries(SKILLS_BY_CATEGORY).map(([category, skills]) => ({
      category: $t(category as TranslationKey),
      skills,
    })),
  );

  // Sync state from Shallow Routing (History API)
  $effect(() => {
    $selectedProject = page.state.selectedProject;
  });
</script>

<svelte:head>
  <title>
    {$selectedProject
      ? `${$selectedProject.title} | Azganoth`
      : $t("meta_title")}
  </title>
</svelte:head>

{#snippet name()}
  <br /><span class="text-primary">Ademir</span>
{/snippet}
{#snippet nexus()}
  <Link
    class="text-white"
    href={getLocalizedPath("/projects/nexus")}
    onclick={(e) => e.stopPropagation()}
  >
    Nexus
  </Link>
{/snippet}
{#snippet simplemotionreact()}
  <Link
    class="text-white"
    href={getLocalizedPath("/projects/simplemotionreact")}
    onclick={(e) => e.stopPropagation()}
  >
    Simple Motion React
  </Link>
{/snippet}

<StarfieldBackground />
<LanguageSelector />
<Header />
<main>
  <section
    id={ID_START_SECTION}
    class="section relative flex min-h-svh items-center"
  >
    <div class="relative w-full">
      <h1
        class="reveal-slide-down mb-4 text-center font-display text-4xl leading-16 font-semibold tracking-wide duration-700 md:text-start md:text-5xl md:leading-20"
        {@attach reveal()}
      >
        <Translation key="start_hello" values={{ name }} />
      </h1>
      <h2
        class="reveal-slide-up text-center font-display text-lg font-semibold tracking-wide text-muted-foreground duration-700 md:text-start md:text-xl"
        {@attach reveal()}
      >
        {$t("start_role")}
      </h2>
      <ul
        class="absolute z-10 flex justify-center gap-4 max-md:top-[calc(100%+2rem)] max-md:center-x md:center-y md:right-0 md:flex-col xl:fixed xl:right-8"
      >
        {#each CONTACT_SHORTCUTS as { label, href, icon } (href)}
          <li class="transition-transform hover:scale-110">
            <Link {href} aria-label={label} newTab>
              <Icon class="size-10" {icon} />
            </Link>
          </li>
        {/each}
      </ul>
    </div>
    <Link
      class={[
        "absolute bottom-8 center-x flex items-center gap-2 rounded-full bg-secondary px-5 py-2 font-mono text-background transition-colors hover:bg-secondary/90 md:bottom-10",
        "before:absolute before:inset-0 before:-z-1 before:animate-pulse before:rounded-full before:bg-secondary before:blur-sm before:content-['']",
      ]}
      variant="none"
      href="/cv.pdf"
      newTab
      aria-label={$t("a11y_download_cv")}
    >
      <span>{$t("start_curriculum")}</span>
      <Icon icon="fa6-solid:arrow-up-right-from-square" />
    </Link>
  </section>
  <section
    id={ID_BIO_SECTION}
    class={[
      "section relative",
      "before:absolute before:inset-y-5 before:center-x before:-z-1 before:w-dvw before:-skew-y-4 before:bg-muted before:shadow-elevation before:content-[''] md:before:inset-y-8 md:before:-skew-y-2 xl:before:-skew-y-1",
    ]}
  >
    <h2 class="mb-8 text-center font-display text-2xl font-bold tracking-wide">
      {$t("bio_title")}
    </h2>
    <div class="mx-auto max-w-[80ch] space-y-5 leading-7 text-white/90">
      <div
        class="reveal-fade float-end ml-4 duration-700 max-md:hidden"
        {@attach reveal()}
      >
        <enhanced:img
          class="mx-auto max-w-[256px] rounded-full"
          src={profileImage}
          alt={$t("a11y_avatar_alt")}
        />
      </div>
      <p>
        {$t("bio_description_1")}
      </p>
      <p>
        <Translation key="bio_description_2" values={{ nexus }} />
      </p>
      <p>
        <Translation key="bio_description_3" values={{ simplemotionreact }} />
      </p>
    </div>
  </section>
  <section id={ID_SKILLS_SECTION} class="section">
    <h2
      class="mb-8 text-center font-display text-2xl font-bold tracking-wide xl:mb-16 xl:text-start"
    >
      {$t("skills_title")}
    </h2>
    <div
      class="flex flex-col flex-wrap items-center justify-center gap-8 xl:flex-row xl:items-start xl:gap-y-16"
    >
      {#each categorizedSkills as { category, skills } (category)}
        <div class="max-w-96">
          <h3
            class="relative mb-12 text-center text-lg font-semibold after:absolute after:-bottom-4 after:center-x after:h-1 after:w-8 after:rounded-full after:bg-primary after:content-['']"
          >
            {category}
          </h3>
          <ul class="flex flex-wrap justify-center gap-4">
            {#each skills as skill (skill)}
              {@const { icon, color } = TAG_META[skill]}
              <li class="reveal-slide-up duration-700" {@attach reveal()}>
                <div
                  class="flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm transition-transform hover:scale-110"
                >
                  <Icon class="size-5" {icon} {color} />
                  <span
                    class="cursor-default font-mono font-bold tracking-wide text-foreground/90 duration-300 ease-out"
                  >
                    {skill}
                  </span>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>
  <section id={ID_PROJECTS_SECTION} class="section">
    <h2
      class="mb-8 text-center font-display text-2xl font-bold tracking-wide xl:text-start"
    >
      {$t("projects_title")}
    </h2>
    <ProjectList class="pt-8 pb-32" projects={data.props.projects[$locale]} />
  </section>
  <section id={ID_CONTACT_SECTION} class="section relative min-h-svh pb-44">
    <h2
      class="mb-8 text-center font-display text-2xl font-bold tracking-wide xl:text-start"
    >
      {$t("contact_title")}
    </h2>
    <div>
      <h3 class="text-center font-body font-medium xl:text-start">
        {$t("contact_message")}
      </h3>
      <ul class="mt-24 flex flex-col items-center gap-3 text-lg xl:items-start">
        {#each CONTACT_LIST as { label, href } (href)}
          <li class="reveal-slide-up duration-700" {@attach reveal()}>
            <Link {href} newTab>{label}</Link>
          </li>
        {/each}
      </ul>
    </div>
    <Link
      class="absolute bottom-12 center-x flex items-center gap-2 rounded-full bg-secondary px-5 py-2 font-mono whitespace-nowrap text-background transition-colors hover:bg-secondary/90 md:bottom-16"
      variant="none"
      href="#start"
    >
      <Icon class="size-5" icon="fa6-solid:arrow-up" />
      <span>{$t("contact_back_to_top")}</span>
    </Link>
  </section>
</main>

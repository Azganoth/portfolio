<script lang="ts">
  import Translation from "$lib/features/i18n/components/Translation.svelte";
  import { locale, t } from "$lib/features/i18n/translation";
  import ProjectList from "$lib/features/projects/components/ProjectList.svelte";
  import { selectedProject } from "$lib/features/projects/store";
  import { reveal } from "$lib/shared/attachments/reveal.svelte";
  import Header from "$lib/shared/components/Header.svelte";
  import LanguageSelector from "$lib/features/i18n/components/LanguageSelector.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import Starfield from "$lib/shared/components/Starfield.svelte";
  import {
    CONTACT_INFO,
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
    ID_START_SECTION,
    PROJECT_LINK_BASE,
    TAG_META,
  } from "$lib/shared/constants";
  import profileImage from "$lib/shared/images/profile.webp?enhanced";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  const quickContactShortcuts = [
    ["GitHub", CONTACT_INFO.GitHub, "simple-icons:github"],
    ["LinkedIn", CONTACT_INFO.LinkedIn, "simple-icons:linkedin"],
    ["WhatsApp", CONTACT_INFO.WhatsApp, "simple-icons:whatsapp"],
    ["Email", CONTACT_INFO.Email, "simple-icons:gmail"],
  ];

  const contactList = [
    ["ademirj.ferreirajunior@gmail.com", CONTACT_INFO.Email],
    ["WhatsApp", CONTACT_INFO.WhatsApp],
    ["LinkedIn", CONTACT_INFO.LinkedIn],
  ];

  const categorizedSkills = $derived<[category: string, skills: string[]][]>([
    [
      $t("skills_category_languages"),
      ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
    ],
    [
      $t("skills_category_frontend"),
      ["React", "Next", "Vue", "Svelte", "SASS", "TailwindCSS"],
    ],
    [
      $t("skills_category_backend"),
      ["Node", "PostgreSQL", "MongoDB", "Prisma", "Mongoose", "GraphQL"],
    ],
    [
      $t("skills_category_tests"),
      ["Jest", "Vitest", "Testing Library", "Cypress", "Storybook", "Postman"],
    ],
    [$t("skills_category_devops"), ["Git", "GitHub", "Docker", "Figma"]],
  ]);

  const syncProjectView = () => {
    const hash = window.location.hash;
    if (hash.startsWith(PROJECT_LINK_BASE)) {
      const slug = hash.substring(PROJECT_LINK_BASE.length);
      const projectFromUrl = data.props.projects[$locale].find(
        (p) => p.slug === slug,
      );
      if (projectFromUrl) {
        $selectedProject = projectFromUrl;
      }
    } else {
      $selectedProject = undefined;
    }
  };

  onMount(syncProjectView);
</script>

<svelte:window onhashchange={syncProjectView} />

{#snippet name()}
  <br /><span class="text-purple">Ademir</span>
{/snippet}
{#snippet nexus()}
  <Link
    class="text-white"
    href={`${PROJECT_LINK_BASE}nexus`}
    onclick={(e) => e.stopPropagation()}
  >
    Nexus
  </Link>
{/snippet}
{#snippet simplemotionreact()}
  <Link
    class="text-white"
    href={`${PROJECT_LINK_BASE}simplemotionreact`}
    onclick={(e) => e.stopPropagation()}
  >
    Simple Motion React
  </Link>
{/snippet}

<Starfield />
<LanguageSelector />
<Header />
<main>
  <section
    id={ID_START_SECTION}
    class="section relative flex min-h-svh items-center"
  >
    <div class="relative w-full">
      <h1
        class="tablet:text-start font-orbitron desktop:text-4xl reveal-slide-down mb-4 text-center text-3xl font-semibold duration-700"
        {@attach reveal()}
      >
        <Translation key="start_hello" values={{ name }} />
      </h1>
      <h2
        class="text-gray tablet:text-start desktop:text-xl reveal-slide-up font-orbitron text-center text-lg font-semibold duration-700"
        {@attach reveal()}
      >
        {$t("start_role")}
      </h2>
      <ul
        class="max-tablet:top-[calc(100%+2rem)] max-tablet:center-x tablet:right-0 tablet:flex-col tablet:center-y desktop:fixed desktop:right-8 absolute z-10 flex justify-center gap-4"
      >
        {#each quickContactShortcuts as [label, url, icon] (url)}
          <li class="transition-all hover:scale-110">
            <Link href={url} aria-label={label} newTab>
              <Icon class="size-10" {icon} />
            </Link>
          </li>
        {/each}
      </ul>
    </div>
    <Link
      class={[
        "center-x bg-teal hover:bg-teal/90 font-jetbrains-mono text-void tablet:bottom-10 absolute bottom-8 flex items-center gap-2 rounded-full px-5 py-2 transition-all",
        "before:bg-teal before:-z-1 before:absolute before:inset-0 before:animate-pulse before:rounded-full before:blur-sm before:content-['']",
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
      "tablet:before:-skew-y-2 tablet:before:inset-y-8 desktop:before:-skew-y-1 before:bg-stardust before:shadow-elevation before:-skew-y-4 before:center-x before:-z-1 before:absolute before:inset-y-5 before:w-dvw before:content-['']",
    ]}
  >
    <h2 class="font-orbitron mb-8 text-center text-2xl font-bold">
      {$t("bio_title")}
    </h2>
    <div class="mx-auto max-w-[80ch] space-y-5 leading-7 text-white/90">
      <div
        class="max-tablet:hidden reveal-fade float-end ml-4 duration-700"
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
      class="font-orbitron desktop:text-start desktop:mb-16 mb-8 text-center text-2xl font-bold"
    >
      {$t("skills_title")}
    </h2>
    <div
      class="desktop:gap-y-16 desktop:items-start desktop:flex-row flex flex-col flex-wrap items-center justify-center gap-8"
    >
      {#each categorizedSkills as [category, skills] (category)}
        <div class="max-w-96">
          <h3
            class="after:bg-yellow after:center-x relative mb-12 text-center text-lg font-semibold after:absolute after:-bottom-4 after:h-1 after:w-8 after:rounded-full after:content-['']"
          >
            {category}
          </h3>
          <ul class="flex flex-wrap justify-center gap-4">
            {#each skills as skill (skill)}
              {@const { icon, color } = TAG_META[skill]}
              <li
                class="flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm transition-all hover:scale-110"
              >
                <Icon class="size-5" {icon} {color} />
                <span
                  class="font-jetbrains-mono text-offwhite/90 cursor-default font-bold tracking-wide duration-300 ease-out"
                >
                  {skill}
                </span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>
  <section id={ID_PROJECTS_SECTION} class="section">
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      {$t("projects_title")}
    </h2>
    <ProjectList class="pb-32 pt-8" projects={data.props.projects[$locale]} />
  </section>
  <section id={ID_CONTACT_SECTION} class="section relative min-h-svh pb-44">
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      {$t("contact_title")}
    </h2>
    <div>
      <h3 class="font-inter desktop:text-start text-center font-medium">
        {$t("contact_message")}
      </h3>
      <ul
        class="desktop:items-start mt-24 flex flex-col items-center gap-3 text-lg"
      >
        {#each contactList as [label, url] (url)}
          <li class="reveal-slide-up duration-700" {@attach reveal()}>
            <Link href={url} newTab>{label}</Link>
          </li>
        {/each}
      </ul>
    </div>
    <Link
      class="center-x bg-teal hover:bg-teal/90 font-jetbrains-mono text-void tablet:bottom-16 absolute bottom-12 flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 transition-all"
      variant="none"
      href="#start"
    >
      <Icon class="size-5" icon="fa6-solid:arrow-up" />
      <span>{$t("contact_back_to_top")}</span>
    </Link>
  </section>
</main>

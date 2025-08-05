<script lang="ts">
  import profileImage from "$lib/assets/images/profile.webp?enhanced";
  import Header from "$lib/components/Header.svelte";
  import LanguageSelector from "$lib/components/LanguageSelector.svelte";
  import Link from "$lib/components/Link.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";
  import Starfield from "$lib/components/Starfield.svelte";
  import Translation from "$lib/components/Translation.svelte";
  import {
    CONTACT_INFO,
    ID_BIO_SECTION,
    ID_CONTACT_SECTION,
    ID_PROJECTS_SECTION,
    ID_SKILLS_SECTION,
    ID_START_SECTION,
    PROJECT_LINK_BASE,
    TAG_META,
  } from "$lib/constants";
  import { t } from "$lib/i18n";
  import { activeProject } from "$lib/store";
  import { reveal } from "$lib/utils/reveal";
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
      ["HTML", "CSS", "JavaScript", "TypeScript"],
    ],
    [
      $t("skills_category_frontend"),
      ["React", "Next", "Svelte", "SASS", "TailwindCSS"],
    ],
    [$t("skills_category_backend"), ["Node", "PostgreSQL", "Prisma"]],
    [
      $t("skills_category_tests"),
      ["Jest", "Vitest", "Testing Library", "Storybook", "Postman"],
    ],
    [$t("skills_category_devops"), ["Git", "GitHub", "Docker", "Figma"]],
  ]);

  const syncProjectView = () => {
    const hash = window.location.hash;
    if (hash.startsWith(PROJECT_LINK_BASE)) {
      const slug = hash.substring(PROJECT_LINK_BASE.length);
      const projectFromUrl = data.props.projects.find((p) => p.slug === slug);
      if (projectFromUrl) {
        $activeProject = projectFromUrl;
      }
    } else {
      $activeProject = undefined;
    }
  };

  onMount(syncProjectView);
</script>

<svelte:window onhashchange={syncProjectView} />

{#snippet name()}
  <br /><span class="text-purple">Ademir</span>
{/snippet}

<Starfield />
<LanguageSelector />
<Header />
<main>
  <section
    id={ID_START_SECTION}
    class="tablet:px-12 tablet:py-16 desktop:p-16 relative flex min-h-svh items-center px-6 py-8"
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
      "tablet:px-12 tablet:py-16 desktop:p-16 relative px-6 py-8",
      "tablet:before:-skew-y-2 tablet:before:inset-y-8 desktop:before:-skew-y-1 before:bg-stardust before:shadow-elevation before:-skew-y-4 before:-z-1 before:absolute before:inset-x-0 before:inset-y-5 before:content-['']",
    ]}
  >
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      {$t("bio_title")}
    </h2>
    <div
      class="desktop:flex-row flex flex-col items-center justify-center gap-16"
    >
      <div class="max-w-[60ch] space-y-5 text-center leading-7 text-white/75">
        <p>
          Olá! Sou Ademir, um desenvolvedor full-stack apaixonado por
          transformar ideias em soluções digitais robustas, escaláveis e, acima
          de tudo, acessíveis. Com uma sólida formação em Ciência da Computação,
          minha jornada no desenvolvimento web é guiada pela curiosidade e pelo
          desejo de dominar todo o ciclo de vida de um produto, desde a
          concepção e arquitetura até a implantação em produção. Minha
          experiência abrange tecnologias modernas como React, Next.js e Svelte
          no front-end, e Node.js com Prisma e PostgreSQL no back-end, sempre
          buscando a ferramenta certa para cada desafio.
        </p>
        <p>
          O que realmente me move são os desafios técnicos que surgem ao longo
          do caminho. Em projetos como o <Link
            class="text-white"
            href={`${PROJECT_LINK_BASE}nexus`}
          >
            Nexus
          </Link>, por exemplo, dediquei-me a construir um sistema de
          autenticação robusto e a otimizar a aplicação para garantir uma
          experiência de usuário segura e estável. Não me contento em apenas
          usar bibliotecas; busco entender como funcionam "por baixo dos panos",
          o que me levou a criar a
          <Link
            class="text-white"
            href={`${PROJECT_LINK_BASE}simplemotionreact`}
          >
            Simple Motion React
          </Link>, minha própria biblioteca de animação , e a desenvolver
          projetos com JavaScript puro para fortalecer meu conhecimento
          fundamental. Estou sempre em busca de novos aprendizados e pronto para
          colaborar na criação de tecnologia que tenha um impacto positivo.
        </p>
      </div>
      <div
        class="max-tablet:hidden reveal-fade duration-700"
        {@attach reveal()}
      >
        <enhanced:img
          class="mx-auto max-w-[256px] rounded-full"
          src={profileImage}
          alt={$t("a11y_avatar_alt")}
        />
      </div>
    </div>
  </section>
  <section
    id={ID_SKILLS_SECTION}
    class="tablet:px-12 tablet:py-16 desktop:p-16 px-6 py-8"
  >
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      {$t("skills_title")}
    </h2>
    <div
      class="desktop:gap-y-16 desktop:items-start desktop:flex-row flex flex-col flex-wrap items-center justify-center gap-8"
    >
      {#each categorizedSkills as [category, skills] (category)}
        <div class="max-w-96">
          <h3
            class="after:bg-yellow after:center-x relative mb-8 text-center font-semibold after:absolute after:-bottom-2 after:h-0.5 after:w-8 after:content-['']"
          >
            {category}
          </h3>
          <ul class="flex flex-wrap justify-center gap-4">
            {#each skills as skill (skill)}
              {@const { icon, color } = TAG_META[skill]}
              <li
                class="flex items-center gap-2 rounded-lg bg-white/5 py-2 pl-2 pr-3 text-sm transition-all hover:scale-110"
              >
                <Icon class="size-5" {icon} {color} />
                <span
                  class="font-jetbrains-mono cursor-default font-bold duration-300 ease-out"
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
  <section
    id={ID_PROJECTS_SECTION}
    class="tablet:px-12 tablet:py-16 desktop:p-16 px-6 py-8"
  >
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      {$t("projects_title")}
    </h2>
    <ProjectList class="pb-32 pt-8" projects={data.props.projects} />
  </section>
  <section
    id={ID_CONTACT_SECTION}
    class="tablet:px-12 tablet:py-16 desktop:p-16 relative min-h-dvh px-6 pb-44 pt-8"
  >
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

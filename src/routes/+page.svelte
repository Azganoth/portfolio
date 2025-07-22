<script lang="ts">
  import profileImage from "$lib/assets/images/profile.webp?enhanced";
  import Header from "$lib/components/Header.svelte";
  import Link from "$lib/components/Link.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";
  import Starfield from "$lib/components/Starfield.svelte";
  import {
    CONTACT_INFO,
    PROJECT_LINK_BASE,
    SKILLS,
    TAG_META,
  } from "$lib/constants";
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

<svelte:window on:hashchange={syncProjectView} />

<Starfield />
<Header />
<main>
  <section
    id="start"
    class="tablet:px-12 tablet:py-16 desktop:p-16 relative flex min-h-svh items-center px-6 py-8"
  >
    <div class="relative w-full">
      <h1
        class="tablet:text-start font-orbitron desktop:text-4xl reveal-slide-down mb-4 text-center text-3xl font-semibold duration-700"
        {@attach reveal()}
      >
        Oi, eu sou o <br /><span class="text-purple">Ademir</span>
      </h1>
      <h2
        class="text-gray tablet:text-start desktop:text-xl reveal-slide-up font-orbitron text-center text-lg font-semibold duration-700"
        {@attach reveal()}
      >
        Desenvolvedor FullStack
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
    >
      <span>Currículo</span>
      <Icon icon="fa6-solid:arrow-up-right-from-square" />
    </Link>
  </section>
  <section
    id="bio"
    class={[
      "tablet:px-12 tablet:py-16 desktop:p-16 relative px-6 py-8",
      "tablet:before:-skew-y-2 tablet:before:inset-y-8 desktop:before:-skew-y-1 before:bg-stardust before:shadow-elevation before:-skew-y-4 before:-z-1 before:absolute before:inset-x-0 before:inset-y-5 before:content-['']",
    ]}
  >
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      Sobre mim
    </h2>
    <div class="desktop:grid desktop:grid-cols-2 desktop:gap-16">
      <div>
        <p>
          Sou um desenvolvedor full-stack apaixonado por construir soluções
          robustas e escaláveis. Com uma sólida formação em Ciência da
          Computação, meu projeto mais recente, <strong>Nexus</strong>,
          demonstra minha capacidade de desenvolver uma aplicação completa a
          partir do zero, utilizando um monorepo com <strong>Next.js</strong> no
          frontend e <strong>Node.js/Express</strong> com
          <strong>Prisma</strong>
          no backend. Tenho experiência em todo o ciclo de vida do desenvolvimento,
          desde a concepção e arquitetura até a automação de CI/CD com
          <strong>Docker</strong>
          e <strong>GitHub Actions</strong>, e busco constantemente me desafiar
          para entregar projetos modernos e acessíveis.
        </p>
      </div>
      <div
        class="max-tablet:hidden max-desktop:mt-12 reveal-fade duration-700"
        {@attach reveal()}
      >
        <enhanced:img
          class="rounded-4xl mx-auto"
          src={profileImage}
          alt="Profile"
        />
      </div>
    </div>
  </section>
  <section id="skills" class="tablet:px-12 tablet:py-16 desktop:p-16 px-6 py-8">
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      Habilidades
    </h2>
    <div
      class="desktop:gap-y-16 desktop:items-start desktop:flex-row flex flex-col flex-wrap items-center justify-center gap-8"
    >
      {#each Object.entries(SKILLS) as [category, skills] (category)}
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
                  >{skill}</span
                >
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>
  <section
    id="projects"
    class="tablet:px-12 tablet:py-16 desktop:p-16 px-6 py-8"
  >
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      Projetos
    </h2>
    <ProjectList class="pb-32 pt-8" projects={data.props.projects} />
  </section>
  <section
    id="contact"
    class="tablet:px-12 tablet:py-16 desktop:p-16 relative min-h-dvh px-6 pb-44 pt-8"
  >
    <h2
      class="font-orbitron desktop:text-start mb-8 text-center text-2xl font-bold"
    >
      Contato
    </h2>
    <div>
      <h3 class="font-inter desktop:text-start text-center font-medium">
        Tem interesse? Entre em contato!
      </h3>
      <div
        class="desktop:items-start mt-24 flex flex-col items-center gap-3 text-lg"
      >
        {#each contactList as [label, url] (url)}
          <Link
            class="reveal-slide-up duration-700"
            href={url}
            newTab
            {@attach reveal()}>{label}</Link
          >
        {/each}
      </div>
    </div>
    <Link
      class="center-x bg-teal hover:bg-teal/90 font-jetbrains-mono text-void tablet:bottom-16 absolute bottom-12 flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 transition-all"
      variant="none"
      href="#start"
    >
      <Icon class="size-5" icon="fa6-solid:arrow-up" />
      <span>Voltar ao início</span>
    </Link>
  </section>
</main>

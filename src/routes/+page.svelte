<script lang="ts">
  import profileImage from "$lib/assets/images/profile.webp?enhanced";
  import BackToTop from "$lib/components/BackToTop.svelte";
  import ContentLayout from "$lib/components/ContentLayout.svelte";
  import Header from "$lib/components/Header.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import Link from "$lib/components/Link.svelte";
  import ProjectFilter from "$lib/components/ProjectFilter.svelte";
  import ProjectList from "$lib/components/ProjectList.svelte";
  import SkillSet from "$lib/components/SkillSet.svelte";
  import { CONTACT_INFO } from "$lib/constants";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
</script>

<Header />
<main>
  <ContentLayout id="start" class="relative flex min-h-dvh items-center">
    <div class="relative w-full">
      <h2
        class="max-tablet:text-center font-montserrat-alternates desktop:text-4xl text-3xl font-bold"
      >
        Oi, eu sou o <br /><span class="text-orchid">Ademir</span>
      </h2>
      <h3
        class="text-silver max-tablet:text-center desktop:text-[2.25rem] text-xl font-medium"
      >
        Desenvolvedor FullStack
      </h3>
      <ul
        class="max-tablet:top-[calc(100%+2rem)] max-tablet:center-x tablet:right-0 tablet:flex-col tablet:center-y absolute flex justify-center gap-4"
      >
        <li>
          <Link href={CONTACT_INFO.GitHub} aria-label="GitHub" newTab>
            <Icon class="size-8" name="github" />
          </Link>
        </li>
        <li>
          <Link href={CONTACT_INFO.LinkedIn} aria-label="LinkedIn" newTab>
            <Icon class="size-8" name="linkedin" />
          </Link>
        </li>
        <li>
          <Link href={CONTACT_INFO.Email} aria-label="Email">
            <Icon class="size-8" name="email" />
          </Link>
        </li>
        <li>
          <Link href={CONTACT_INFO.WhatsApp} aria-label="WhatsApp" newTab>
            <Icon class="size-8" name="whatsapp" />
          </Link>
        </li>
      </ul>
    </div>
    <a
      class="push-on-active hover:text-orchid center-x absolute bottom-8"
      href="#bio"
      aria-label="Ir para a biografia"
    >
      <Icon class="tablet:h-8 tablet:w-16 h-6 w-12" name="start" />
    </a>
  </ContentLayout>
  <ContentLayout
    id="bio"
    class="tablet:before:-skew-y-2 tablet:before:inset-y-8 desktop:before:-skew-y-1 before:bg-charcoal before:shadow-elevation before:-skew-y-4 before:-z-1 relative before:absolute before:inset-x-0 before:inset-y-5 before:content-['']"
    title="Sobre mim"
  >
    <div class="desktop:grid desktop:grid-cols-2 desktop:gap-16">
      <div>
        <p>
          Me chamo Ademir José Ferreira Júnior, tenho 25 anos e moro em
          Laguna-SC. Formado em Ciência da Computação pela UNISUL de Tubarão, me
          especializei em desenvolvimento web full-stack. Acredito que a
          evolução deve ser constante e me desafio a entregar projetos cada vez
          melhores.
        </p>
        <p class="mt-4">
          Minha jornada nessa área começou durante a graduação, quando
          desenvolvi um app full-stack em equipe utilizando Angular e Spring
          Boot para a matéria de programação web. Desde então aprofundei meus
          conhecimentos em desenvolvimento web, completei vários cursos na Alura
          e desenvolvi mais projetos explorando diversas outras tecnologias como
          JavaScript, React, Vue e Node.
        </p>
        <div class="mt-4 text-center">
          <Link variant="prime" href="/cv.pdf" newTab>Currículo</Link>
        </div>
      </div>
      <div class="max-tablet:hidden max-desktop:mt-12">
        <enhanced:img
          class="mx-auto rounded-2xl"
          src={profileImage}
          alt="Profile"
        />
      </div>
    </div>
  </ContentLayout>
  <ContentLayout id="skills" title="Habilidades">
    <div
      class="tablet:grid-cols-2 tablet:grid-rows-[repeat(9,80px)] tablet:gap-4 desktop:grid-cols-3 desktop:grid-rows-[repeat(10,48px)] grid gap-8"
    >
      <SkillSet
        class="tablet:col-start-1 tablet:row-start-1"
        name="Linguagens"
        set={["html5", "css3", "javascript", "typescript", "python"]}
      />
      <SkillSet
        class="tablet:col-start-2 tablet:row-start-2 desktop:row-start-3"
        name="Front-end"
        set={[
          "react",
          "vue",
          "svelte",
          "next",
          "astro",
          "sass",
          "tailwindcss",
          "styledcomponents",
        ]}
      />
      <SkillSet
        class="tablet:col-start-2 tablet:row-start-6 desktop:col-start-3 desktop:row-start-2"
        name="Back-end"
        set={["node", "docker", "postgresql", "mongodb", "contentful"]}
      />
      <SkillSet
        class="tablet:col-start-1 tablet:row-start-4 desktop:row-start-6"
        name="Testes"
        set={["jest", "vitest", "testinglibrary", "cypress", "storybook"]}
      />
      <SkillSet
        class="tablet:col-start-1 tablet:row-start-7 desktop:col-start-3 desktop:row-start-7"
        name="Ferramentas"
        set={["git", "github", "githubactions", "figma"]}
      />
    </div>
  </ContentLayout>
  <ContentLayout id="projects" title="Projetos">
    <ProjectFilter class="pb-8" />
    <ProjectList class="pb-32" projects={data.props.projects} />
  </ContentLayout>
  <ContentLayout
    id="contact"
    class="bg-charcoal shadow-elevation min-h-dvh pb-44"
    title="Contato"
  >
    <div>
      <h3
        class="typo-subheading-lg max-desktop:mx-auto max-desktop:text-center max-w-xs"
      >
        Tem interesse? Manda uma mensagem!
      </h3>
      <div class="max-desktop:text-center mt-24">
        <Link variant="prime" href={CONTACT_INFO.Email}>
          ademirj.ferreirajunior@gmail.com
        </Link>
        <div class="desktop:items-start mt-8 flex flex-col items-center gap-2">
          <Link href={CONTACT_INFO.GitHub} newTab>GitHub</Link>
          <Link href={CONTACT_INFO.LinkedIn} newTab>LinkedIn</Link>
          <Link href={CONTACT_INFO.WhatsApp} newTab>Whatsapp</Link>
        </div>
      </div>
    </div>
  </ContentLayout>
</main>
<BackToTop />

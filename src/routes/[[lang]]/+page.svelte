<script lang="ts">
  import { page } from "$app/state";
  import { t, translationStore } from "$lib/features/i18n/translation.svelte";
  import { projectStore } from "$lib/features/projects/store.svelte";
  import AboutMeSection from "$lib/features/home/components/AboutMeSection.svelte";
  import ProjectsSection from "$lib/features/projects/components/ProjectsSection.svelte";
  import SkillsSection from "$lib/features/skills/components/SkillsSection.svelte";
  import ContactSection from "$lib/features/contact/components/ContactSection.svelte";
  import StartSection from "$lib/features/home/components/StartSection.svelte";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();

  // Sync state from Shallow Routing (History API)
  $effect(() => {
    projectStore.selected = page.state.selectedProject;
  });
</script>

<svelte:head>
  <title>
    {projectStore.selected
      ? `${projectStore.selected.title} | Azganoth`
      : t("meta_title")}
  </title>
</svelte:head>

<main>
  <StartSection />
  <AboutMeSection />
  <SkillsSection />
  <ProjectsSection projects={data.props.projects[translationStore.locale]} />
  <ContactSection />
</main>

<script lang="ts">
  import ContactSection from "$lib/features/contact/components/ContactSection.svelte";
  import AboutMeSection from "$lib/features/home/components/AboutMeSection.svelte";
  import StartSection from "$lib/features/home/components/StartSection.svelte";
  import { translationStore } from "$lib/features/i18n/translation.svelte";
  import ProjectsSection from "$lib/features/projects/components/ProjectsSection.svelte";
  import ProjectView from "$lib/features/projects/components/ProjectView.svelte";
  import SkillsSection from "$lib/features/skills/components/SkillsSection.svelte";
  import Header from "$lib/shared/components/Header.svelte";
  import type { LayoutProps } from "./$types";

  let { data, children }: LayoutProps = $props();
</script>

<Header />
<main>
  <StartSection />
  <AboutMeSection />
  <SkillsSection />
  <ProjectsSection projects={data.projects[translationStore.locale]} />
  <ContactSection />
  {@render children()}
</main>
<ProjectView />

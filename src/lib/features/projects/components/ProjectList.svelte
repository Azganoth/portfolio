<script lang="ts">
  import { t } from "$lib/features/i18n/translation";
  import ProjectThumb from "$lib/features/projects/components/ProjectThumb.svelte";
  import type { Project } from "$lib/features/projects/schema";
  import { selectedProject } from "$lib/features/projects/store";
  import { reveal } from "$lib/shared/attachments/reveal.svelte";
  import { flip } from "svelte/animate";
  import type { ClassValue } from "svelte/elements";
  import { fly } from "svelte/transition";

  interface Props {
    class?: ClassValue;
    projects: Project[];
  }

  let { class: className, projects }: Props = $props();

  const INITIAL_COUNT = 7;
  const SHOW_MORE_COUNT = 3;

  let visibleCount = $state(INITIAL_COUNT);

  // Show active project in the list
  $effect(() => {
    if ($selectedProject) {
      const activeIndex = projects.findIndex(
        (p) => p.slug === $selectedProject.slug,
      );
      if (activeIndex !== -1 && activeIndex >= visibleCount) {
        visibleCount = activeIndex + 1;
      }
    }
  });

  const showMore = () => {
    visibleCount = Math.min(visibleCount + SHOW_MORE_COUNT, projects.length);
  };

  const displayedProjects = $derived(projects.slice(0, visibleCount));
</script>

<div class={["flex flex-col items-center", className]}>
  <ul class="flex flex-wrap justify-center gap-16 xl:gap-8">
    {#each displayedProjects as project, i (project.title)}
      <li
        class={[i < INITIAL_COUNT && "reveal-slide-up duration-700"]}
        animate:flip={{ duration: 150 }}
        transition:fly={{ y: 30, duration: 500 }}
        {@attach reveal()}
      >
        <ProjectThumb {project} />
      </li>
    {/each}
  </ul>

  {#if visibleCount < projects.length}
    <button
      type="button"
      class="tap-push mt-16 rounded-full bg-secondary px-5 py-2 font-bold text-background transition-[scale,background-color] hover:bg-secondary/90"
      onclick={showMore}
    >
      {$t("projects_show_more")}
    </button>
  {/if}
</div>

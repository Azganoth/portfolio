<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import ProjectThumb from "$lib/features/projects/components/ProjectThumb.svelte";
  import type { Project } from "$lib/features/projects/schema";
  import { projectStore } from "$lib/features/projects/store.svelte";
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
    if (projectStore.selected) {
      const activeIndex = projects.findIndex(
        (p) => p.slug === projectStore.selected?.slug,
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
  <ul class="flex flex-col gap-24 md:gap-32">
    {#each displayedProjects as project, i (project.title)}
      <li
        class={[
          "group/project-item",
          i < INITIAL_COUNT && "reveal-slide-up duration-700",
        ]}
        animate:flip={{ duration: 150 }}
        transition:fly={{ y: 50, duration: 700 }}
        {@attach reveal()}
      >
        <ProjectThumb {project} />
      </li>
    {/each}
  </ul>

  {#if visibleCount < projects.length}
    <button
      type="button"
      class="tap-push mt-24 rounded-full bg-secondary px-8 py-3 font-mono text-lg font-bold text-background shadow-[0_0_20px_-5px_var(--color-secondary)] transition-[scale,background-color] hover:scale-105 hover:bg-secondary/90 md:mt-32"
      onclick={showMore}
    >
      {t("projects_show_more")}
    </button>
  {/if}
</div>

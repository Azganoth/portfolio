<script lang="ts">
  import ProjectThumb from "$lib/components/ProjectThumb.svelte";
  import type { Project } from "$lib/projects.schema";
  import { reveal } from "$lib/utils/reveal";
  import { flip } from "svelte/animate";
  import type { ClassValue } from "svelte/elements";
  import { fly } from "svelte/transition";

  interface Props {
    class?: ClassValue;
    projects: Project[];
  }

  let { class: className, projects }: Props = $props();

  const INITIAL_COUNT = 6;
  const SHOW_MORE_COUNT = 3;

  let visibleCount = $state(INITIAL_COUNT);

  const showMore = () => {
    visibleCount = Math.min(visibleCount + SHOW_MORE_COUNT, projects.length);
  };

  const displayedProjects = $derived(projects.slice(0, visibleCount));
</script>

<div class={["flex flex-col items-center", className]}>
  <ul class="flex flex-wrap justify-center gap-12" role="region">
    {#each displayedProjects as project, i (project.title)}
      <li
        class={[i < INITIAL_COUNT && "reveal-slide-up duration-700"]}
        role="article"
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
      class="bg-teal hover:bg-teal/90 text-void mt-16 rounded-full px-5 py-2 font-bold transition-all"
      onclick={showMore}
    >
      Mostrar mais
    </button>
  {/if}
</div>

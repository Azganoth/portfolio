<script lang="ts">
  import { projectFilters } from "@app/store";
  import ProjectThumb from "@components/interactive/ProjectThumb.svelte";
  import type { Project } from "@utils/projects";
  import { flip } from "svelte/animate";
  import type { ClassValue } from "svelte/elements";
  import { fade } from "svelte/transition";

  interface Props {
    class?: ClassValue;
    projects: Project[];
  }

  let { class: className, projects }: Props = $props();

  let filteredProjects = $derived(
    $projectFilters.length > 0
      ? projects.filter(({ technologies }) =>
          $projectFilters.every((filter) =>
            (technologies as string[]).includes(filter),
          ),
        )
      : projects,
  );
</script>

{#if filteredProjects.length > 0}
  <ul class={["flex flex-wrap justify-center gap-x-4 gap-y-12", className]}>
    {#each filteredProjects as project (project.name)}
      <li animate:flip={{ duration: 300 }} transition:fade={{ duration: 150 }}>
        <ProjectThumb {project} />
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-silver mb-8 px-8 text-center text-lg">
    No projects developed using the selected stack.
  </p>
{/if}

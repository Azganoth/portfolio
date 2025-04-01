<script lang="ts" module>
  export const PROJECT_LIST_ID = "project-list";
</script>

<script lang="ts">
  import ProjectThumb from "$lib/components/ProjectThumb.svelte";
  import { projectFilters } from "$lib/store";
  import { flip } from "svelte/animate";
  import type { ClassValue } from "svelte/elements";
  import { fade } from "svelte/transition";

  interface Props {
    class?: ClassValue;
    projects: ProjectData[];
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
  <ul
    id={PROJECT_LIST_ID}
    class={["flex flex-wrap justify-center gap-x-4 gap-y-12", className]}
    role="region"
    aria-label="Projetos"
    aria-live="polite"
    aria-atomic="true"
  >
    {#each filteredProjects as project (project.name)}
      <li
        animate:flip={{ duration: 300 }}
        transition:fade={{ duration: 150 }}
        role="article"
      >
        <ProjectThumb {project} />
      </li>
    {/each}
  </ul>
{:else}
  <p
    class="text-silver mb-8 px-8 text-center text-lg"
    role="alert"
    aria-live="assertive"
  >
    Nenhum projeto desenvolvido com o stack selecionado.
  </p>
{/if}

<script lang="ts">
  import ProjectThumb from "$lib/components/ProjectThumb.svelte";
  import type { Project } from "$lib/projects.schema";
  import { flip } from "svelte/animate";
  import type { ClassValue } from "svelte/elements";
  import { fade } from "svelte/transition";

  interface Props {
    class?: ClassValue;
    projects: Project[];
  }

  let { class: className, projects }: Props = $props();
</script>

<ul
  class={["flex flex-wrap justify-center gap-x-4 gap-y-12", className]}
  role="region"
  aria-label="Projetos"
  aria-live="polite"
  aria-atomic="true"
>
  {#each projects as project (project.title)}
    <li
      animate:flip={{ duration: 300 }}
      transition:fade={{ duration: 150 }}
      role="article"
    >
      <ProjectThumb {project} />
    </li>
  {/each}
</ul>

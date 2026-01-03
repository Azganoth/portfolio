<script lang="ts">
  import { projectStore } from "$lib/features/projects/store.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  // On mount/update, set the selected project so the Dialog opens.
  $effect(() => {
    projectStore.selected = data.project;
  });
</script>

<svelte:head>
  <title>{data.project.title} | Azganoth</title>
</svelte:head>

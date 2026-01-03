<script lang="ts">
  import { projectStore } from "$lib/features/projects/store.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  // On mount, set the selected project so the Dialog (in Root Layout) opens.
  // svelte-ignore state_referenced_locally
  projectStore.selected = data.project;
</script>

<svelte:head>
  <title>{data.project.title} | Azganoth</title>
</svelte:head>

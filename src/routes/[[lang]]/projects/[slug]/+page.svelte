<script lang="ts">
  import { projectStore } from "$lib/features/projects/store.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  // On mount, set the selected project
  // svelte-ignore state_referenced_locally
  projectStore.selected = data.project;
</script>

<!-- 
    This is a "deep link" landing page, used to set the store data. 
    The ProjectView dialog is rendered by the root layout.
  -->

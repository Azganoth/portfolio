<script lang="ts">
  import { selectedProject } from "$lib/features/projects/store";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  // On mount, set the selected project
  // svelte-ignore state_referenced_locally
  $selectedProject = data.project;
</script>

<!-- 
    This is a "deep link" landing page, used to set the store data. 
    The ProjectView dialog is rendered by the root layout.
  -->

<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import { projectStore } from "$lib/features/projects/store.svelte";
  import { onMount } from "svelte";

  // Ensure no project is selected when on the root home page
  onMount(() => {
    projectStore.selected = undefined;
  });
</script>

<svelte:head>
  <title>{t("meta_title")}</title>
</svelte:head>

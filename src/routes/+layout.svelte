<script lang="ts">
  import StarfieldBackground from "$lib/shared/components/StarfieldBackground.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<StarfieldBackground />
{@render children()}

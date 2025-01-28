<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    name: string;
    children: Snippet;
  }

  let { name, children }: Props = $props();
</script>

{#snippet htmlTag(closing: boolean)}
  <span class="text-silver/50" aria-hidden="true">
    &lt;{closing ? "/" : ""}{name}&gt;
  </span>
{/snippet}

{@render htmlTag(false)}
{@render children()}
{@render htmlTag(true)}

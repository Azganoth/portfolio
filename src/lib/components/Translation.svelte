<script lang="ts">
  import { t, type TranslationKey } from "$lib/i18n";
  import type { Snippet } from "svelte";

  interface TranslationProps {
    key: TranslationKey;
    values: Record<string, string | Snippet>;
  }

  const { key, values }: TranslationProps = $props();

  // Split the string by any {placeholder}
  const parts = $derived(
    $t(key)
      .split(/({[a-zA-Z0-9_]+})/g)
      .filter(Boolean),
  );
</script>

{#each parts as part, i (`${i}:${part}`)}
  {#if part.startsWith("{") && part.endsWith("}")}
    {@const replacement = values[part.slice(1, -1)]}
    {#if typeof replacement === "function"}
      {@render replacement()}
    {:else}
      {replacement ?? part}
    {/if}
  {:else}
    {part}
  {/if}
{/each}

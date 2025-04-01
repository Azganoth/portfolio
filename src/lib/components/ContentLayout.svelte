<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    children: Snippet;
    id: string;
    title?: string;
  }

  const { class: className, children, id, title }: Props = $props();
</script>

<section
  {id}
  class={["tablet:px-12 tablet:py-16 desktop:p-16 px-6 py-8", className]}
>
  {#if title}
    <h2 class="typo-heading-lg max-tablet:text-center mb-8">{title}</h2>
  {/if}
  {@render children()}
</section>

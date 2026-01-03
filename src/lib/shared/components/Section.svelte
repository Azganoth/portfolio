<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    id: string;
    class?: ClassValue;
    title?: string;
    children?: Snippet;
  }

  const { id, class: className, title, children }: Props = $props();
</script>

<section
  {id}
  class={[
    "mx-auto max-w-360 px-6 py-8 not-first-of-type:mt-16 not-first-of-type:scroll-mt-16 md:px-12 md:py-16 xl:p-16",
    className,
  ]}
>
  {#if title}
    <h2
      class="mb-8 text-center font-display text-2xl font-bold tracking-wide xl:text-start"
    >
      {title}
    </h2>
  {/if}
  {@render children?.()}
</section>

<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  interface Props {
    name: string;
    class?: ClassValue;
    style?: string;
  }

  let { name, class: className, style }: Props = $props();
</script>

<svg
  class={[
    "block h-[1em] w-[1em] text-[var(--icon-color,currentColor)]",
    className,
  ]}
  {style}
  aria-hidden="true"
>
  <use xlink:href={`#icon-${name}`}></use>
</svg>

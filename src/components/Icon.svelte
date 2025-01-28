<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    name: string;
    color?: string;
  }

  let { class: className, name, color }: Props = $props();
</script>

<svg
  class={["block size-[1em] text-[var(--icon-color,currentColor)]", className]}
  {...color && { style: `--icon-color: ${color};` }}
  aria-hidden="true"
>
  <use xlink:href={`#icon-${name}`}></use>
</svg>

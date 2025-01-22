<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    name: string;
  }

  let { class: className, name }: Props = $props();
</script>

<svg class={["block h-[1em] w-[1em]", className]} aria-hidden="true">
  <use xlink:href={`#icon-${name}`}></use>
</svg>

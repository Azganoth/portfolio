<script lang="ts">
  import { TECH_META, type Tech } from "@app/constants";
  import Icon from "@components/Icon.svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    name: string;
    set: Tech[];
  }

  const { class: className, name, set }: Props = $props();
</script>

{#snippet tag(tagName: string, closing: "open" | "close")}
  <span class="text-silver/50" aria-hidden="true">
    &lt;{closing === "close" ? "/" : ""}{tagName}&gt;
  </span>
{/snippet}

<article class={["typo-code flex flex-col", className]}>
  {@render tag("h3", "open")}
  <h3 class="pl-6 text-lg">{name}</h3>
  {@render tag("h3", "close")}

  {@render tag("ul", "open")}
  <ul>
    {#each set as tech (tech)}
      {@const { label, color } = TECH_META[tech]}
      <li class="flex items-center gap-1 pl-6">
        {@render tag("li", "open")}
        <Icon class="size-5" name={tech} {color} />
        <span>{label}</span>
        {@render tag("li", "close")}
      </li>
    {/each}
  </ul>
  {@render tag("ul", "close")}
</article>

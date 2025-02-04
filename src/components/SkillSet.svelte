<script lang="ts">
  import { TECH_META, type Tech } from "@app/constants";
  import Icon from "@components/Icon.svelte";
  import Tag from "@components/Tag.svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    name: string;
    set: Tech[];
  }

  const { class: className, name, set }: Props = $props();
</script>

<article class={["typo-code flex flex-col", className]}>
  <Tag name="h3">
    <h3 class="pl-6 text-lg">{name}</h3>
  </Tag>
  <Tag name="ul">
    <ul>
      {#each set as tech (tech)}
        {@const { label, color } = TECH_META[tech]}
        <li class="flex items-center gap-1 pl-6">
          <Tag name="li">
            <Icon class="size-5" name={tech} {color} />
            <span>{label}</span>
          </Tag>
        </li>
      {/each}
    </ul>
  </Tag>
</article>

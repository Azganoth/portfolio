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
    <h3 class="code-indent">{name}</h3>
  </Tag>
  <Tag name="ul">
    <ul>
      {#each set as tech (tech)}
        {@const { label, color } = TECH_META[tech]}
        <li class="code-indent flex items-center">
          <Tag name="li">
            <span>{label}</span>
            <Icon class="ml-1.5 mr-0.5 text-lg" name={tech} {color} />
          </Tag>
        </li>
      {/each}
    </ul>
  </Tag>
</article>

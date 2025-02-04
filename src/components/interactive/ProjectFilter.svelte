<script lang="ts">
  import { TECH_META, TECH_ORDER, type Tech } from "@app/constants";
  import { projectFilters } from "@app/store";
  import Icon from "@components/Icon.svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
  }

  let { class: className }: Props = $props();

  const filterOptions = TECH_ORDER as Tech[];

  let selected = $state<string[]>([]);
  $effect(() => {
    $projectFilters = selected;
  });
</script>

<form class={["max-desktop:justify-center flex flex-wrap gap-2", className]}>
  <fieldset class="contents">
    <legend class="sr-only">Filter projects by technology</legend>
    <input
      class={[
        "bg-charcoal font-montserrat-alternates size-10 cursor-pointer rounded-lg p-2",
        selected.length === 0 ? "text-offwhite" : "text-silver hover:text-teal",
      ]}
      type="reset"
      value="All"
      title="Show all projects"
      aria-label="Show all projects"
    />
    {#each filterOptions as tech (tech)}
      {@const label = `${TECH_META[tech].label} filter`}
      {@const labelId = `filter-${tech}-label`}
      <label
        class="bg-charcoal has-focus-visible:outline-2 text-silver/50 has-checked:text-offwhite hover:text-teal has-focus-visible:outline-offwhite cursor-pointer rounded-lg p-2"
        title={label}
      >
        <input
          class="sr-only"
          type="checkbox"
          bind:group={selected}
          value={tech}
          aria-labelledby={labelId}
        />
        <span id={labelId} class="sr-only">{label}</span>
        <Icon class="size-6" name={tech} />
      </label>
    {/each}
  </fieldset>
</form>

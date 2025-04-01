<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { PROJECT_LIST_ID } from "$lib/components/ProjectList.svelte";
  import { TECH_META, TECH_ORDER, type Tech } from "$lib/constants";
  import { projectFilters } from "$lib/store";
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

  function reset() {
    selected = [];
  }

  let filtersReset = $state<HTMLButtonElement>();
  let filters = $state<HTMLInputElement[]>([]);

  function handleResetKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowRight" || event.key === "d") {
      event.preventDefault();
      const firstFilter = filters.at(0);
      firstFilter?.focus();
    }
  }

  function handleFilterKeydown(event: KeyboardEvent) {
    const currentInput = event.currentTarget as HTMLInputElement;
    const currentIndex = filters.indexOf(currentInput);

    switch (event.key) {
      case "ArrowLeft":
      case "a": {
        event.preventDefault();
        const prevFilter = filters[currentIndex - 1];
        if (prevFilter) {
          prevFilter.focus();
        } else {
          filtersReset?.focus();
        }
        break;
      }
      case "ArrowRight":
      case "d": {
        event.preventDefault();
        const nextFilter = filters[currentIndex + 1];
        if (nextFilter) {
          nextFilter.focus();
        } else {
          filtersReset?.focus();
        }
        break;
      }
    }
  }
</script>

<div class={["max-desktop:justify-center flex flex-wrap gap-2", className]}>
  <fieldset class="contents">
    <legend class="sr-only">Filtrar por tecnologia.</legend>
    <button
      bind:this={filtersReset}
      class={[
        "bg-charcoal font-montserrat-alternates cursor-pointer rounded-lg px-3 py-2",
        selected.length === 0 ? "text-offwhite" : "text-silver hover:text-teal",
      ]}
      type="button"
      aria-label="Mostrar todos os projetos"
      aria-pressed={selected.length === 0}
      aria-controls={PROJECT_LIST_ID}
      aria-keyshortcuts="ArrowRight d ArrowLeft a Space Enter"
      onkeydown={handleResetKeydown}
      onclick={() => {
        reset();
      }}
    >
      Todos
    </button>

    {#each filterOptions as tech, i (tech)}
      <label
        class="bg-charcoal has-focus-visible:outline-2 text-silver/50 has-checked:text-offwhite hover:text-teal has-focus-visible:outline-offwhite cursor-pointer rounded-lg p-2"
      >
        <input
          bind:this={filters[i]}
          bind:group={selected}
          type="checkbox"
          class="sr-only"
          value={tech}
          tabindex="-1"
          onkeydown={handleFilterKeydown}
        />
        <span class="sr-only">Filtro de {TECH_META[tech].label}</span>
        <Icon class="size-6" name={tech} />
      </label>
    {/each}
  </fieldset>
</div>

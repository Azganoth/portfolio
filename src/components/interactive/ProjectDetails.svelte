<script lang="ts">
  import { TECH_META } from "@app/constants";
  import { activeProject } from "@app/store";
  import Icon from "@components/Icon.svelte";
  import Link from "@components/Link.svelte";
  import clickaway from "@utils/actions/clickaway.svelte";
  import Carousel from "./Carousel.svelte";

  let open = $state(false);
  $effect(() => {
    open = !!$activeProject;
  });

  let dialog = $state<HTMLDialogElement>();
  $effect(() => {
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
      // Reset the global store when the dialog is closed
      $activeProject = undefined;
    }
  });
</script>

<dialog
  bind:this={dialog}
  class="tablet:max-h-[896px] tablet:max-w-[640px] desktop:max-h-[540px] desktop:max-w-[1300px] bg-charcoal text-offwhite shadow-elevation z-20 m-auto max-h-[612px] max-w-[320px] overflow-hidden rounded-2xl backdrop:bg-black/90"
  use:clickaway={{ ignoreSelf: true }}
  onclickaway={() => {
    open = false;
  }}
>
  {#if $activeProject}
    <button
      class="push-on-active hover:text-orchid absolute right-4 top-4 z-10 select-none text-2xl"
      type="button"
      onclick={() => {
        open = false;
      }}
      aria-label="Fechar detalhes do projeto"
    >
      <Icon class="drop-shadow-contrast" name="close" />
    </button>
    <div class="desktop:grid-cols-[auto_1fr] grid">
      <Carousel slides={$activeProject.previews} />
      <article
        class="desktop:px-8 desktop:pb-8 flex flex-col gap-4 overflow-auto px-6 pb-6 pt-4"
      >
        <h3 class="typo-heading-md max-desktop:text-center">
          {$activeProject.title}
        </h3>
        <p class="mb-auto">{$activeProject.description}</p>
        <ul
          class="flex flex-wrap justify-center gap-2"
          aria-label="Tecnologias usadas"
        >
          {#each $activeProject.technologies as tech (tech)}
            {@const { label, color } = TECH_META[tech]}
            <li
              class="desktop:flex desktop:items-center desktop:gap-2 desktop:rounded-2xl desktop:bg-slate desktop:px-3 desktop:py-2"
              title={label}
            >
              <Icon class="desktop:text-lg text-xl" name={tech} {color} />
              <span
                class="max-desktop:sr-only font-cascadia-code text-silver cursor-default font-bold"
              >
                {label}
              </span>
            </li>
          {/each}
        </ul>
        <div class="flex items-center justify-between">
          <Link
            class="text-2xl"
            href={$activeProject.repository}
            aria-label="Abrir repositório do projeto"
            newTab
          >
            <Icon name="github" />
          </Link>
          <Link
            class="flex items-center"
            href={$activeProject.website}
            aria-label="Abrir o site em uma nova aba"
            newTab
          >
            Visitar
            <Icon class="text-xl" name="redirect" />
          </Link>
        </div>
      </article>
    </div>
  {/if}
</dialog>

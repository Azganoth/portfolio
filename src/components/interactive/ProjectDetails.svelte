<script lang="ts">
  import { TECH_STACK_LABELS } from "@app/constants";
  import { activeProject } from "@app/store";
  import Icon from "@components/Icon.svelte";
  import Link from "@components/Link.svelte";
  import clickaway from "@utils/actions/clickaway.svelte";
  import Carousel from "./Carousel.svelte";

  let open = $state(false);
  activeProject.subscribe((value) => {
    open = !!value;
  });

  let dialog = $state<HTMLDialogElement>();
  $effect(() => {
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
      // Reset the global store when the dialog is closed
      activeProject.set(undefined);
    }
  });
</script>

<dialog
  bind:this={dialog}
  class="z-20 max-h-[612px] max-w-[320px] overflow-hidden rounded-2xl bg-charcoal text-white shadow-elevation-high backdrop:bg-[rgba(0,0,0,0.9)] md:max-h-[896px] md:max-w-[640px] lg:grid lg:max-h-[540px] lg:max-w-[1300px]"
  use:clickaway={{ ignoreSelf: true }}
  onclickaway={() => {
    open = false;
  }}
>
  {#if $activeProject}
    <button
      class="push-down absolute right-4 top-4 z-10 select-none text-2xl hover:text-orchid"
      type="button"
      onclick={() => {
        open = false;
      }}
      aria-label="Fechar detalhes do projeto"
    >
      <Icon class="drop-shadow-stand-out" name="close" />
    </button>
    <div class="grid lg:grid-cols-[auto_1fr]">
      <Carousel slides={$activeProject.previews} />
      <article
        class="flex flex-col gap-4 overflow-auto px-6 pb-6 pt-4 lg:px-8 lg:pb-8"
      >
        <h3 class="heading-md max-lg:text-center">{$activeProject.title}</h3>
        <p class="mb-auto">{$activeProject.description}</p>
        <ul
          class="flex flex-wrap justify-center gap-2"
          aria-label="Tecnologias usadas"
        >
          {#each $activeProject.technologies as tech (tech)}
            <li
              class="lg:flex lg:items-center lg:gap-2 lg:rounded-2xl lg:bg-slate lg:px-3 lg:py-2"
              title={TECH_STACK_LABELS[tech]}
            >
              <Icon class="text-xl lg:text-lg" name={tech} />
              <span
                class="cursor-default font-code font-bold text-gray max-lg:sr-only"
              >
                {TECH_STACK_LABELS[tech]}
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
            <Icon name="github2" />
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

<script lang="ts" module>
  export const PROJECT_DETAILS_ID = "project-modal";
</script>

<script lang="ts">
  import { TECH_META } from "@app/constants";
  import { activeProject } from "@app/store";
  import Icon from "@components/Icon.svelte";
  import Carousel from "@components/interactive/Carousel.svelte";
  import Link from "@components/Link.svelte";
  import clickaway from "@utils/actions/clickaway.svelte";

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
  id={PROJECT_DETAILS_ID}
  class="tablet:max-w-[640px] desktop:max-w-[1300px] bg-obsidian text-offwhite shadow-elevation desktop:h-[520px] starting:opacity-0 starting:scale-90 tablet:h-[calc(100dvh-8rem)] z-20 m-auto h-[calc(100dvh-4rem)] max-w-[320px] overflow-hidden rounded-2xl transition-[opacity,scale] duration-300 backdrop:bg-black/90"
  use:clickaway={{ ignoreSelf: true }}
  onclickaway={() => {
    open = false;
  }}
>
  {#if $activeProject}
    <button
      class="push-on-active hover:text-orchid absolute right-4 top-4 z-10 select-none"
      type="button"
      onclick={() => {
        open = false;
      }}
      aria-label="Fechar detalhes do projeto"
    >
      <Icon class="drop-shadow-contrast size-8" name="close" />
    </button>
    <div
      class="desktop:grid-cols-[auto_1fr] max-desktop:grid-rows-[auto_1fr] grid h-full"
    >
      <Carousel id="project" slides={$activeProject.previews} />
      <article
        class="desktop:px-8 desktop:pb-8 tablet:grid-cols-[auto_1fr_auto] tablet:grid-rows-[auto_1fr_auto] grid grid-cols-2 grid-rows-[auto_1fr_auto_auto] gap-4 overflow-auto px-6 pb-6 pt-4"
      >
        <h3 class="typo-heading-md max-desktop:text-center col-span-full">
          {$activeProject.title}
        </h3>
        <article class="**:[p]:mb-4 col-span-full mb-auto h-full overflow-auto">
          {@html $activeProject.description}
        </article>
        <div
          class="max-tablet:row-start-3 max-tablet:col-span-full tablet:col-start-2 tablet:place-self-start place-items-center"
        >
          <ul
            class="bg-charcoal flex flex-wrap justify-center gap-2 rounded-xl p-2"
            aria-label="Tecnologias usadas"
          >
            {#each $activeProject.technologies as tech (tech)}
              {@const { label, color } = TECH_META[tech]}
              <li title={label}>
                <Icon class="size-6" name={tech} {color} />
              </li>
            {/each}
          </ul>
        </div>
        <Link
          class="tablet:row-start-3 self-center"
          href={$activeProject.repository}
          aria-label="Abrir repositório do projeto"
          newTab
        >
          <Icon class="size-8" name="github" />
        </Link>
        <Link
          class="flex self-center justify-self-end"
          href={$activeProject.website}
          aria-label="Abrir o site em uma nova aba"
          newTab
        >
          Visitar
          <Icon class="size-6" name="redirect" />
        </Link>
      </article>
    </div>
  {/if}
</dialog>

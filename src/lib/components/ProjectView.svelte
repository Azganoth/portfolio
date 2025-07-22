<script lang="ts" module>
  export const PROJECT_DETAILS_ID = "project-modal";
</script>

<script lang="ts">
  import Link from "$lib/components/Link.svelte";
  import ProjectViewPreviews from "$lib/components/ProjectViewPreviews.svelte";
  import { PROJECT_LINK_BASE, TAG_META } from "$lib/constants";
  import { activeProject } from "$lib/store";
  import { clickaway } from "$lib/utils/clickaway";
  import Icon from "@iconify/svelte";

  let open = $derived(!!$activeProject);
  let dialog = $state<HTMLDialogElement>();
  $effect(() => {
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
      // Reset the global store when the dialog is closed
      $activeProject = undefined;
      if (window.location.hash.startsWith(PROJECT_LINK_BASE)) {
        history.pushState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    }
  });
</script>

<dialog
  bind:this={dialog}
  id={PROJECT_DETAILS_ID}
  class="tablet:max-w-[720px] desktop:max-w-[1200px] bg-void text-offwhite shadow-elevation starting:opacity-0 starting:scale-90 tablet:h-[calc(100dvh-8rem)] z-20 m-auto h-[calc(100dvh-4rem)] max-w-[calc(100dvw-4rem)] overflow-hidden rounded-2xl transition-[opacity,scale] duration-300 backdrop:bg-black/70 backdrop:backdrop-blur-lg"
  onclickaway={() => {
    open = false;
  }}
  {@attach clickaway({ ignoreSelf: true })}
>
  {#if $activeProject}
    <button
      class="push-on-active hover:text-purple absolute right-4 top-4 z-10"
      type="button"
      onclick={() => {
        open = false;
      }}
      aria-label="Fechar detalhes do projeto"
    >
      <Icon class="drop-shadow-contrast size-8" icon="fa6-solid:xmark" />
    </button>
    <div class="desktop:flex-row flex h-full flex-col">
      <ProjectViewPreviews previews={$activeProject.previews} />
      <article
        class="desktop:px-8 desktop:pb-8 flex flex-col gap-4 overflow-auto px-6 pb-6 pt-4"
      >
        <h3
          class="font-orbitron desktop:text-start text-center text-xl font-bold"
        >
          {$activeProject.title}
        </h3>
        <article
          class="prose prose-invert prose-neutral mb-auto h-full overflow-auto"
        >
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html $activeProject.description}
        </article>
        <div class="tablet:flex-row tablet:justify-between flex flex-col gap-4">
          <ul
            class="bg-stardust flex flex-wrap justify-center gap-2 self-center rounded-xl p-2"
            aria-label="Tecnologias usadas"
          >
            {#each $activeProject.tags as tag (tag)}
              {@const { icon, color } = TAG_META[tag]}
              <li title={tag}>
                <Icon class="size-6" {icon} {color} />
              </li>
            {/each}
          </ul>
          <div class="flex justify-center gap-4">
            {#if $activeProject.repository}
              <Link
                class="text-gray flex items-center gap-2"
                href={$activeProject.repository}
                aria-label="Abrir repositório do projeto"
                newTab
              >
                Código
                <Icon icon="fa6-solid:code" />
              </Link>
            {/if}
            {#if $activeProject.website}
              <Link
                class="text-gray flex items-center gap-2"
                href={$activeProject.website}
                aria-label="Abrir o site em uma nova aba"
                newTab
              >
                Visitar
                <Icon icon="fa6-solid:arrow-up-right-from-square" />
              </Link>
            {/if}
          </div>
        </div>
      </article>
    </div>
  {/if}
</dialog>

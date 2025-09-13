<script lang="ts">
  import { pushState } from "$app/navigation";
  import { t } from "$lib/features/i18n/translation";
  import { composeProjectLinkId } from "$lib/features/projects/components/ProjectThumb.svelte";
  import ProjectViewPreviews from "$lib/features/projects/components/ProjectViewPreviews.svelte";
  import { selectedProject } from "$lib/features/projects/store";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import {
    ID_PROJECT_DETAILS,
    ID_PROJECT_TITLE,
    PROJECT_LINK_BASE,
    TAG_META,
  } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  let open = $derived(!!$selectedProject);
  let dialog = $state<HTMLDialogElement>();

  $effect(() => {
    if (open) {
      dialog?.showModal();
      try {
        pushState(`${PROJECT_LINK_BASE}${$selectedProject!.slug}`, {});
      } catch {
        // Ignore 'router not initialized' error when loading from a deeplink
      }
    } else {
      dialog?.close();
      // Reset the global store and url on close
      const projectSlug = $selectedProject?.slug;
      $selectedProject = undefined;
      if (window.location.hash.startsWith(PROJECT_LINK_BASE)) {
        pushState("", {});
      }

      // Focus project thumb link on close
      if (projectSlug) {
        document
          .querySelector(`#${composeProjectLinkId(projectSlug)}`)
          ?.scrollIntoView({
            block: "center",
          });
      }
    }
  });
</script>

<dialog
  bind:this={dialog}
  id={ID_PROJECT_DETAILS}
  class="tablet:max-w-[720px] desktop:max-w-[1200px] bg-void text-offwhite shadow-elevation starting:opacity-0 starting:scale-90 tablet:h-[calc(100dvh-8rem)] z-20 m-auto h-[calc(100dvh-4rem)] max-w-[calc(100dvw-4rem)] overflow-hidden rounded-2xl transition-[opacity,scale] duration-300 backdrop:bg-black/70 backdrop:backdrop-blur-lg"
  onclose={() => {
    open = false;
  }}
  onclickaway={() => {
    open = false;
  }}
  aria-labelledby={ID_PROJECT_TITLE}
  {@attach clickaway({ ignoreSelf: true })}
>
  {#if $selectedProject}
    <button
      class="push-on-active hover:text-purple absolute right-4 top-4 z-10"
      type="button"
      onclick={() => {
        open = false;
      }}
      aria-label={$t("a11y_close_project_details")}
    >
      <Icon class="drop-shadow-contrast size-8" icon="fa6-solid:xmark" />
    </button>
    <div class="desktop:flex-row flex h-full flex-col">
      <ProjectViewPreviews previews={$selectedProject.previews} />
      <article
        class="desktop:px-8 desktop:pb-8 flex flex-col gap-4 overflow-auto px-6 pb-6 pt-4"
      >
        <h3
          id={ID_PROJECT_TITLE}
          class="font-orbitron desktop:text-start text-center text-xl font-bold"
        >
          {$selectedProject.title}
        </h3>
        <article
          class="prose prose-invert prose-neutral mb-auto h-full overflow-auto"
        >
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html $selectedProject.description}
        </article>
        <div class="tablet:flex-row tablet:justify-between flex flex-col gap-4">
          <ul
            class="bg-stardust flex flex-wrap justify-center gap-2 self-center rounded-xl p-2"
            aria-label={$t("a11y_used_technology")}
          >
            {#each $selectedProject.tags as tag (tag)}
              {@const { icon, color } = TAG_META[tag]}
              <li aria-label={tag}>
                <Icon class="size-6" {icon} {color} />
              </li>
            {/each}
          </ul>
          <div class="flex justify-center gap-4">
            {#if $selectedProject.repository}
              <Link
                class="text-gray flex items-center gap-2"
                href={$selectedProject.repository}
                aria-label={$t("a11y_go_to_repository")}
                newTab
              >
                {$t("projects_code")}
                <Icon icon="fa6-solid:code" />
              </Link>
            {/if}
            {#if $selectedProject.website}
              <Link
                class="text-gray flex items-center gap-2"
                href={$selectedProject.website}
                aria-label={$t("a11y_go_to_website")}
                newTab
              >
                {$t("projects_visit")}
                <Icon icon="fa6-solid:arrow-up-right-from-square" />
              </Link>
            {/if}
          </div>
        </div>
      </article>
    </div>
  {/if}
</dialog>

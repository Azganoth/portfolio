<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { t } from "$lib/features/i18n/translation";
  import { getLocalizedPath } from "$lib/features/i18n/utils";
  import { composeProjectLinkId } from "$lib/features/projects/components/ProjectThumb.svelte";
  import ProjectViewPreviews from "$lib/features/projects/components/ProjectViewPreviews.svelte";
  import { selectedProject } from "$lib/features/projects/store";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import { focustrap } from "$lib/shared/attachments/focustrap.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS, ID_PROJECT_TITLE } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";
  import { tick } from "svelte";

  let open = $derived(!!$selectedProject);
  let dialog = $state<HTMLDialogElement>();

  function handleClose() {
    if ($page.state.selectedProject) {
      history.back();
    } else if ($page.route.id?.includes("projects/[slug]")) {
      const homeHref = getLocalizedPath("/");
      goto(homeHref);
    } else {
      $selectedProject = undefined;
    }
  }

  let lastSelectedProjectSlug = $state<string>();
  $effect(() => {
    if ($selectedProject) {
      lastSelectedProjectSlug = $selectedProject.slug;
    }
  });

  function restoreFocus() {
    if (!lastSelectedProjectSlug) return;

    const thumbLink = document.querySelector<HTMLElement>(
      `#${composeProjectLinkId(lastSelectedProjectSlug)}`,
    );
    if (thumbLink) {
      thumbLink.scrollIntoView({ block: "center" });
      thumbLink.focus({ preventScroll: true });
      lastSelectedProjectSlug = undefined;
    }
  }

  afterNavigate(() => {
    if (!open) {
      restoreFocus();
    }
  });

  $effect(() => {
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
      tick().then(restoreFocus);
    }
  });
</script>

<dialog
  bind:this={dialog}
  id={ID_PROJECT_DETAILS}
  class="bg-background text-foreground shadow-elevation starting:opacity-0 starting:scale-90 z-20 m-auto h-[calc(100dvh-4rem)] max-w-[calc(100dvw-4rem)] overflow-hidden rounded-2xl transition-[opacity,scale] duration-300 backdrop:bg-black/70 backdrop:backdrop-blur-lg md:h-[calc(100dvh-8rem)] md:max-w-[720px] xl:max-w-[1200px]"
  onclose={handleClose}
  onclickaway={handleClose}
  aria-labelledby={ID_PROJECT_TITLE}
  {@attach clickaway({ ignoreSelf: true, enabled: open })}
  {@attach focustrap()}
>
  {#if $selectedProject}
    <div class="flex h-full flex-col">
      <article
        class="flex flex-col gap-4 overflow-auto px-6 pb-6 pt-4 xl:px-8 xl:pb-8"
      >
        <header class="flex flex-col items-center gap-4 md:flex-row">
          <h1
            id={ID_PROJECT_TITLE}
            class="font-orbitron text-center text-xl font-bold tracking-wide xl:text-start"
          >
            {$selectedProject.title}
          </h1>
          <div
            class="bg-muted text-muted-foreground text-gray w-fit rounded-lg px-3 py-1 text-sm font-bold tracking-wide"
          >
            {$selectedProject.year} • {$selectedProject.category.toUpperCase()}
          </div>
          <button
            class="tap-push hover:text-primary absolute right-4 top-4 z-10 transition-[scale,color]"
            type="button"
            onclick={handleClose}
            aria-label={$t("a11y_close_project_details")}
          >
            <Icon class="drop-shadow-contrast size-8" icon="fa6-solid:xmark" />
          </button>
        </header>
        <article class="markdown mb-auto h-full max-w-none overflow-auto pr-4">
          {#if $selectedProject.previews.length > 0}
            <div class="mx-auto mb-8 mt-2 w-fit md:float-end md:mx-8 md:mb-0">
              <ProjectViewPreviews previews={$selectedProject.previews} />
            </div>
          {/if}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html $selectedProject.description}
        </article>
        <div class="mt-4 flex justify-center gap-6 md:justify-end">
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
      </article>
    </div>
  {/if}
</dialog>

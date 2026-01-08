<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { t } from "$lib/features/i18n/translation.svelte";
  import { composeProjectLinkId } from "$lib/features/projects/components/ProjectThumb.svelte";
  import ProjectViewPreviews from "$lib/features/projects/components/ProjectViewPreviews.svelte";
  import type { Project } from "$lib/features/projects/schema";
  import { projectStore } from "$lib/features/projects/store.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS, ID_PROJECT_TITLE } from "$lib/shared/constants";
  import { getLocalizedPath } from "$lib/shared/utils";
  import Icon from "@iconify/svelte";
  import { tick } from "svelte";

  let open = $derived(!!projectStore.selected);
  let dialog = $state<HTMLDialogElement>();

  const handleClose = async () => {
    if (
      page.state.selectedProject ||
      page.route.id?.includes("projects/[slug]")
    ) {
      // Home page handles deselecting the project
      await goto(getLocalizedPath("/"), { noScroll: true });
    } else {
      projectStore.selected = undefined;
    }
  };

  // Sync state from Shallow Routing (History API) & Navigation
  $effect(() => {
    if (page.state.selectedProject) {
      projectStore.selected = page.state.selectedProject;
    } else if (!page.route.id?.includes("projects/[slug]")) {
      // If no shallow state, close dialog UNLESS we are on a deep link route.
      // Check if route.id is defined to avoid clearing during hydration mismatches.
      projectStore.selected = undefined;
    }
  });

  // Keep alive for transitions
  let lastProject = $state<Project>();
  $effect(() => {
    if (projectStore.selected) {
      lastProject = projectStore.selected;
    }
  });

  $effect(() => {
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();

      // Restore focus
      tick().then(() => {
        const slug = lastProject?.slug;
        if (!slug) return;

        // Use requestAnimationFrame to ensure browser layout/scroll is settled
        requestAnimationFrame(() => {
          const thumbLink = document.querySelector<HTMLElement>(
            `#${composeProjectLinkId(slug)}`,
          );
          thumbLink?.scrollIntoView({ block: "center", behavior: "smooth" });
          thumbLink?.focus({ preventScroll: true });
        });
      });
    }
  });
</script>

<dialog
  bind:this={dialog}
  id={ID_PROJECT_DETAILS}
  class="m-auto h-[calc(100dvh-4rem)] max-w-[calc(100dvw-4rem)] overflow-hidden rounded-2xl bg-background text-foreground shadow-elevation transition-[scale,opacity,display,overlay] transition-discrete duration-400 ease-fluid not-open:scale-90 not-open:opacity-0 backdrop:bg-black/70 backdrop:backdrop-blur-lg md:h-[calc(100dvh-8rem)] md:max-w-[calc(100dvw-8rem)] xl:max-w-300 starting:scale-90 starting:opacity-0"
  onclose={handleClose}
  onclick={(e) => {
    if (e.target === dialog) {
      handleClose();
    }
  }}
  aria-labelledby={ID_PROJECT_TITLE}
>
  <div class="relative flex h-full flex-col overflow-y-auto">
    <button
      class="absolute top-4 right-4 z-10 text-muted-foreground transition-all hover:scale-110 hover:text-foreground active:scale-95"
      type="button"
      onclick={handleClose}
      aria-label={t("a11y_close_project_details")}
    >
      <Icon class="size-8 drop-shadow-contrast" icon="fa6-solid:xmark" />
    </button>

    {#if lastProject}
      <article class="flex flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
        <!-- Header -->
        <header class="flex flex-col gap-4">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h1
              id={ID_PROJECT_TITLE}
              class="font-display text-3xl font-bold tracking-tight md:text-4xl"
            >
              {lastProject.title}
            </h1>
            <span
              class="text-sm font-bold tracking-wider text-muted-foreground uppercase"
            >
              {lastProject.year} • {lastProject.category}
            </span>
          </div>
          {#if lastProject.tags.length > 0}
            <div class="flex flex-wrap gap-2">
              {#each lastProject.tags as tag (tag)}
                <span
                  class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {tag}
                </span>
              {/each}
            </div>
          {/if}
          <p class="text-lg leading-relaxed text-muted-foreground">
            {lastProject.summary}
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            {#if lastProject.repository}
              <Link
                class="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted/80 hover:text-foreground"
                href={lastProject.repository}
                aria-label={t("a11y_go_to_repository")}
                newTab
                variant="none"
              >
                <Icon icon="fa6-solid:code" class="size-4" />
                {t("projects_code")}
              </Link>
            {/if}
            {#if lastProject.website}
              <Link
                class="text-primary-foreground hover:text-primary-foreground flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold hover:bg-primary/90"
                href={lastProject.website}
                aria-label={t("a11y_go_to_website")}
                newTab
                variant="none"
              >
                <Icon
                  icon="fa6-solid:arrow-up-right-from-square"
                  class="size-4"
                />
                {t("projects_visit")}
              </Link>
            {/if}
          </div>
        </header>

        <hr class="border-muted" />

        <!-- Description -->
        <div class="markdown">
          {#if lastProject.previews.length > 0}
            <div class="mx-auto mt-2 mb-8 w-fit md:float-end md:mx-8 md:mb-0">
              <ProjectViewPreviews previews={lastProject.previews} />
            </div>
          {/if}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html lastProject.description}
        </div>
      </article>
    {/if}
  </div>
</dialog>

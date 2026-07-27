<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { t } from "$lib/features/i18n/translation.svelte";
  import type { Project } from "$lib/features/projects/schema";
  import { projectStore } from "$lib/features/projects/store.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import {
    ID_IMAGE_GALLERY,
    ID_PROJECT_DETAILS,
    ID_PROJECT_TITLE,
  } from "$lib/shared/constants";
  import {
    IconClose,
    IconCode,
    IconExpand,
    IconExternalLink,
    IconGitHub,
  } from "$lib/shared/icons";
  import { getCurrentLocalizedPath } from "$lib/shared/utils/currentPath.svelte";

  let open = $derived(!!projectStore.selected);
  let dialog = $state<HTMLDialogElement>();
  let scrollContainer = $state<HTMLDivElement>();

  const handleClose = async () => {
    if (
      page.state.selectedProject ||
      page.route.id?.includes("projects/[slug]")
    ) {
      // Home page handles deselecting the project
      await goto(getCurrentLocalizedPath("/"), { noScroll: true });
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
      if (!dialog) return;

      scrollContainer?.scrollTo({ top: 0 });

      dialog.showModal();
    } else {
      dialog?.close();
    }
  });
</script>

<dialog
  bind:this={dialog}
  id={ID_PROJECT_DETAILS}
  class="m-auto h-[calc(100dvh-2rem)] w-[calc(100dvw-2rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/15 bg-background text-foreground shadow-elevation transition-[scale,opacity,display,overlay] transition-discrete duration-400 ease-fluid not-open:scale-95 not-open:opacity-0 backdrop:bg-black/75 backdrop:backdrop-blur-lg md:h-[calc(100dvh-4rem)] md:w-[calc(100dvw-4rem)] starting:scale-95 starting:opacity-0"
  onclose={handleClose}
  onclick={(e) => {
    if (e.target === dialog) {
      handleClose();
    }
  }}
  aria-modal="true"
  aria-labelledby={ID_PROJECT_TITLE}
>
  <div class="relative h-full overflow-hidden">
    <button
      class="absolute top-4 right-4 z-30 icon-button bg-background/85 shadow-lg backdrop-blur-md hover:bg-muted"
      type="button"
      onclick={handleClose}
      aria-label={t("a11y_close_project_details")}
    >
      <IconClose class="size-5" />
    </button>

    <div bind:this={scrollContainer} class="h-full overflow-y-auto">
      {#if lastProject}
        <article
          class="mx-auto flex w-full max-w-6xl flex-col px-6 py-8 md:px-10 md:py-12 lg:px-14"
        >
          <header
            class="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center"
          >
            <div class="flex min-w-0 flex-1 flex-col pr-12 lg:pr-0">
              <span
                class="mb-4 font-mono text-sm font-bold tracking-widest text-primary uppercase"
              >
                {lastProject.year} · {lastProject.category}
              </span>
              <h1
                id={ID_PROJECT_TITLE}
                class="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance"
              >
                {lastProject.title}
              </h1>
              <p
                class="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
              >
                {lastProject.summary}
              </p>

              <div class="mt-7 flex flex-wrap gap-3">
                {#if lastProject.website}
                  <Link
                    class="group flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-mono text-sm font-bold text-background shadow-glow transition-colors hover:bg-primary/85"
                    href={lastProject.website}
                    aria-label={t("a11y_go_to_website")}
                    newTab
                    variant="none"
                  >
                    {t("projects_visit")}
                    <IconExternalLink class="size-3.5" />
                  </Link>
                {/if}
                {#if lastProject.repository}
                  <Link
                    class={[
                      "group flex items-center gap-2 rounded-xl border px-5 py-3 font-mono text-sm font-bold transition-colors",
                      lastProject.website
                        ? "border-white/20 bg-white/5 text-foreground hover:border-white/35 hover:bg-white/10"
                        : "border-primary bg-primary text-background shadow-glow hover:bg-primary/85",
                    ]}
                    href={lastProject.repository}
                    aria-label={t("a11y_go_to_repository")}
                    newTab
                    variant="none"
                  >
                    <IconGitHub class="size-4" />
                    {t("projects_code")}
                  </Link>
                {/if}
              </div>

              {#if lastProject.tags.length > 0}
                <ul
                  class="mt-8 flex flex-wrap gap-2"
                  aria-label={t("a11y_used_technology")}
                >
                  {#each lastProject.tags as tag (tag)}
                    <li
                      class="rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-muted-foreground"
                    >
                      {tag}
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>

            <div class="w-full lg:max-w-md lg:flex-1">
              {#if lastProject.previews.length > 0}
                {@const previews = lastProject.previews}
                <button
                  type="button"
                  class="group relative aspect-video max-h-90 w-full overflow-hidden rounded-2xl border border-white/15 bg-muted/40 shadow-2xl transition-colors hover:border-primary/60"
                  onclick={() => {
                    if (lastProject) {
                      projectStore.openLightbox(previews, lastProject.title);
                    }
                  }}
                  aria-label={t("a11y_open_image_gallery_named", {
                    title: lastProject.title,
                  })}
                  aria-haspopup="dialog"
                  aria-controls={ID_IMAGE_GALLERY}
                >
                  <img
                    class="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    src={previews[0].url}
                    width={previews[0].width}
                    height={previews[0].height}
                    alt={t("a11y_project_preview", {
                      title: lastProject.title,
                    })}
                  />
                  <div
                    class="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/65 px-3 py-2 text-foreground backdrop-blur-md"
                  >
                    <span class="font-mono text-xs font-bold">
                      1/{previews.length}
                    </span>
                    <IconExpand class="size-3.5" />
                  </div>
                </button>
              {:else}
                <div
                  class="relative grid aspect-video w-full place-items-center overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-primary/12 via-muted/40 to-secondary/10"
                >
                  <div
                    class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[32px_32px]"
                  ></div>
                  <div class="relative flex flex-col items-center gap-4">
                    <IconCode class="size-10 text-primary" />
                    <span
                      class="font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase"
                    >
                      {lastProject.title}
                    </span>
                  </div>
                </div>
              {/if}
            </div>
          </header>

          <div class="markdown mx-auto w-full max-w-3xl py-10 md:py-14">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html lastProject.description}
          </div>
        </article>
      {/if}
    </div>
  </div>
</dialog>

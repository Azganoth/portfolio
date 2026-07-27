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
  class="m-auto h-dvh max-h-none w-dvw max-w-none overflow-hidden bg-background text-foreground shadow-elevation transition-[scale,opacity,display,overlay] transition-discrete duration-400 ease-fluid not-open:scale-95 not-open:opacity-0 backdrop:bg-black/75 backdrop:backdrop-blur-lg md:h-[calc(100dvh-4rem)] md:w-[calc(100dvw-4rem)] md:max-w-4xl md:rounded-3xl md:border md:border-white/15 starting:scale-95 starting:opacity-0"
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
          class="mx-auto flex w-full max-w-4xl flex-col px-6 py-8 md:px-10 md:py-12"
        >
          <header class="flex flex-col border-b border-white/10 pb-8">
            <div class="flex min-w-0 flex-col pr-12 lg:pr-0">
              <span
                class="mb-4 font-mono text-sm font-bold tracking-widest text-primary uppercase"
              >
                {lastProject.year} · {lastProject.category}
              </span>
              <h1
                id={ID_PROJECT_TITLE}
                class="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl"
              >
                {lastProject.title}
              </h1>
            </div>
            <p class="mt-5 text-lg leading-relaxed text-muted-foreground">
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

            {#if lastProject.previews.length > 0}
              {@const previews = lastProject.previews}
              {@const title = lastProject.title}
              {@const m = String(previews.length)}
              <!-- A launcher rather than the hero image: the card that opened this dialog already showed the first preview at full width, and the gallery owns the full-size presentation. -->
              <ul class="mt-7 flex gap-3 overflow-x-auto pb-1">
                {#each previews as preview, i (preview.url)}
                  <li class="shrink-0">
                    <button
                      type="button"
                      class="group relative block h-20 w-32 overflow-hidden rounded-xl border border-white/15 bg-muted/40 transition-colors hover:border-primary/60 md:h-24 md:w-40"
                      onclick={() => {
                        projectStore.openLightbox(previews, title, i);
                      }}
                      aria-label={t("a11y_project_preview_n_of_m", {
                        title,
                        n: String(i + 1),
                        m,
                      })}
                      aria-haspopup="dialog"
                      aria-controls={ID_IMAGE_GALLERY}
                    >
                      <img
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        src={preview.url}
                        width={preview.width}
                        height={preview.height}
                        alt=""
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                      <span
                        class="absolute inset-0 grid place-items-center bg-black/45 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <IconExpand class="size-4" />
                      </span>
                    </button>
                  </li>
                {/each}
              </ul>
            {/if}
          </header>

          <div class="markdown py-10 md:py-14">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html lastProject.description}
          </div>

          {#if lastProject.tags.length > 0}
            <footer class="border-t border-white/10 pt-8">
              <ul
                class="flex flex-wrap gap-2"
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
            </footer>
          {/if}
        </article>
      {/if}
    </div>
  </div>
</dialog>

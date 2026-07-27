<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import {
    projectStore,
    type PreviewsLightbox,
  } from "$lib/features/projects/store.svelte";
  import { ID_IMAGE_GALLERY } from "$lib/shared/constants";
  import {
    IconChevronLeft,
    IconChevronRight,
    IconClose,
  } from "$lib/shared/icons";

  let open = $derived(!!projectStore.lightbox);
  let dialog = $state<HTMLDialogElement>();

  let lastLightbox = $state<PreviewsLightbox>();
  $effect(() => {
    if (projectStore.lightbox) {
      lastLightbox = projectStore.lightbox;
    }
  });

  const previews = $derived(lastLightbox?.previews ?? []);
  const index = $derived(lastLightbox?.index ?? 0);
  const paged = $derived(previews.length > 1);

  const handleClose = () => {
    projectStore.closeLightbox();
  };

  /* Scroller */

  let scroller = $state<HTMLElement>();
  let slides = $state<HTMLElement[]>([]);

  const scrollToCurrent = () => {
    slides[projectStore.lightbox?.index ?? 0]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const jump = (target: number) => {
    projectStore.toImage(target);
    scrollToCurrent();
  };
  const next = () => {
    projectStore.nextImage();
    scrollToCurrent();
  };
  const previous = () => {
    projectStore.prevImage();
    scrollToCurrent();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!open || !paged) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  $effect(() => {
    if (open) {
      dialog?.showModal();
      if (scroller) scroller.scrollLeft = 0;
    } else {
      dialog?.close();
    }
  });

  $effect(() => {
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !projectStore.lightbox) continue;

          const found = slides.indexOf(entry.target as HTMLElement);
          if (found !== -1) projectStore.lightbox.index = found;
        }
      },
      { root: scroller, threshold: 0.6 },
    );

    slides.forEach((slide) => {
      if (slide) observer.observe(slide);
    });
    return () => observer.disconnect();
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<dialog
  bind:this={dialog}
  id={ID_IMAGE_GALLERY}
  class="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 transition-[opacity,scale,display,overlay] transition-discrete duration-300 ease-fluid not-open:scale-98 not-open:opacity-0 backdrop:bg-black/80 backdrop:backdrop-blur-lg starting:scale-98 starting:opacity-0"
  aria-modal="true"
  aria-label={t("a11y_image_gallery")}
  onclose={handleClose}
>
  {#if lastLightbox}
    <div class="flex h-full flex-col">
      <header
        class="flex h-14 shrink-0 items-center justify-between gap-4 px-4 md:h-16 md:px-6"
      >
        <p class="min-w-0 truncate font-display font-semibold text-foreground">
          {lastLightbox.title ?? t("a11y_image_gallery")}
        </p>
        <div class="flex shrink-0 items-center gap-4">
          {#if paged}
            <span
              class="font-mono text-sm tracking-wider text-muted-foreground tabular-nums"
            >
              {index + 1} / {previews.length}
            </span>
          {/if}
          <button
            class="icon-button"
            type="button"
            onclick={handleClose}
            aria-label={t("a11y_close_image_gallery")}
          >
            <IconClose class="size-5" />
          </button>
        </div>
      </header>

      <div class="relative min-h-0 flex-1">
        <div
          bind:this={scroller}
          class="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain"
          role="group"
          aria-roledescription="carousel"
          aria-label={lastLightbox.title
            ? t("a11y_project_preview", { title: lastLightbox.title })
            : t("a11y_image_gallery")}
        >
          {#each previews as slide, i (slide.url)}
            {@const title = lastLightbox.title}
            {@const n = String(i + 1)}
            {@const m = String(previews.length)}
            <!-- Clicking the space around the image dismisses. Keyboard users reach the same action through Escape and the close button, so this is a redundant affordance rather than the only route out. -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <figure
              id={`slide-${i}`}
              bind:this={slides[i]}
              class="flex h-full w-full shrink-0 snap-center items-center justify-center px-4 md:px-16"
              role="group"
              aria-roledescription="slide"
              aria-label={t("a11y_slide_n_of_m", { n, m })}
              onclick={(event) => {
                if (event.target === event.currentTarget) handleClose();
              }}
            >
              <img
                class="max-h-full max-w-full rounded-2xl object-contain"
                src={slide.url}
                alt={title
                  ? t("a11y_project_preview_n_of_m", { title, n, m })
                  : t("a11y_slide_n_of_m", { n, m })}
                width={slide.width}
                height={slide.height}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </figure>
          {/each}
        </div>

        {#if paged}
          <button
            class="absolute top-1/2 left-2 icon-button h-20 w-11 -translate-y-1/2 backdrop-blur-md max-md:hidden"
            type="button"
            onclick={previous}
            aria-label={t("a11y_previous_image")}
          >
            <IconChevronLeft class="size-6" />
          </button>
          <button
            class="absolute top-1/2 right-2 icon-button h-20 w-11 -translate-y-1/2 backdrop-blur-md max-md:hidden"
            type="button"
            onclick={next}
            aria-label={t("a11y_next_image")}
          >
            <IconChevronRight class="size-6" />
          </button>
        {/if}
      </div>

      {#if paged}
        <div class="flex shrink-0 justify-center gap-2 overflow-x-auto p-4">
          {#each previews as slide, i (slide.url)}
            <button
              class={[
                "h-12 w-20 shrink-0 overflow-hidden rounded-lg outline-offset-2 transition-all md:h-14 md:w-24",
                i === index
                  ? "opacity-100 outline-2 outline-primary"
                  : "opacity-50 outline-1 outline-white/15 hover:opacity-80",
              ]}
              type="button"
              onclick={() => jump(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={t("a11y_jump_to_image", { name: String(i + 1) })}
              aria-controls={`slide-${i}`}
            >
              <img
                class="h-full w-full object-cover"
                src={slide.url}
                alt=""
                loading="lazy"
              />
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</dialog>

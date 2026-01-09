<script lang="ts">
  import { t } from "$lib/features/i18n/translation.svelte";
  import {
    projectStore,
    type PreviewsLightbox,
  } from "$lib/features/projects/store.svelte";
  import { ID_IMAGE_GALLERY } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  let open = $derived(!!projectStore.lightbox);
  let dialog = $state<HTMLDialogElement>();

  const handleClose = async () => {
    projectStore.closeLightbox();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      projectStore.prevImage();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      projectStore.nextImage();
    }
  };

  let lastLightbox = $state<PreviewsLightbox>();
  $effect(() => {
    if (projectStore.lightbox) {
      lastLightbox = projectStore.lightbox;
    }
  });

  $effect(() => {
    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  });

  /* Scroller */

  let scroller = $state<HTMLElement>();
  let scrollerSlides = $state<HTMLElement[]>([]);
  let isProgrammaticScroll = false;
  let scrollTimeout: NodeJS.Timeout;

  $effect(() => {
    if (!lastLightbox) return;

    // Guard against observer loops
    isProgrammaticScroll = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 500);

    scrollerSlides[lastLightbox.index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  });

  $effect(() => {
    if (!scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll) return;

        entries.forEach((entry) => {
          if (!projectStore.lightbox) return;

          if (entry.isIntersecting) {
            const index = scrollerSlides.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              projectStore.lightbox.index = index;
            }
          }
        });
      },
      { root: scroller, threshold: 0.6 },
    );

    scrollerSlides.forEach((slide) => observer.observe(slide));
    return () => scrollerSlides.forEach((slide) => observer.unobserve(slide));
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<dialog
  bind:this={dialog}
  id={ID_IMAGE_GALLERY}
  class="m-auto max-h-[calc(100dvh-4rem)] max-w-[calc(100dvw-4rem)] overflow-x-hidden bg-transparent transition-all transition-discrete duration-400 ease-fluid not-open:scale-90 not-open:opacity-0 backdrop:bg-black/70 backdrop:backdrop-blur-lg starting:scale-90 starting:opacity-0"
  aria-modal="true"
  onclose={handleClose}
  onclick={(e) => {
    if (e.target === dialog) {
      handleClose();
    }
  }}
>
  <div class="relative py-18">
    <button
      class="absolute top-4 right-4 z-10 text-muted-foreground transition-all hover:scale-110 hover:text-foreground active:scale-95"
      type="button"
      onclick={handleClose}
      aria-label={t("a11y_close_image_gallery")}
    >
      <Icon class="size-10 drop-shadow-contrast" icon="fa6-solid:xmark" />
    </button>

    {#if lastLightbox}
      <div
        bind:this={scroller}
        class="flex flex-col gap-16 overflow-y-auto md:grid md:max-w-180 md:snap-x md:snap-mandatory md:auto-cols-[100%] md:grid-flow-col md:items-center md:gap-4 md:overflow-x-auto md:overscroll-contain"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        {#each lastLightbox.previews as slide, i (slide.url)}
          <figure
            id={`slide-${i}`}
            class="shrink-0 select-none md:snap-center"
            bind:this={scrollerSlides[i]}
            role="group"
            aria-roledescription="slide"
            aria-label={t("a11y_slide_n_of_m", {
              n: String(i + 1),
              m: String(lastLightbox.previews.length),
            })}
          >
            <img
              class="rounded-2xl bg-muted"
              src={slide.url}
              alt=""
              width={slide.width}
              height={slide.height}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </figure>
        {/each}
      </div>

      <div
        class="absolute bottom-0 center-x flex items-center overflow-hidden max-md:hidden"
      >
        <button
          class="transition-all ease-snappy hover:scale-110 hover:text-primary active:scale-95"
          onclick={projectStore.prevImage}
          aria-label={t("a11y_previous_image")}
        >
          <Icon class="size-12" icon="fa6-solid:chevron-left" />
        </button>
        <div class="flex">
          {#each { length: lastLightbox.previews.length }, i}
            <button
              class="block transition-all ease-snappy hover:scale-110 hover:text-primary active:scale-95"
              type="button"
              onclick={() => projectStore.toImage(i)}
              aria-current={i === lastLightbox.index ? "step" : undefined}
              aria-label={t("a11y_jump_to_image", { name: String(i + 1) })}
              aria-controls={`slide-${i}`}
            >
              <Icon
                class="size-10"
                icon={i === lastLightbox.index
                  ? "octicon:dot-fill-16"
                  : "octicon:dot-16"}
              />
            </button>
          {/each}
        </div>
        <button
          class="transition-all ease-snappy hover:scale-110 hover:text-primary active:scale-95"
          onclick={projectStore.nextImage}
          aria-label={t("a11y_next_image")}
        >
          <Icon class="size-12" icon="fa6-solid:chevron-right" />
        </button>
      </div>
    {/if}
  </div>
</dialog>

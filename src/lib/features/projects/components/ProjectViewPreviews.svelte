<script lang="ts">
  import { t } from "$lib/features/i18n/translation";
  import type { ProjectPreview } from "$lib/features/projects/schema";
  import { clickaway } from "$lib/shared/attachments/clickaway.svelte";
  import { focustrap } from "$lib/shared/attachments/focustrap.svelte";
  import { ID_IMAGE_GALLERY } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";

  interface Props {
    previews: ProjectPreview[];
  }

  let { previews }: Props = $props();

  let galleryOpenButton = $state<HTMLButtonElement>();
  let galleryOpen = $state(false);

  let scroller = $state<HTMLElement>();
  let scrollerSlides = $state<HTMLElement[]>([]);

  let currentSlide = $state(0);
  $effect(() => {
    if (!galleryOpen || !scroller) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSlide = scrollerSlides.indexOf(entry.target as HTMLElement);
          }
        });
      },
      { root: scroller, threshold: 0.6 },
    );

    scrollerSlides.forEach((slide) => observer.observe(slide));
    return () => scrollerSlides.forEach((slide) => observer.unobserve(slide));
  });

  function goToSlide(index: number) {
    scrollerSlides[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (galleryOpen && event.key === "Escape") {
      event.preventDefault();
      galleryOpen = false;
    }
  };
</script>

<svelte:window onkeydown={handleKeydown} />

<button
  bind:this={galleryOpenButton}
  type="button"
  class="border-muted hover:scale-102 group relative max-w-[400px] overflow-hidden rounded-2xl border transition-all"
  onclick={() => {
    galleryOpen = true;
  }}
  aria-label={$t("a11y_open_image_gallery")}
  aria-haspopup="dialog"
  aria-controls={ID_IMAGE_GALLERY}
>
  <img
    class="aspect-4/3 max-h-52 w-auto object-cover"
    src={previews[0].url}
    width={previews[0].width}
    height={previews[0].height}
    alt=""
  />
  <div
    class="absolute bottom-1 right-1 flex items-center gap-2 rounded-xl bg-black/50 p-2"
  >
    <span class="font-jetbrains-mono text-xs font-bold">
      1/{previews.length}
    </span>
    <Icon class="size-4" icon="fa6-solid:expand" />
  </div>
</button>

<div
  id={ID_IMAGE_GALLERY}
  class={[
    "absolute inset-0 z-50 flex bg-black/20 backdrop-blur-md transition-all",
    !galleryOpen && "invisible opacity-0",
  ]}
  inert={!galleryOpen}
  role="dialog"
  aria-modal="true"
  {@attach focustrap({ active: galleryOpen })}
>
  <div
    class="relative m-auto p-4 py-12 max-md:h-full"
    onclickaway={() => {
      galleryOpen = false;
    }}
    {@attach clickaway({
      ignoreSelf: true,
      ignoreNodes: [galleryOpenButton],
    })}
  >
    <button
      class="tap-push hover:text-primary absolute right-4 top-4 transition-colors md:top-2"
      type="button"
      onclick={() => {
        galleryOpen = false;
      }}
      aria-label={$t("a11y_close_image_gallery")}
    >
      <Icon class="size-8" icon="fa6-solid:xmark" />
    </button>

    <div class="space-y-16! h-full overflow-y-auto md:hidden">
      {#each previews as slide (slide.url)}
        <img class="rounded-2xl" src={slide.url} alt="" />
      {/each}
    </div>
    <div
      bind:this={scroller}
      class="grid max-w-[720px] snap-x snap-mandatory auto-cols-[100%] grid-flow-col items-center gap-4 overflow-x-auto overscroll-contain max-md:hidden"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {#each previews as slide, i (slide.url)}
        <figure
          id={`slide-${i}`}
          class="select-none snap-center"
          bind:this={scrollerSlides[i]}
          role="region"
        >
          <img class="rounded-2xl" src={slide.url} alt="" />
        </figure>
      {/each}
    </div>

    <div class="center-x absolute bottom-0 flex items-center max-md:hidden">
      <button
        class="tap-push hover:text-primary transition-colors"
        onclick={() =>
          goToSlide((currentSlide - 1 + previews.length) % previews.length)}
        aria-label={$t("a11y_previous_image")}
      >
        <Icon class="size-10" icon="fa6-solid:chevron-left" />
      </button>
      <div class="flex" role="tablist">
        {#each { length: previews.length }, i}
          <button
            class="tap-push hover:text-primary block transition-colors"
            type="button"
            role="tab"
            onclick={() => goToSlide(i)}
            aria-selected={i === currentSlide}
            aria-label={$t("a11y_jump_to_image", { name: String(i) })}
            aria-controls={`slide-${i}`}
          >
            <Icon
              class="size-8"
              icon={i === currentSlide
                ? "octicon:dot-fill-16"
                : "octicon:dot-16"}
            />
          </button>
        {/each}
      </div>
      <button
        class="tap-push hover:text-primary transition-colors"
        onclick={() => goToSlide((currentSlide + 1) % previews.length)}
        aria-label={$t("a11y_next_image")}
      >
        <Icon class="size-10" icon="fa6-solid:chevron-right" />
      </button>
    </div>
  </div>
</div>

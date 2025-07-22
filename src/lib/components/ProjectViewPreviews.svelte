<script lang="ts">
  import type { ProjectPreview } from "$lib/utils/previews";
  import Icon from "@iconify/svelte";

  interface Props {
    previews: ProjectPreview[];
  }

  let { previews }: Props = $props();

  let galleryExpanded = $state(false);

  let scroller = $state<HTMLElement>();
  let scrollerSlides = $state<HTMLElement[]>([]);

  let currentSlide = $state(0);
  $effect(() => {
    if (!galleryExpanded || !scroller) return;

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
</script>

<div class="desktop:pt-0 m-auto px-3 pt-3">
  <button
    type="button"
    class="border-stardust hover:scale-102 group relative max-w-[400px] overflow-hidden rounded-2xl border transition-all"
    onclick={() => {
      galleryExpanded = true;
    }}
    aria-label="Abrir galeria de imagens"
  >
    <img
      class="aspect-4/3 object-cover"
      src={previews[0].url}
      width={previews[0].width}
      height={previews[0].height}
      alt=""
    />
    <div
      class="absolute bottom-1 right-1 flex items-center gap-2 rounded-xl bg-black/50 p-2"
    >
      <span class="font-jetbrains-mono text-xs font-bold"
        >1/{previews.length}</span
      >
      <Icon class="size-4" icon="fa6-solid:expand" />
    </div>
  </button>
</div>

<div
  class={[
    "absolute inset-0 z-50 flex bg-black/20 backdrop-blur-md transition-all",
    !galleryExpanded && "invisible opacity-0",
  ]}
  inert={!galleryExpanded}
>
  <div class="max-tablet:h-full relative m-auto p-4 py-12">
    <button
      class="push-on-active hover:text-purple tablet:top-2 absolute right-4 top-4 transition-colors"
      type="button"
      onclick={() => {
        galleryExpanded = false;
      }}
      aria-label="Fechar galeria"
    >
      <Icon class="size-8" icon="fa6-solid:xmark" />
    </button>

    <div class="tablet:hidden h-full space-y-4 overflow-y-auto">
      {#each previews as slide (slide.url)}
        <img class="rounded-2xl" src={slide.url} alt="" />
      {/each}
    </div>
    <div
      bind:this={scroller}
      class="max-tablet:hidden grid max-w-[720px] snap-x snap-mandatory auto-cols-[100%] grid-flow-col items-center gap-4 overflow-x-auto overscroll-contain"
      aria-roledescription="carousel"
    >
      {#each previews as slide, i (slide.url)}
        <figure class="snap-center" bind:this={scrollerSlides[i]}>
          <img class="rounded-2xl" src={slide.url} alt="" />
        </figure>
      {/each}
    </div>

    <div class="max-tablet:hidden center-x absolute bottom-0 flex items-center">
      <button
        class="push-on-active hover:text-purple transition-colors"
        onclick={() =>
          goToSlide((currentSlide - 1 + previews.length) % previews.length)}
      >
        <Icon class="size-10" icon="fa6-solid:chevron-left" />
      </button>
      <div class="flex" role="tablist">
        {#each { length: previews.length }, i}
          <button
            class="push-on-active hover:text-purple block transition-colors"
            type="button"
            role="tab"
            aria-selected={i === currentSlide}
            onclick={() => goToSlide(i)}
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
        class="push-on-active hover:text-purple transition-colors"
        onclick={() => goToSlide((currentSlide + 1) % previews.length)}
      >
        <Icon class="size-10" icon="fa6-solid:chevron-right" />
      </button>
    </div>
  </div>
</div>

<script lang="ts">
  import Icon from "@components/Icon.svelte";
  import swipe from "@utils/actions/swipe.svelte";

  interface Props {
    id: string;
    slides: { src: string; width: number; height: number }[];
  }

  let { id, slides }: Props = $props();

  let activeSlide = $state(0);
  let lastSlide = $derived(slides.length - 1);

  function previousSlide() {
    activeSlide = activeSlide === 0 ? lastSlide : activeSlide - 1;
  }

  function nextSlide() {
    activeSlide = activeSlide === lastSlide ? 0 : activeSlide + 1;
  }

  let swipeOffset = $state(0);
  let slideOffset = $derived.by(() => {
    let offset;
    if (activeSlide > 0) {
      offset = `-${100 * activeSlide}%`;
    }

    if (
      (swipeOffset > 0 && activeSlide > 0) ||
      (swipeOffset < 0 && activeSlide < lastSlide)
    ) {
      offset = offset
        ? `calc(${offset} + ${swipeOffset}px)`
        : `${swipeOffset}px`;
    }

    return offset;
  });
</script>

<section
  class="group/carousel aspect-4/3 text-offwhite relative max-h-[540px] overflow-hidden"
  aria-label="Carousel"
  aria-roledescription="carousel"
  use:swipe={{ threshold: 0 }}
  onswipemove={(event) => {
    swipeOffset = event.detail.coordsDiff.x;
  }}
  onswipeend={(event) => {
    swipeOffset = 0;
    if (Math.abs(event.detail.coordsDiff.x) >= 80) {
      if (event.detail.direction === "left") {
        previousSlide();
      } else if (event.detail.direction === "right") {
        nextSlide();
      }
    }
  }}
>
  <div
    id="{id}-slides-container"
    class="translate-x-(--slide-offset) flex duration-300 ease-out motion-safe:transition-[translate]"
    style="--slide-offset: {slideOffset}"
  >
    {#each slides as slide, i (slide.src)}
      <img
        src={slide.src}
        alt="Slide {i + 1} of {slides.length}"
        width={slide.width}
        height={slide.height}
        aria-hidden={i !== activeSlide}
      />
    {/each}
  </div>

  <button
    class="push-on-active hover:text-orchid center-y absolute left-0 select-none"
    type="button"
    aria-label="Slide anterior"
    aria-controls="{id}-slides-container"
    onclick={() => {
      previousSlide();
    }}
  >
    <Icon class="drop-shadow-contrast size-12" name="slide-left" />
  </button>
  <button
    class="push-on-active hover:text-orchid center-y absolute right-0 select-none"
    type="button"
    aria-label="Próximo slide"
    aria-controls="{id}-slides-container"
    onclick={() => {
      nextSlide();
    }}
  >
    <Icon class="drop-shadow-contrast size-12" name="slide-right" />
  </button>

  <div
    class="center-x absolute bottom-4 flex gap-2"
    role="tablist"
    aria-label="Navegação de slides"
  >
    {#each { length: slides.length }, i}
      <button
        class="push-on-active hover:text-orchid block select-none"
        type="button"
        role="tab"
        aria-label="Slide {i + 1}"
        aria-selected={i === activeSlide}
        aria-controls="{id}-slides-container"
        onclick={() => {
          activeSlide = i;
        }}
      >
        <Icon
          class="drop-shadow-contrast tablet:size-5 size-4"
          name={i === activeSlide ? "slide-dot-selected" : "slide-dot"}
        />
      </button>
    {/each}
  </div>
</section>

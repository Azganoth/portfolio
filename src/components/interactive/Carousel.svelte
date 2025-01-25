<script lang="ts">
  import Icon from "@components/Icon.svelte";
  import swipe from "@utils/actions/swipe.svelte";

  interface Props {
    slides: { src: string; width: number; height: number }[];
  }

  let { slides }: Props = $props();

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
  class="group/carousel relative aspect-[4/3] max-h-[540px] overflow-hidden text-white"
  aria-label="Carousel"
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
    class="flex translate-x-[--slide-offset] transition-transform duration-300 ease-out"
    style="--slide-offset: {slideOffset}"
  >
    {#each slides as slide, i (slide.src)}
      <img
        src={slide.src}
        alt={`Slide ${activeSlide + 1} of ${+1}`}
        width={slide.width}
        height={slide.height}
        aria-hidden={i !== activeSlide}
      />
    {/each}
  </div>
  <button
    class="push-down absolute left-0 top-1/2 -translate-y-1/2 select-none text-3xl hover:text-orchid"
    type="button"
    onclick={() => {
      previousSlide();
    }}
    aria-label="Previous slide"
  >
    <Icon name="slide-left" class="drop-shadow-stand-out" />
  </button>
  <button
    class="push-down absolute right-0 top-1/2 z-10 -translate-y-1/2 select-none text-3xl hover:text-orchid"
    type="button"
    onclick={() => {
      nextSlide();
    }}
    aria-label="Next slide"
  >
    <Icon name="slide-right" class="drop-shadow-stand-out" />
  </button>
  <ul class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
    {#each { length: slides.length }, i}
      <li class="md:text-lg">
        <button
          class="push-down block select-none hover:text-orchid"
          type="button"
          onclick={() => {
            activeSlide = i;
          }}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === activeSlide}
        >
          <Icon
            name={i === activeSlide ? "slide-dot-selected" : "slide-dot"}
            class="drop-shadow-stand-out"
          />
        </button>
      </li>
    {/each}
  </ul>
</section>

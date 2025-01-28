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
  class="group/carousel aspect-4/3 text-offwhite relative max-h-[540px] overflow-hidden"
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
    class="translate-x-(--slide-offset) flex duration-300 ease-out motion-safe:transition-[translate]"
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
    class="push-on-active hover:text-orchid absolute left-0 top-1/2 -translate-y-1/2 select-none"
    type="button"
    onclick={() => {
      previousSlide();
    }}
    aria-label="Previous slide"
  >
    <Icon class="drop-shadow-contrast size-12" name="slide-left" />
  </button>
  <button
    class="push-on-active hover:text-orchid absolute right-0 top-1/2 z-10 -translate-y-1/2 select-none"
    type="button"
    onclick={() => {
      nextSlide();
    }}
    aria-label="Next slide"
  >
    <Icon class="drop-shadow-contrast size-12" name="slide-right" />
  </button>
  <ul class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
    {#each { length: slides.length }, i}
      <li>
        <button
          class="push-on-active hover:text-orchid block select-none"
          type="button"
          onclick={() => {
            activeSlide = i;
          }}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === activeSlide}
        >
          <Icon
            class="drop-shadow-contrast tablet:size-5 size-4"
            name={i === activeSlide ? "slide-dot-selected" : "slide-dot"}
          />
        </button>
      </li>
    {/each}
  </ul>
</section>

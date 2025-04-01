<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { onMount } from "svelte";

  interface Props {
    id: string;
    slides: { src: string; width: number; height: number }[];
  }

  let { id, slides }: Props = $props();

  let scroller = $state<HTMLElement>();
  let scrollerSlides = $state<HTMLElement[]>([]);

  // Keep track of the current slide
  let currentSlide = $state(0);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSlide = scrollerSlides.indexOf(entry.target as HTMLElement);
          }
        });
      },
      {
        root: scroller,
        threshold: 0.6,
      },
    );

    scrollerSlides.forEach((slide) => {
      observer.observe(slide);
    });
    return () => {
      scrollerSlides.forEach((slide) => {
        observer.unobserve(slide);
      });
    };
  });

  // Manual controls
  function goToSlide(index: number) {
    scrollerSlides[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  function previousSlide() {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }

  function nextSlide() {
    goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }
</script>

<section
  class="group/carousel text-offwhite aspect-4/3 relative overflow-hidden"
  aria-label="Carousel"
  aria-roledescription="carousel"
>
  <div
    bind:this={scroller}
    class="grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col items-center overflow-x-auto overscroll-contain"
  >
    {#each slides as slide, i (slide.src)}
      <figure class="snap-center" bind:this={scrollerSlides[i]}>
        <img
          role="presentation"
          src={slide.src}
          width={slide.width}
          height={slide.height}
          loading="lazy"
          alt=""
        />
        <figcaption class="sr-only">
          Slide {i + 1} of {slides.length}
        </figcaption>
      </figure>
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
        aria-selected={i === currentSlide}
        aria-controls="{id}-slides-container"
        onclick={() => {
          goToSlide(i);
        }}
      >
        <Icon
          class="drop-shadow-contrast tablet:size-5 size-4"
          name={i === currentSlide ? "slide-dot-selected" : "slide-dot"}
        />
      </button>
    {/each}
  </div>
</section>

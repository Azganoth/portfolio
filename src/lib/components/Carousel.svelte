<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  interface Props {
    id: string;
    slides: { url: string; width: number; height: number }[];
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
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }
</script>

<section
  class="text-offwhite aspect-4/3 group relative overflow-hidden"
  aria-label="Carousel"
  aria-roledescription="carousel"
>
  <div
    bind:this={scroller}
    class="grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col items-center overflow-x-auto overscroll-contain"
  >
    {#each slides as slide, i (slide.url)}
      <figure class="snap-center" bind:this={scrollerSlides[i]}>
        <img
          role="presentation"
          src={slide.url}
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
    class="push-on-active hover:text-purple center-y not-group-hover:opacity-25 absolute left-0 transition-all"
    type="button"
    aria-label="Slide anterior"
    aria-controls="{id}-slides-container"
    onclick={previousSlide}
  >
    <Icon class="drop-shadow-contrast size-10" icon="fa6-solid:chevron-left" />
  </button>
  <button
    class="push-on-active hover:text-purple not-group-hover:opacity-25 center-y absolute right-0 transition-all"
    type="button"
    aria-label="Próximo slide"
    aria-controls="{id}-slides-container"
    onclick={nextSlide}
  >
    <Icon class="drop-shadow-contrast size-10" icon="fa6-solid:chevron-right" />
  </button>

  <div
    class="center-x not-group-hover:opacity-25 absolute bottom-4 flex transition-all"
    role="tablist"
    aria-label="Navegação de slides"
  >
    {#each { length: slides.length }, i}
      <button
        class="push-on-active hover:text-purple block"
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
          class="drop-shadow-contrast size-6"
          icon={i === currentSlide ? "octicon:dot-fill-16" : "octicon:dot-16"}
        />
      </button>
    {/each}
  </div>
</section>

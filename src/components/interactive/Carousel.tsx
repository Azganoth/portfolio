import type { ImageMetadata } from "astro";
import { useMemo, useState } from "preact/hooks";
import { simpleCX } from "../../utils/cx";
import Icon from "../shared/Icon";

export type CarouselProps = {
  slides: ImageMetadata[];
};

function Carousel({ slides }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const lastSlide = useMemo(() => slides.length - 1, [slides]);

  const goToSlide = (i: number) => {
    setCurrentSlide(i > lastSlide ? 0 : i < 0 ? lastSlide : i);
  };
  const nextSlide = () => {
    goToSlide(currentSlide + 1);
  };
  const previousSlide = () => {
    goToSlide(currentSlide - 1);
  };

  return (
    <section
      class="group/carousel relative min-h-[240px] overflow-hidden text-white md:min-h-[414px] lg:min-h-[488px]"
      aria-label="Carousel"
    >
      <div
        class="flex -translate-x-[--slide-offset] transition-transform duration-300 ease-out"
        style={{ "--slide-offset": `${currentSlide * 100}%` }}
      >
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={`Slide ${currentSlide + 1} of ${lastSlide + 1}`}
            width={slide.width}
            height={slide.height}
            aria-hidden={i !== currentSlide}
          />
        ))}
      </div>
      <button
        class="push-down absolute left-2 top-1/2 -translate-y-1/2 select-none text-3xl hover:text-orchid"
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        <Icon class="drop-shadow-stand-out" name="chevron-left" />
      </button>
      <button
        class="push-down absolute right-2 top-1/2 -translate-y-1/2 select-none text-3xl hover:text-orchid"
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <Icon class="drop-shadow-stand-out" name="chevron-right" />
      </button>
      <ul class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <li key={i}>
            <button
              class={simpleCX(
                "push-down block select-none hover:text-orchid",
                i === currentSlide && "text-pink",
              )}
              type="button"
              onClick={() => {
                goToSlide(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === currentSlide}
            >
              <Icon class="drop-shadow-stand-out" name="circle" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Carousel;

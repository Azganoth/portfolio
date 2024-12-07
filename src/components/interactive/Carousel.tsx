import type { ImageMetadata } from "astro";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { simpleCX } from "../../utils/cx";
import Icon from "../shared/Icon";

const SWIPE_THRESHOLD = 80;

export type CarouselProps = {
  slides: ImageMetadata[];
};

function Carousel({ slides }: CarouselProps) {
  // Slides

  const [currentSlide, setCurrentSlide] = useState(0);
  const lastSlide = useMemo(() => slides.length - 1, [slides]);

  const goToSlide = useCallback(
    (i: number) => {
      setCurrentSlide(i > lastSlide ? 0 : i < 0 ? lastSlide : i);
    },
    [lastSlide],
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [goToSlide, currentSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [goToSlide, currentSlide]);

  // Swipe

  const [isSwiping, setIsSwiping] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const startXRef = useRef(0);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    event.preventDefault();
    setIsSwiping(true);
    startXRef.current = event.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault(); // Prevent background movement
    const deltaX = event.touches[0].clientX - startXRef.current;
    setDeltaX(deltaX);
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    event.preventDefault();
    setIsSwiping(false);
    setDeltaX(0);
    startXRef.current = 0;
  }, []);

  useEffect(() => {
    if (isSwiping) {
      if (deltaX > SWIPE_THRESHOLD && currentSlide > 0) {
        previousSlide();
        setIsSwiping(false);
      } else if (deltaX < -SWIPE_THRESHOLD && currentSlide < lastSlide) {
        nextSlide();
        setIsSwiping(false);
      }
    }
  }, [currentSlide, lastSlide, isSwiping, deltaX]);

  const translateXOffset = useMemo(() => {
    let slide;
    if (currentSlide > 0) {
      slide = `-${100 * currentSlide}%`;
    }
    let swipe;
    if (
      isSwiping &&
      ((deltaX > 0 && currentSlide > 0) ||
        (deltaX < 0 && currentSlide < lastSlide))
    ) {
      swipe = `${deltaX}px`;
    }

    return slide && swipe ? `calc(${slide} + ${swipe})` : (slide ?? swipe);
  }, [currentSlide, lastSlide, isSwiping, deltaX]);

  // Renders

  const slideIndicators = useMemo(
    () => (
      <ul class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <li key={i} class="md:text-l">
            <button
              class={simpleCX(
                "push-down block select-none hover:text-orchid",
                i === currentSlide && "text-pink hover:text-pink",
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
    ),
    [slides, currentSlide, goToSlide],
  );

  const slideContent = useMemo(
    () => (
      <div
        class="flex translate-x-[--slide-offset] transition-transform duration-300 ease-out"
        style={{
          "--slide-offset": translateXOffset,
        }}
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
    ),
    [slides, currentSlide, lastSlide, translateXOffset],
  );

  return (
    <section
      class="group/carousel relative min-h-[240px] overflow-hidden text-white md:min-h-[414px] lg:min-h-[488px]"
      aria-label="Carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slideContent}
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
      {slideIndicators}
    </section>
  );
}

export default Carousel;

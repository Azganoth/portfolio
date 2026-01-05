import type { Attachment } from "svelte/attachments";

export interface InViewOptions {
  /**
   * Element to use as the viewport for checking visibility.
   * Default is the browser viewport.
   */
  root?: Element | Document | null;

  /**
   * Margin around the root. Can have values similar to the CSS margin property.
   * Default is '0px'.
   */
  rootMargin?: string;

  /**
   * Percentage of the target's visibility the observer's callback should be executed.
   * Default is 0 (meaning as soon as even one pixel is visible).
   */
  threshold?: number | number[];

  /**
   * Only trigger the observer once.
   */
  once?: boolean;

  /** Custom class to toggle instead of 'is-visible' */
  className?: string;

  /** Callback when the element enters the viewport */
  onenter?: (entry: IntersectionObserverEntry) => void;

  /** Callback when the element leaves the viewport */
  onleave?: (entry: IntersectionObserverEntry) => void;

  /** Callback whenever the intersection status changes */
  onchange?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
}

/**
 * Svelte Attachment to detect when an element enters or leaves the viewport.
 * Automatically toggles the `is-visible` class (or custom `className`) for CSS-based animations.
 *
 * @example
 * // Basic Enter Animation (runs once)
 * <div class="transition-all duration-500 not-in-view:opacity-0 not-in-view:-translate-y-4" {@attach inview({ once: true })}>...</div>
 *
 * @example
 * // Enter & Exit Animation (runs every time)
 * <div class="transition-all duration-500 not-in-view:opacity-0" {@attach inview()}>...</div>
 */
export const inView = (options: InViewOptions = {}): Attachment => {
  const {
    root = null,
    rootMargin = "0px",
    threshold = 0,
    once = false,
    className = "is-visible",
    onenter,
    onleave,
    onchange,
  } = options;

  return (node) => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (onchange) onchange(entry, obs);

          if (entry.isIntersecting) {
            node.classList.add(className);
            if (onenter) onenter(entry);
            if (once) obs.disconnect();
          } else {
            if (onleave) onleave(entry);
            if (!once) node.classList.remove(className);
          }
        });
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  };
};

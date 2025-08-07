import type { Attachment } from "svelte/attachments";

interface RevealOptions {
  rootMargin?: string;
  threshold?: number;
}

export const reveal = (options: RevealOptions = {}): Attachment => {
  const { rootMargin, threshold = "0.5" } = options;

  return (node) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            // Stop observing once the element is visible
            observer.unobserve(node);
          }
        });
      },
      { rootMargin, threshold: Number(threshold) },
    );

    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
  };
};

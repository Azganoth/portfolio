import { tick } from "svelte";
import type { Attachment } from "svelte/attachments";

type FocustrapOptions = {
  active?: boolean;
};

export const focustrap = (
  options: FocustrapOptions = {},
): Attachment<HTMLElement> => {
  const { active = true } = options;

  return (node) => {
    const previous = document.activeElement as HTMLElement;

    const focusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((e) => !e.hasAttribute("disabled") && !e.hasAttribute("inert"));

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const all = focusable();
      const first = all[0];
      const last = all[all.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    $effect(() => {
      if (active) {
        tick().then(() => {
          focusable()[0]?.focus();
        });
      }
    });

    node.addEventListener("keydown", handleKeydown);
    return () => {
      node.removeEventListener("keydown", handleKeydown);
      previous?.focus(); // Return focus to the element that opened the modal
    };
  };
};

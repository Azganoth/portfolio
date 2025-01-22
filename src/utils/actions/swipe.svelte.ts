import type { Action } from "svelte/action";

type SwipeDirection = "up" | "down" | "left" | "right" | "none";

export type SwipeEventDetail = {
  event: TouchEvent;
  direction: SwipeDirection;
  coordsStart: { x: number; y: number };
  coordsEnd: { x: number; y: number };
  coordsDiff: { x: number; y: number };
};

const swipe: Action<
  HTMLElement,
  | {
      threshold?: number;
    }
  | undefined
> = (node, options) => {
  const { threshold = 80 } = options ?? {};

  let swiping = $state(false);
  let coordsStart = $state({ x: 0, y: 0 });
  let coordsEnd = $state({ x: 0, y: 0 });
  let coordsDiff = $derived({
    x: coordsEnd.x - coordsStart.x,
    y: coordsEnd.y - coordsStart.y,
  });

  let threadholdExceeded = $derived(
    Math.max(Math.abs(coordsDiff.x), Math.abs(coordsDiff.y)) >= threshold,
  );

  let direction = $derived<SwipeDirection>(
    !threadholdExceeded
      ? "none"
      : Math.abs(coordsDiff.x) > Math.abs(coordsDiff.y)
        ? coordsDiff.x > 0
          ? "left"
          : "right"
        : coordsDiff.y > 0
          ? "up"
          : "down",
  );

  function getCoords(event: TouchEvent) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  function handletouchstart(event: TouchEvent) {
    if (event.touches.length !== 1) return;

    const coords = getCoords(event);
    coordsStart = coords;
    coordsEnd = coords;
    node.dispatchEvent(
      new CustomEvent<SwipeEventDetail>("swipestart", {
        detail: { event, direction, coordsStart, coordsEnd, coordsDiff },
      }),
    );
  }

  function handletouchmove(event: TouchEvent) {
    if (event.touches.length !== 1) return;

    coordsEnd = getCoords(event);
    if (!swiping && threadholdExceeded) {
      swiping = true;
    }
    if (swiping) {
      node.dispatchEvent(
        new CustomEvent<SwipeEventDetail>("swipemove", {
          detail: { event, direction, coordsStart, coordsEnd, coordsDiff },
        }),
      );
    }
  }

  function handletouchend(event: TouchEvent) {
    if (swiping) {
      node.dispatchEvent(
        new CustomEvent<SwipeEventDetail>("swipeend", {
          detail: { event, direction, coordsStart, coordsEnd, coordsDiff },
        }),
      );
    }

    swiping = false;
  }

  $effect(() => {
    node.addEventListener("touchstart", handletouchstart);
    node.addEventListener("touchmove", handletouchmove);
    node.addEventListener("touchend", handletouchend);
    node.addEventListener("touchcancel", handletouchend);
    return () => {
      node.removeEventListener("touchstart", handletouchstart);
      node.removeEventListener("touchmove", handletouchmove);
      node.removeEventListener("touchend", handletouchend);
      node.removeEventListener("touchcancel", handletouchend);
    };
  });
};

export default swipe;

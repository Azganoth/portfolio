import type { RefObject } from "preact";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";

function useClickAway<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  options: { disabled?: boolean; ignoreSelf?: boolean } = {},
) {
  const callbackRef = useRef(callback);
  const { disabled = false, ignoreSelf = false } = options;

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (disabled) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (
        element &&
        ((ignoreSelf && event.target === element) ||
          !event.composedPath().includes(element))
      ) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [ref, disabled, ignoreSelf]);
}

export default useClickAway;

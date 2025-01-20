import type { RefObject } from "preact";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";

function useClickAway<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  options: { disabled?: boolean; ignoreSelf?: boolean } = {},
) {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const optionsRef = useRef(options);
  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (optionsRef.current.disabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        ((optionsRef.current.ignoreSelf && event.target === ref.current) ||
          !ref.current.contains(event.target))
      ) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("click", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, optionsRef.current.disabled]);
}

export default useClickAway;

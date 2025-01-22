import type { Action } from "svelte/action";

type ClickawayEventDetail = {
  event: MouseEvent | TouchEvent;
  node: HTMLElement;
};

const clickaway: Action<
  HTMLElement,
  | {
      ignoreSelf?: boolean;
      ignoreNodes?: Node[];
    }
  | undefined
> = (node, options) => {
  const { ignoreSelf = false, ignoreNodes = [] } = options ?? {};

  const listener = (event: MouseEvent | TouchEvent) => {
    if (
      node &&
      event.target instanceof Node &&
      ((ignoreSelf && event.target === node) || !node.contains(event.target)) &&
      !ignoreNodes.some((ignoreNode) =>
        ignoreNode.contains(event.target as Node),
      )
    ) {
      node.dispatchEvent(
        new CustomEvent<ClickawayEventDetail>("clickaway", {
          detail: { event, node },
        }),
      );
    }
  };

  $effect(() => {
    document.addEventListener("click", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
};

export default clickaway;

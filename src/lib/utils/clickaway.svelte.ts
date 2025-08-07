import type { Attachment } from "svelte/attachments";

export type ClickawayEventDetail = {
  event: MouseEvent | TouchEvent;
  node: HTMLElement;
};

type ClickawayOptions = {
  ignoreSelf?: boolean;
  ignoreNodes?: Node[];
};

export const clickaway = (
  options: ClickawayOptions = {},
): Attachment<HTMLElement> => {
  const { ignoreSelf = false, ignoreNodes = [] } = options;

  return (node) => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const { target } = event;
      if (
        node &&
        target instanceof Node &&
        ((ignoreSelf && target === node) || !node.contains(target)) &&
        !ignoreNodes.some((ignoreNode) => ignoreNode.contains(target))
      ) {
        node.dispatchEvent(
          new CustomEvent<ClickawayEventDetail>("clickaway", {
            detail: { event, node },
          }),
        );
      }
    };

    document.addEventListener("click", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("click", listener);
      document.removeEventListener("touchstart", listener);
    };
  };
};

import type { ClickawayEventDetail } from "@utils/actions/clickaway.svelte";
import type { SwipeEventDetail } from "@utils/actions/swipe.svelte";
import "svelte/elements";

declare module "svelte/elements" {
  export interface HTMLAttributes<T> {
    onclickaway?: (event: CustomEvent<ClickawayEventDetail>) => any;

    onswipestart?: (event: CustomEvent<SwipeEventDetail>) => any;
    onswipemove?: (event: CustomEvent<SwipeEventDetail>) => any;
    onswipeend?: (event: CustomEvent<SwipeEventDetail>) => any;
  }
}

export {};

import type { ClickawayEventDetail } from "@utils/actions/clickaway.svelte";
import type { SwipeEventDetail } from "@utils/actions/swipe.svelte";
import "svelte/elements";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      projects?: string[];
    }
    // interface PageState {}
    // interface Platform {}
  }
}

declare module "svelte/elements" {
  export interface HTMLAttributes {
    onclickaway?: (event: CustomEvent<ClickawayEventDetail>) => unknown;

    onswipestart?: (event: CustomEvent<SwipeEventDetail>) => unknown;
    onswipemove?: (event: CustomEvent<SwipeEventDetail>) => unknown;
    onswipeend?: (event: CustomEvent<SwipeEventDetail>) => unknown;
  }
}

export {};

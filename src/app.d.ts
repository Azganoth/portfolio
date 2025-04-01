import type { Tech } from "$lib/constants";
import type { ClickawayEventDetail } from "@utils/actions/clickaway.svelte";
import type { SwipeEventDetail } from "@utils/actions/swipe.svelte";
import "svelte/elements";

declare global {
  interface ProjectData {
    name: string;
    title: string;
    summary: string;
    description: string;
    website: string;
    repository: string;
    technologies: Tech[];
    previews: { src: string; width: number; height: number }[];
  }

  namespace App {
    interface Error {}
    interface Locals {}
    interface PageData {
      projects?: string[];
    }
    interface PageState {}
    interface Platform {}
  }
}

declare module "svelte/elements" {
  export interface HTMLAttributes<T> {
    onclickaway?: (event: CustomEvent<ClickawayEventDetail>) => any;

    onswipestart?: (event: CustomEvent<SwipeEventDetail>) => any;
    onswipemove?: (event: CustomEvent<SwipeEventDetail>) => any;
    onswipeend?: (event: CustomEvent<SwipeEventDetail>) => any;
  }
}

export {};

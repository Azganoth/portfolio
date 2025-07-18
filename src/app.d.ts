import type { Project } from "$lib/projects.schema";
import type { ClickawayEventDetail } from "@utils/clickaway.svelte";
import "svelte/elements";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      projects?: Project[];
    }
    // interface PageState {}
    // interface Platform {}
  }
}

declare module "svelte/elements" {
  export interface HTMLAttributes {
    onclickaway?: (event: CustomEvent<ClickawayEventDetail>) => unknown;
  }
}

export {};

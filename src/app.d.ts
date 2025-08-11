import type { Locale } from "$lib/i18n";
import type { Project } from "$lib/projects.schema";
import type { ClickawayEventDetail } from "@utils/clickaway.svelte";
import "svelte/elements";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      projects?: Record<Locale, Project[]>;
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

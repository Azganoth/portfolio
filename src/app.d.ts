/// <reference types="unplugin-icons/types/svelte" />

import type { Project, ProjectSummary } from "$lib/features/projects/schema";
import type { Locale } from "$lib/shared/constants";
import type { ClickawayEventDetail } from "$lib/shared/attachments/clickaway";
import "svelte/elements";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      projects?: Record<Locale, ProjectSummary[]>;
    }
    interface PageState {
      selectedProject?: Project;
    }
    // interface Platform {}
  }
}

declare module "svelte/elements" {
  export interface HTMLAttributes<T extends EventTarget> {
    onclickaway?: (
      event: CustomEvent<ClickawayEventDetail> & {
        currentTarget: EventTarget & T;
      },
    ) => unknown;
  }
}

export {};

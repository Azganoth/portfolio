import { goto, preloadData, pushState } from "$app/navigation";
import type { Project } from "$lib/features/projects/schema";

/** DOM id of a project's link in the list, used to return focus to it. */
export const composeProjectLinkId = (slug: string) => `project-link-${slug}`;

/**
 * Opens a project as a dialog over the current page.
 *
 * Uses shallow routing so the page behind the dialog keeps its scroll
 * position — a plain navigation to the project route would scroll to the top,
 * and closing the dialog would leave the reader stranded there.
 *
 * The markdown body only exists on the project route, so its data is loaded
 * first; `data-sveltekit-preload-data="hover"` usually has it cached already.
 * A failed load falls back to a full navigation, which renders the same
 * dialog.
 */
export const openProject = async (href: string) => {
  const result = await preloadData(href);

  if (result.type === "loaded" && result.status === 200) {
    pushState(href, {
      selectedProject: (result.data as { project: Project }).project,
    });
  } else {
    await goto(href);
  }
};

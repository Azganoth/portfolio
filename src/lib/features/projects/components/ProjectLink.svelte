<script lang="ts">
  import { openProject } from "$lib/features/projects/navigation";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS } from "$lib/shared/constants";
  import { getCurrentLocalizedPath } from "$lib/shared/utils/currentPath.svelte";
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    slug: string;
    class?: ClassValue;
    children: Snippet;
  }

  let { slug, class: className, children }: Props = $props();

  const href = $derived(getCurrentLocalizedPath(`/projects/${slug}`));

  const handleclick = (event: MouseEvent) => {
    event.preventDefault();
    openProject(href);
  };
</script>

<Link
  class={className}
  {href}
  aria-haspopup="dialog"
  aria-controls={ID_PROJECT_DETAILS}
  onclick={handleclick}
>
  {@render children()}
</Link>

<script lang="ts" module>
  export const composeProjectLinkId = (slug: string) => `project-link-${slug}`;
</script>

<script lang="ts">
  import { pushState } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { t } from "$lib/features/i18n/translation";
  import { getLocalizedPath } from "$lib/features/i18n/utils";
  import type { Project } from "$lib/features/projects/schema";
  import { selectedProject } from "$lib/features/projects/store";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS, TAG_META } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    project: Project;
  }

  let { class: className, project }: Props = $props();

  const linkId = $derived(composeProjectLinkId(project.slug));
  const titleId = $derived(`project-title-${project.slug}`);
  const summaryId = $derived(`project-summary-${project.slug}`);

  const href = $derived(getLocalizedPath(`/projects/${project.slug}`));
  function openProject() {
    $selectedProject = project;
    pushState(resolve(href), { selectedProject: project });
  }

  function handleclick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    openProject();
  }

  function handlekeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  }
</script>

<article
  class={[
    "group relative grid max-w-[320px] items-center gap-2 transition-transform focus-within:-translate-y-1 hover:-translate-y-1 focus:outline-hidden md:max-w-160 md:grid-cols-[320px_1fr] md:grid-rows-[240px] md:gap-6",
    className,
  ]}
  aria-labelledby={titleId}
  aria-describedby={summaryId}
>
  <div
    class="relative grid place-items-center overflow-hidden rounded-2xl border border-muted bg-muted outline-4 outline-transparent group-focus-within:outline-primary"
  >
    {#if project.previews.length > 0}
      <!-- Decorative image since title is already announced -->
      <img
        class="transition-transform duration-300 ease-out group-focus-within:scale-110 group-hover:scale-110"
        role="presentation"
        src={project.previews[0].url}
        width={project.previews[0].width}
        height={project.previews[0].height}
        loading="lazy"
        alt=""
      />
    {:else}
      <div class="aspect-4/3 w-full">
        <Icon
          icon="fa6-solid:code"
          class="relative top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/50"
        />
      </div>
    {/if}
    <div
      class="absolute bottom-2 left-2 rounded-xl bg-muted px-3 py-1 font-mono text-xs font-bold tracking-wide"
    >
      {project.year} • {project.category.toUpperCase()}
    </div>
  </div>
  <div class="flex h-full flex-col gap-4 max-md:px-4 md:pb-4">
    <h3
      id={titleId}
      class="text-center font-display text-xl font-bold tracking-wide"
    >
      <Link
        id={linkId}
        class="outline-none after:absolute after:inset-0 after:z-1 after:content-[''] hover:text-secondary focus:text-primary active:text-primary"
        {href}
        variant="none"
        aria-haspopup="dialog"
        aria-controls={ID_PROJECT_DETAILS}
        aria-label={$t("a11y_open_project_details")}
        onclick={handleclick}
        onkeydown={handlekeydown}
      >
        {project.title}
      </Link>
    </h3>
    <p id={summaryId} class="line-clamp-3 max-h-18 text-muted-foreground">
      {project.summary}
    </p>
    <ul class="mt-auto flex flex-wrap justify-center gap-3">
      {#each project.tags as tag (tag)}
        {@const { color, icon } = TAG_META[tag] ?? TAG_META["fallback"]}
        <li title={tag}>
          <Icon
            class="size-6 text-muted transition-colors duration-300 group-hover:text-(--brand)"
            style="--brand: {color}"
            {icon}
          />
        </li>
      {/each}
    </ul>
  </div>
</article>

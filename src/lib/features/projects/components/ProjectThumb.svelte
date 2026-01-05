<script lang="ts" module>
  export const composeProjectLinkId = (slug: string) => `project-link-${slug}`;
</script>

<script lang="ts">
  import { pushState } from "$app/navigation";
  import { t } from "$lib/features/i18n/translation.svelte";
  import type { Project } from "$lib/features/projects/schema";
  import { projectStore } from "$lib/features/projects/store.svelte";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS, TAG_META } from "$lib/shared/constants";
  import { getLocalizedPath } from "$lib/shared/utils";
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
    projectStore.selected = project;
    pushState(href, { selectedProject: project });
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
    "group relative flex flex-col gap-8 max-xl:max-w-170 xl:flex-row xl:items-center xl:gap-16 xl:group-odd/project-item:flex-row-reverse",
    className,
  ]}
  aria-labelledby={titleId}
  aria-describedby={summaryId}
>
  <!-- Visuals -->
  <div class="perspective-1000 w-full flex-1">
    <div
      class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-muted shadow-2xl transition-shadow duration-400 ease-out outline-none group-focus-within:ring-4 group-focus-within:ring-primary"
    >
      {#if project.previews.length > 0}
        <img
          class="h-full w-full object-cover transition-transform duration-700 ease-out group-focus-within:scale-110 group-hover:scale-110"
          src={project.previews[0].url}
          width={project.previews[0].width}
          height={project.previews[0].height}
          loading="lazy"
          alt=""
        />
      {:else}
        <div class="grid h-full w-full place-items-center bg-muted/50">
          <Icon
            class="size-24 text-muted-foreground/20"
            icon="fa6-solid:code"
          />
        </div>
      {/if}
      <div
        class="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-400 group-focus-within:opacity-100 group-hover:opacity-100"
      ></div>
    </div>
  </div>
  <div class="flex flex-1 flex-col gap-6">
    <div class="flex flex-col gap-2">
      <div class="font-mono font-bold tracking-widest text-primary uppercase">
        {project.year}/{project.category}
      </div>

      <h3
        id={titleId}
        class="flex items-center gap-5 font-display text-4xl font-bold tracking-tight text-white"
      >
        <Link
          id={linkId}
          class="outline-none group-focus-within:text-primary after:absolute after:inset-0 after:z-1 after:content-[''] hover:text-primary"
          {href}
          variant="none"
          aria-haspopup="dialog"
          aria-controls={ID_PROJECT_DETAILS}
          aria-label={t("a11y_open_project_details")}
          onclick={handleclick}
          onkeydown={handlekeydown}
        >
          {project.title}
        </Link>
        <Icon
          icon="fa7-solid:arrow-up-right-from-square"
          class="mt-1 size-8 text-muted-foreground"
        />
      </h3>
    </div>

    <p
      id={summaryId}
      class="max-w-prose text-lg leading-relaxed text-muted-foreground"
    >
      {project.summary}
    </p>

    <ul class="mt-2 flex flex-wrap gap-3">
      {#each project.tags as tag (tag)}
        {@const { color, icon } = TAG_META[tag] ?? TAG_META["fallback"]}
        <li
          class="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono font-bold tracking-wide text-muted-foreground"
          title={tag}
        >
          <Icon class="size-5" style="color: {color}" {icon} />
          {tag}
        </li>
      {/each}
    </ul>
  </div>
</article>

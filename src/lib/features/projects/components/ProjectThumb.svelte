<script lang="ts">
  import { goto, preloadData, pushState } from "$app/navigation";
  import { t } from "$lib/features/i18n/translation.svelte";
  import type { Project, ProjectSummary } from "$lib/features/projects/schema";
  import { composeProjectLinkId } from "$lib/features/projects/utils";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS } from "$lib/shared/constants";
  import { IconCode, IconExternalLink } from "$lib/shared/icons";
  import { getCurrentLocalizedPath } from "$lib/shared/utils/currentPath.svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    project: ProjectSummary;
  }

  let { class: className, project }: Props = $props();

  const linkId = $derived(composeProjectLinkId(project.slug));
  const titleId = $derived(`project-title-${project.slug}`);
  const summaryId = $derived(`project-summary-${project.slug}`);

  const href = $derived(getCurrentLocalizedPath(`/projects/${project.slug}`));

  // The card only holds a summary; the markdown body lives on the project
  // route, so load that route's data before opening the dialog over the page.
  // `data-sveltekit-preload-data="hover"` usually has it cached already.
  const openProject = async () => {
    const result = await preloadData(href);

    if (result.type === "loaded" && result.status === 200) {
      pushState(href, {
        selectedProject: (result.data as { project: Project }).project,
      });
    } else {
      await goto(href);
    }
  };

  const handleclick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    openProject();
  };

  const handlekeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  const title = $derived(project.title);
</script>

<article
  class={[
    "group relative flex flex-col gap-8 max-xl:max-w-180 xl:grid xl:grid-cols-2 xl:items-center xl:gap-16",
    className,
  ]}
  aria-labelledby={titleId}
  aria-describedby={summaryId}
>
  <!-- Visuals -->
  <div
    class="w-full xl:group-odd/project-item:col-start-2 xl:group-odd/project-item:row-start-1"
  >
    <div
      class="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-muted/40 shadow-2xl outline-none group-focus-within:ring-4 group-focus-within:ring-primary"
    >
      {#if project.previews.length > 0}
        <img
          class="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
          src={project.previews[0].url}
          alt=""
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-background/35"></div>
        <img
          class="relative h-full w-full object-contain transition-transform duration-500 ease-out group-focus-within:scale-[1.02] group-hover:scale-[1.02]"
          src={project.previews[0].url}
          width={project.previews[0].width}
          height={project.previews[0].height}
          loading="lazy"
          alt={t("a11y_project_preview", { title })}
        />
      {:else}
        <div
          class="relative grid h-full w-full place-items-center overflow-hidden bg-linear-to-br from-primary/12 via-muted/40 to-secondary/10"
        >
          <div
            class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[32px_32px]"
          ></div>
          <div class="relative flex flex-col items-center gap-4">
            <div
              class="grid size-14 place-items-center rounded-2xl border border-primary/20 bg-background/65 text-primary shadow-glow"
            >
              <IconCode class="size-6" />
            </div>
            <span
              class="font-mono text-sm font-bold tracking-widest text-muted-foreground uppercase"
            >
              {project.title}
            </span>
          </div>
        </div>
      {/if}
      <div
        class="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-400 group-focus-within:opacity-100 group-hover:opacity-100"
      ></div>
    </div>
  </div>
  <div
    class="flex min-w-0 flex-col gap-6 xl:group-odd/project-item:col-start-1 xl:group-odd/project-item:row-start-1"
  >
    <div class="flex flex-col gap-2">
      <div class="font-mono font-bold tracking-widest text-primary uppercase">
        {project.year}/{project.category}
      </div>

      <h3
        id={titleId}
        class="flex items-center gap-5 font-display text-2xl font-bold tracking-tight text-white md:text-4xl"
      >
        <Link
          id={linkId}
          class="outline-none group-focus-within:text-primary after:absolute after:inset-0 after:z-1 after:content-[''] hover:text-primary"
          {href}
          variant="none"
          aria-haspopup="dialog"
          aria-controls={ID_PROJECT_DETAILS}
          aria-label={t("a11y_open_project_details_named", { title })}
          onclick={handleclick}
          onkeydown={handlekeydown}
        >
          {project.title}
        </Link>
        <IconExternalLink
          class="size-7 text-muted-foreground md:mt-1 md:size-8"
        />
      </h3>
    </div>

    <div class="border-l-2 border-primary/70 pl-4">
      <div
        class="font-mono text-xs font-bold tracking-widest text-primary uppercase"
      >
        {t("project_card_result_label")}
      </div>
      <p class="mt-2 max-w-prose leading-relaxed text-foreground/90">
        {project.outcome}
      </p>
    </div>

    <p
      id={summaryId}
      class="max-w-prose text-lg leading-relaxed text-muted-foreground"
    >
      {project.summary}
    </p>

    <ul class="mt-1 flex flex-wrap gap-2">
      {#each project.tags as tag (tag)}
        <li
          class="rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-muted-foreground"
          title={tag}
        >
          {tag}
        </li>
      {/each}
    </ul>
  </div>
</article>

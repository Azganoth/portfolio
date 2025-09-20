<script lang="ts" module>
  export const composeProjectLinkId = (slug: string) => `project-link-${slug}`;
</script>

<script lang="ts">
  import { t } from "$lib/features/i18n/translation";
  import type { Project } from "$lib/features/projects/schema";
  import { selectedProject } from "$lib/features/projects/store";
  import Link from "$lib/shared/components/Link.svelte";
  import { ID_PROJECT_DETAILS, PROJECT_LINK_BASE } from "$lib/shared/constants";
  import Icon from "@iconify/svelte";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    project: Project;
  }

  let { class: className, project }: Props = $props();

  const linkId = composeProjectLinkId(project.slug);
  const titleId = `project-title-${project.slug}`;
  const summaryId = `project-summary-${project.slug}`;

  function openProject() {
    $selectedProject = project;
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
    "focus:outline-hidden tablet:max-w-[640px] tablet:grid-cols-[320px_1fr] tablet:grid-rows-[240px] tablet:gap-6 group relative grid max-w-[320px] items-center gap-2 transition-all focus-within:-translate-y-1 hover:-translate-y-1",
    className,
  ]}
  aria-labelledby={titleId}
  aria-describedby={summaryId}
>
  <div
    class="bg-stardust group-focus-within:outline-purple border-stardust relative grid place-items-center overflow-hidden rounded-2xl border outline-4 outline-transparent"
  >
    {#if project.previews.length > 0}
      <!-- Decorative image since title is already announced -->
      <img
        class="transition-all duration-300 ease-out group-focus-within:scale-110 group-hover:scale-110"
        role="presentation"
        src={project.previews[0].url}
        width={project.previews[0].width}
        height={project.previews[0].height}
        loading="lazy"
        alt=""
      />
    {:else}
      <div class="aspect-[4/3] w-full">
        <Icon
          icon="fa6-solid:code"
          class="text-gray/50 relative left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    {/if}
    <div
      class="bg-stardust font-jetbrains-mono absolute bottom-1 left-1 rounded-xl px-2 py-1 text-sm font-semibold tracking-wide"
    >
      {project.year}
    </div>
  </div>
  <div class="max-tablet:px-4 tablet:pb-4 flex h-full flex-col gap-4">
    <h3
      id={titleId}
      class="font-orbitron text-center text-xl font-bold tracking-wide"
    >
      <Link
        id={linkId}
        class="hover:text-teal focus:text-purple active:text-purple after:z-1 outline-none after:absolute after:inset-0 after:content-['']"
        href={`${PROJECT_LINK_BASE}${project.slug}`}
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
    <p id={summaryId} class="text-gray line-clamp-3 max-h-[4.5rem]">
      {project.summary}
    </p>
    <ul class="mt-auto flex flex-wrap justify-center gap-2">
      {#each project.tags as tag (tag)}
        <li
          class="bg-stardust font-jetbrains-mono text-gray rounded-2xl px-2 font-bold"
        >
          {tag}
        </li>
      {/each}
    </ul>
  </div>
</article>

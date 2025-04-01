<script lang="ts" module>
  export const composeTitleId = (name: string) => `project-${name}-title`;
  export const composeSummaryId = (name: string) => `project-${name}-summary`;
</script>

<script lang="ts">
  import { PROJECT_DETAILS_ID } from "$lib/components/ProjectDetails.svelte";
  import { TECH_META } from "$lib/constants";
  import { activeProject } from "$lib/store";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    project: ProjectData;
  }

  let { class: className, project }: Props = $props();

  function openProject() {
    $activeProject = project;
  }

  function handleclick(event: MouseEvent) {
    event.stopPropagation();
    openProject();
  }

  function handlekeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      openProject();
    }
  }
</script>

<button
  type="button"
  class={[
    "group/project-preview focus:outline-hidden tablet:max-w-[640px] tablet:grid-cols-[320px_1fr] tablet:grid-rows-[240px] tablet:gap-4 max-tablet:max-w-[320px] grid items-center gap-2",
    className,
  ]}
  aria-labelledby={composeTitleId(project.name)}
  aria-describedby={composeSummaryId(project.name)}
  aria-haspopup="dialog"
  aria-controls={PROJECT_DETAILS_ID}
  onclick={handleclick}
  onkeydown={handlekeydown}
>
  <div
    class="bg-charcoal group-focus/project-preview:outline-orchid group-active/project-preview:outline-orchid overflow-hidden rounded-2xl outline-4 outline-transparent"
  >
    <!-- Decorative image since title is already announced -->
    <img
      class="transition-[scale] duration-300 ease-out group-hover/project-preview:scale-110"
      role="presentation"
      src={project.previews[0].src}
      width={project.previews[0].width}
      height={project.previews[0].height}
      loading="lazy"
      alt=""
    />
  </div>
  <div class="max-tablet:px-4 tablet:pb-4 flex h-full flex-col gap-4">
    <h3
      id={composeTitleId(project.name)}
      class="typo-heading-md group-hover/project-preview:text-teal group-focus/project-preview:text-orchid group-active/project-preview:text-orchid text-center"
    >
      {project.title}
    </h3>
    <p
      id={composeSummaryId(project.name)}
      class="text-silver line-clamp-3 max-h-[4.5rem]"
    >
      {project.summary}
    </p>
    <ul class="mt-auto flex flex-wrap justify-center gap-2">
      {#each project.technologies as tech (tech)}
        <li
          class="bg-charcoal font-cascadia-code text-silver rounded-2xl px-2 font-bold"
        >
          {TECH_META[tech].label}
        </li>
      {/each}
    </ul>
  </div>
</button>

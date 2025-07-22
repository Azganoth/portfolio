<script lang="ts" module>
  export const composeTitleId = (name: string) => `project-${name}-title`;
  export const composeSummaryId = (name: string) => `project-${name}-summary`;
</script>

<script lang="ts">
  import { PROJECT_DETAILS_ID } from "$lib/components/ProjectView.svelte";
  import { PROJECT_LINK_BASE } from "$lib/constants";
  import type { Project } from "$lib/projects.schema";
  import { activeProject } from "$lib/store";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    project: Project;
  }

  let { class: className, project }: Props = $props();

  function openProject() {
    $activeProject = project;
    history.pushState(null, "", `${PROJECT_LINK_BASE}${project.slug}`);
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
    "focus:outline-hidden tablet:max-w-[640px] tablet:grid-cols-[320px_1fr] tablet:grid-rows-[240px] tablet:gap-6 group grid max-w-[320px] items-center gap-2 transition-all hover:-translate-y-1",
    className,
  ]}
  aria-labelledby={composeTitleId(project.title)}
  aria-describedby={composeSummaryId(project.title)}
  aria-haspopup="dialog"
  aria-controls={PROJECT_DETAILS_ID}
  onclick={handleclick}
  onkeydown={handlekeydown}
>
  <div
    class="bg-stardust group-focus:outline-purple group-active:outline-purple border-stardust relative overflow-hidden rounded-2xl border outline-4 outline-transparent"
  >
    <!-- Decorative image since title is already announced -->
    <img
      class="transition-all duration-300 ease-out group-hover:scale-110"
      role="presentation"
      src={project.previews[0].url}
      width={project.previews[0].width}
      height={project.previews[0].height}
      loading="lazy"
      alt=""
    />
    <div
      class="bg-stardust font-jetbrains-mono absolute bottom-1 left-1 rounded-xl px-2 py-1 text-sm font-semibold tracking-wide"
    >
      {project.year}
    </div>
  </div>
  <div class="max-tablet:px-4 tablet:pb-4 flex h-full flex-col gap-4">
    <h3
      id={composeTitleId(project.slug)}
      class="font-orbitron group-hover:text-teal group-focus:text-purple group-active:text-purple text-center text-xl font-bold"
    >
      {project.title}
    </h3>
    <p
      id={composeSummaryId(project.slug)}
      class="text-gray line-clamp-3 max-h-[4.5rem]"
    >
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
</button>

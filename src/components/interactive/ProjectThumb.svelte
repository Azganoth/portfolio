<script lang="ts">
  import { TECH_META } from "@app/constants";
  import { activeProject } from "@app/store";
  import type { Project } from "@utils/projects";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    project: Project;
  }

  let { class: className, project }: Props = $props();

  function openProject() {
    activeProject.set(project);
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
    "group/project-preview focus:outline-hidden tablet:max-w-[640px] tablet:grid-cols-[320px_1fr] tablet:grid-rows-[240px] tablet:gap-4 grid items-center gap-2",
    className,
  ]}
  data-id={project.name}
  aria-label="Show project details"
  onclick={handleclick}
  onkeydown={handlekeydown}
>
  <div
    class="bg-charcoal group-focus/project-preview:outline-orchid group-active/project-preview:outline-orchid overflow-hidden rounded-2xl outline-4 outline-transparent"
  >
    <img
      class="transition-[scale] duration-300 ease-out group-hover/project-preview:scale-110"
      src={project.previews[0].src}
      width={project.previews[0].width}
      height={project.previews[0].height}
      loading="lazy"
      alt={`${project.title} preview.`}
    />
  </div>
  <div class="max-tablet:px-4 tablet:pb-4 flex h-full flex-col gap-4">
    <h3
      class="typo-heading-md group-hover/project-preview:text-green group-focus/project-preview:text-orchid group-active/project-preview:text-orchid text-center"
    >
      {project.title}
    </h3>
    <p class="max-tablet:hidden text-silver line-clamp-3 max-h-[4.5rem]">
      {project.description.substring(0, project.description.indexOf(".") + 1)}
    </p>
    <div class="mt-auto flex flex-wrap justify-center gap-2">
      {#each project.technologies as tech (tech)}
        <span
          class="bg-charcoal font-cascadia-code text-silver rounded-2xl px-2 font-bold"
        >
          {TECH_META[tech].label}
        </span>
      {/each}
    </div>
  </div>
</button>

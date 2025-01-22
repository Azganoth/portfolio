<script lang="ts">
  import { TECH_LABELS } from "@app/constants";
  import { activeProject } from "@app/store";
  import { getProject, type ProjectWithId } from "@utils/projects";
  import type { ClassValue } from "svelte/elements";

  interface Props {
    class?: ClassValue;
    id: ProjectWithId["id"];
    title: ProjectWithId["title"];
    description: ProjectWithId["description"];
    tech: ProjectWithId["tech"];
    preview: ImageMetadata;
  }

  let { class: className, preview, ...project }: Props = $props();

  function openProject() {
    activeProject.set(getProject(project.id));
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
    "group/project-preview grid cursor-pointer items-center gap-2 focus:outline-none md:max-w-[640px] md:grid-cols-[320px_1fr] md:grid-rows-[240px] md:gap-4",
    className,
  ]}
  data-id={project.id}
  aria-label="Show project details"
  onclick={handleclick}
  onkeydown={handlekeydown}
>
  <div
    class="overflow-hidden rounded-2xl bg-charcoal outline outline-4 outline-transparent group-focus/project-preview:outline-orchid group-active/project-preview:outline-orchid"
  >
    <img
      class="transition-transform duration-300 ease-out group-hover/project-preview:scale-110"
      src={preview.src}
      width={preview.width}
      height={preview.height}
      loading="lazy"
      alt={`${project.title} preview.`}
    />
  </div>
  <div class="flex h-full flex-col gap-4 max-md:px-4 md:pb-4">
    <h3
      class="heading-md text-center group-hover/project-preview:text-green group-focus/project-preview:text-orchid group-active/project-preview:text-orchid"
    >
      {project.title}
    </h3>
    <p class="line-clamp-3 max-h-[4.5rem] text-gray max-md:hidden">
      {project.description.substring(0, project.description.indexOf(".") + 1)}
    </p>
    <div class="mt-auto flex flex-wrap justify-center gap-2">
      {#each project.tech as tech (tech)}
        <span
          class="rounded-2xl bg-charcoal px-2 font-code font-bold text-gray"
        >
          {TECH_LABELS[tech]}
        </span>
      {/each}
    </div>
  </div>
</button>

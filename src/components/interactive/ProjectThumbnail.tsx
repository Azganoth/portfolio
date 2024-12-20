import { TECH_LABELS } from "@app/constants";
import { $currentProject } from "@app/store";
import { simpleCX } from "@utils/cx";
import { getProject, type ProjectWithId } from "@utils/projects";
import { useCallback } from "preact/hooks";

export type ProjectThumbnailProps = {
  class?: string;
  preview: ImageMetadata;
} & Pick<ProjectWithId, "id" | "title" | "description" | "tech">;

function ProjectThumbnail({
  class: className,
  id,
  title,
  description,
  tech,
  preview,
}: ProjectThumbnailProps) {
  const openProject = () => {
    $currentProject.set(getProject(id));
  };

  const handleClick = useCallback(() => {
    openProject();
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Enter") {
      openProject();
    }
  }, []);

  return (
    <button
      type="button"
      class={simpleCX(
        "group/project-preview grid cursor-pointer items-center gap-2 focus:outline-none md:max-w-[640px] md:grid-cols-[320px_1fr] md:grid-rows-[240px] md:gap-4",
        className,
      )}
      data-id={id}
      aria-label="Show project details"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div class="overflow-hidden rounded-2xl bg-charcoal outline outline-4 outline-transparent group-focus/project-preview:outline-orchid group-active/project-preview:outline-orchid">
        <img
          class="transition-transform duration-300 ease-out group-hover/project-preview:scale-110"
          src={preview.src}
          width={preview.width}
          height={preview.height}
          loading="lazy"
          alt={`${title} preview.`}
        />
      </div>
      <div class="flex h-full flex-col gap-4 max-md:px-4 md:pb-4">
        <h3 class="heading-md text-center group-hover/project-preview:text-green group-focus/project-preview:text-orchid group-active/project-preview:text-orchid">
          {title}
        </h3>
        <p class="line-clamp-3 max-h-[4.5rem] text-gray max-md:hidden">
          {description.substring(0, description.indexOf(".") + 1)}
        </p>
        <div class="mt-auto flex flex-wrap justify-center gap-2">
          {tech.map((tec) => (
            <span class="rounded-2xl bg-charcoal px-2 font-code font-bold text-gray">
              {TECH_LABELS[tec]}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default ProjectThumbnail;

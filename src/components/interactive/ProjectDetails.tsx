import { useStore } from "@nanostores/preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { $currentProject } from "../../store";
import { getProjectSlides, type ProjectImage } from "../../utils/projects";
import Icon from "../shared/Icon";
import Link from "../shared/Link";
import TechShowcase from "../shared/TechShowcase";
import Carousel from "./Carousel";

function ProjectDetails() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const proj = useStore($currentProject);
  useEffect(() => {
    if (proj) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [proj]);

  const close = () => {
    $currentProject.set(undefined);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      function handleClose() {
        close();
      }

      dialog.addEventListener("close", handleClose);
      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }
  }, [dialogRef]);

  const [slides, setSlides] = useState<ProjectImage[]>([]);
  useEffect(() => {
    if (proj) {
      setSlides(getProjectSlides(proj.id));
      return () => {
        setSlides([]);
      };
    }
  }, [proj]);

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === dialogRef.current) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      class="z-20 max-w-[320px] overflow-hidden rounded-2xl bg-slate text-white backdrop:bg-[rgba(0,0,0,0.9)] md:max-w-[552px] lg:grid lg:max-w-[1300px]"
      onClick={handleOutsideClick}
    >
      {proj && (
        <>
          <button
            class="push-down absolute right-2 top-2 z-10 select-none text-2xl hover:text-orchid md:text-3xl"
            type="button"
            onClick={close}
            aria-label="Fechar detalhes do projeto"
          >
            <Icon class="drop-shadow-stand-out" name="close" />
          </button>
          <div class="grid lg:grid-cols-2">
            <Carousel slides={slides} />
            <article class="flex flex-col gap-4 overflow-hidden px-6 pb-6 pt-4 lg:col-start-1 lg:row-start-1 lg:gap-8 lg:p-8">
              <h3 class="display-s">{proj.title}</h3>
              <p class="mb-auto">{proj.description}</p>
              <TechShowcase
                class="my-2 self-center"
                tech={proj.tech}
                isResponsive
              />
              <div class="flex items-center justify-between">
                <Link
                  class="text-2xl"
                  href={proj.repoLink}
                  description="Abrir repositório do projeto"
                  newTab
                >
                  <Icon name="github2" />
                </Link>
                <Link
                  class="flex items-center gap-1"
                  href={proj.link}
                  description="Abrir o site em uma nova aba"
                  newTab
                >
                  Visitar
                  <Icon class="text-xl" name="redirect" />
                </Link>
              </div>
            </article>
          </div>
        </>
      )}
    </dialog>
  );
}

export default ProjectDetails;

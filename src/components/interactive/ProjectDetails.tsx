import { TECH_LABELS } from "@app/constants";
import { $currentProject } from "@app/store";
import Carousel from "@components/interactive/Carousel";
import Icon from "@components/shared/Icon";
import Link from "@components/shared/Link";
import useClickAway from "@hooks/useClickAway";
import { useStore } from "@nanostores/preact";
import { getProjectSlides, type ProjectImage } from "@utils/projects";
import { useEffect, useRef, useState } from "preact/hooks";

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

  // Close on outside click
  useClickAway(dialogRef, () => close(), {
    disabled: !proj,
    ignoreSelf: true,
  });

  return (
    <dialog
      ref={dialogRef}
      class="z-20 max-h-[612px] max-w-[320px] overflow-hidden rounded-2xl bg-charcoal text-white shadow-elevation-high backdrop:bg-[rgba(0,0,0,0.9)] md:max-h-[896px] md:max-w-[640px] lg:grid lg:max-h-[540px] lg:max-w-[1300px]"
    >
      {proj && (
        <>
          <button
            class="push-down absolute right-4 top-4 z-10 select-none text-2xl hover:text-orchid"
            type="button"
            onClick={close}
            aria-label="Fechar detalhes do projeto"
          >
            <Icon class="drop-shadow-stand-out" name="close" />
          </button>
          <div class="grid lg:grid-cols-[auto_1fr]">
            <Carousel slides={slides} />
            <article class="flex flex-col gap-4 overflow-auto px-6 pb-6 pt-4 lg:px-8 lg:pb-8">
              <h3 class="heading-md max-lg:text-center">{proj.title}</h3>
              <p class="mb-auto">{proj.description}</p>
              <ul
                class="flex flex-wrap justify-center gap-2"
                aria-label="Tecnologias usadas"
              >
                {proj.tech.map((tec) => (
                  <li
                    key={tec}
                    class="lg:flex lg:items-center lg:gap-2 lg:rounded-2xl lg:bg-slate lg:px-3 lg:py-2"
                    title={TECH_LABELS[tec]}
                  >
                    <Icon class="text-xl lg:text-lg" name={tec} />
                    <span class="cursor-default font-code font-bold text-gray max-lg:sr-only">
                      {TECH_LABELS[tec]}
                    </span>
                  </li>
                ))}
              </ul>
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
                  class="flex items-center"
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

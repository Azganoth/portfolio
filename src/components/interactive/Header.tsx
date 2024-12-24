import Icon from "@components/shared/Icon";
import Link from "@components/shared/Link";
import useClickAway from "@hooks/useClickAway";
import useMediaQuery from "@hooks/useMediaQuery";
import useMounted from "@hooks/useMounted";
import { simpleCX } from "@utils/cx";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const links: { label: string; link: string; description: string }[] = [
  {
    label: "Início",
    link: "#start",
    description: "Ir para o início da página",
  },
  {
    label: "Sobre mim",
    link: "#bio",
    description: "Ir para a seção de biografia",
  },
  {
    label: "Habilidades",
    link: "#skills",
    description: "Ir a seção de habilidades",
  },
  {
    label: "Projetos",
    link: "#projects",
    description: "Ir para a seção de projetos",
  },
  {
    label: "Contato",
    link: "#contact",
    description: "Ir para a seção de contato",
  },
];

function Header() {
  const isTabletUp = useMediaQuery("(min-width: 768px)");
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(false);
  }, [isTabletUp]);

  const toggleMenu = useCallback(() => {
    setIsOpened((p) => !p);
  }, []);

  // Hide menu on outside click
  const menuRef = useRef<HTMLUListElement>(null);
  useClickAway(
    menuRef,
    () => {
      setIsOpened(false);
    },
    {
      disabled: !isOpened,
    },
  );

  const isMounted = useMounted();

  return (
    <header class="fixed left-1/2 top-4 z-10 flex max-h-16 min-h-16 w-full max-w-[311px] -translate-x-1/2 items-center justify-between rounded-2xl bg-charcoal p-4 shadow-elevation-medium motion-safe:transition-[max-width] md:max-w-[736px] lg:max-w-[880px]">
      <h1 class="cursor-default font-decorative text-xl tracking-wider text-white">
        <span class="before:mr-0.5 before:text-gray before:content-['<'] after:ml-0.5 after:text-gray after:content-['/>']">
          Azganoth
        </span>
        <span class="text-orchid motion-safe:animate-blink" aria-hidden="true">
          _
        </span>
      </h1>
      <nav
        class={simpleCX(
          "transition-[visibility,opacity,transform] duration-300",
          !isMounted && "invisible opacity-0 motion-safe:-translate-y-1",
        )}
      >
        {!isTabletUp && (
          <>
            <button
              class="push-down block select-none text-2xl hover:text-orchid"
              type="button"
              onClick={toggleMenu}
              aria-label="Abrir menu de navegação"
              aria-haspopup="true"
              aria-expanded={isOpened}
            >
              <Icon name="menu" />
            </button>
            <ul
              ref={menuRef}
              class="fixed inset-x-0 top-24 origin-top rounded-2xl bg-charcoal px-4 py-8 shadow-elevation-medium duration-300 ease-out inert:invisible inert:-translate-y-2 inert:opacity-0 motion-safe:transition-visibility-transform"
              inert={!isOpened}
            >
              {links.map(({ label, link, description }) => (
                <li class="mt-4 text-center first:mt-0">
                  <Link
                    variant="nav"
                    href={link}
                    onClick={() => setIsOpened(false)}
                    aria-label={description}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {isTabletUp && (
          <ul class="flex">
            {links.map(({ label, link, description }) => (
              <li>
                <Link variant="nav" href={link} aria-label={description}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;

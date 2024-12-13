import { simpleCX } from "../../utils/cx";

export type LinkProps = {
  class?: string;
  children?: any;
  type?: "prime" | "nav";
  href: string;
  description?: string;
  newTab?: boolean;
};

function Link({
  class: className,
  children,
  type,
  href,
  description,
  newTab,
}: LinkProps) {
  return (
    <a
      class={simpleCX(
        "font-body font-bold text-white hover:text-green",
        type === "prime" &&
          "relative z-0 after:absolute after:-inset-x-0.5 after:bottom-px after:-z-1 after:h-[1.125rem] after:origin-bottom after:scale-y-[33.33%] after:bg-orchid after:duration-300 after:ease-out after:content-[''] hover:text-white hover:after:scale-100 motion-safe:after:transition-transform",
        type === "nav" &&
          "font-display before:px-0.5 before:font-decorative before:text-gray before:opacity-0 before:content-['<'] after:font-decorative after:opacity-0 after:content-[--underscore] hover:text-orchid hover:before:opacity-100 hover:after:animate-blink hover:after:opacity-100 max-md:text-lg",
        className,
      )}
      href={href}
      aria-label={description}
      {...(newTab && { target: "_blank" })}
    >
      {children}
    </a>
  );
}

export default Link;

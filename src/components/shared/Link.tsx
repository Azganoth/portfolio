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
        "font-display font-normal tracking-wide text-white hover:text-green",
        type === "prime" &&
          "relative z-0 after:absolute after:-inset-x-[1%] after:bottom-[13.5%] after:-z-1 after:h-4 after:origin-bottom after:scale-y-25 after:bg-orchid after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-white hover:after:scale-100 motion-reduce:transition-none",
        type === "nav" &&
          "before:mr-0.5 before:font-decorative before:text-gray before:opacity-0 before:content-['<'] after:opacity-0 after:content-[--underscore] hover:text-orchid hover:before:opacity-100 hover:after:animate-blink hover:after:opacity-100",
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

import { simpleCX } from "@utils/cx";
import type { JSX } from "preact";

export type LinkProps = {
  class?: string;
  children?: any;
  variant?: "prime" | "nav";
  newTab?: boolean;
} & Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "class">;

function Link({
  class: className,
  children,
  variant,
  newTab,
  ...otherProps
}: LinkProps) {
  return (
    <a
      class={simpleCX(
        "font-body font-bold text-white hover:text-green",
        variant === "prime" &&
          "relative z-0 inline-block after:absolute after:-inset-x-0.5 after:bottom-[0.1875em] after:-z-1 after:h-[1.125rem] after:origin-bottom after:scale-y-[33.33%] after:bg-orchid after:duration-300 after:ease-out after:content-[''] hover:text-white hover:after:scale-100 motion-safe:after:transition-transform",
        variant === "nav" &&
          "font-display before:px-0.5 before:font-decorative before:text-gray before:opacity-0 before:content-['<'] after:font-decorative after:opacity-0 after:content-[--underscore] hover:text-orchid hover:before:opacity-100 hover:after:animate-blink hover:after:opacity-100 max-md:text-lg",
        className,
      )}
      {...(newTab && { target: "_blank" })}
      {...otherProps}
    >
      {children}
    </a>
  );
}

export default Link;

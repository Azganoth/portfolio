<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface Props extends HTMLAnchorAttributes {
    variant?: "prime" | "nav";
    newTab?: boolean;
  }

  let {
    class: className,
    children,
    variant,
    newTab,
    ...otherProps
  }: Props = $props();
</script>

<a
  class={[
    "font-inter text-offwhite font-bold",
    variant === "prime"
      ? "after:-z-1 after:bg-orchid hover:text-offwhite relative z-0 inline-block after:absolute after:-inset-x-0.5 after:bottom-[0.1875em] after:h-[1.125rem] after:origin-bottom after:scale-y-[33.33%] after:duration-300 after:ease-out after:content-[''] hover:after:scale-100 motion-safe:after:transition-[scale]"
      : variant === "nav"
        ? "after:content-(--underscore) max-tablet:text-lg font-montserrat-alternates before:font-patua-one before:text-silver after:font-patua-one hover:text-orchid hover:after:animate-blink before:px-0.5 before:opacity-0 before:content-['<'] after:opacity-0 hover:before:opacity-100 hover:after:opacity-100"
        : "hover:text-teal",
    className,
  ]}
  {...newTab && { target: "_blank" }}
  {...otherProps}
>
  {@render children?.()}
</a>

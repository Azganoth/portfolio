<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  interface Props extends HTMLAnchorAttributes {
    variant?: "default" | "prime" | "none";
    newTab?: boolean;
  }

  let {
    class: className,
    children,
    variant = "default",
    newTab,
    ...otherProps
  }: Props = $props();
</script>

<a
  class={[
    "font-bold transition-all",
    variant === "default" && "font-inter hover:text-teal",
    variant === "prime" &&
      "after:-z-1 font-inter after:bg-purple relative z-0 inline-block after:absolute after:-inset-x-0.5 after:bottom-[0.1875em] after:h-[1.125rem] after:origin-bottom after:scale-y-[33.33%] after:duration-300 after:ease-out after:content-[''] hover:after:scale-100 motion-safe:after:transition-all",
    className,
  ]}
  {...newTab && { target: "_blank" }}
  {...otherProps}
>
  {@render children?.()}
</a>

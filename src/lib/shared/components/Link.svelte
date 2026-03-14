<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  const mergeRel = (rel?: string | null) =>
    [
      ...new Set([
        ...(rel?.split(/\s+/).filter(Boolean) ?? []),
        "noopener",
        "noreferrer",
      ]),
    ].join(" ");

  interface Props extends HTMLAnchorAttributes {
    variant?: "default" | "none";
    newTab?: boolean;
  }

  let {
    class: className,
    children,
    variant = "default",
    newTab,
    rel,
    target,
    ...otherProps
  }: Props = $props();
</script>

<a
  class={[
    "font-bold transition-all ease-snappy",
    variant === "default" && "font-body hover:text-secondary",
    className,
  ]}
  target={newTab ? "_blank" : target}
  rel={newTab ? mergeRel(rel) : rel}
  {...otherProps}
>
  {@render children?.()}
</a>

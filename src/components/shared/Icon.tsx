import { simpleCX } from "@utils/cx";

export type IconProps = {
  class?: string;
  name: string;
};

function Icon({ class: className, name }: IconProps) {
  return (
    <svg class={simpleCX("block h-[1em] w-[1em]", className)} aria-hidden>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
}

export default Icon;

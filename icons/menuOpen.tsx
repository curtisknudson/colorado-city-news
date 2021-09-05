import { SvgProps } from "types/SvgIconProps";

export const MenuOpen = (props: SvgProps) => {
  const { dimensions, color, classes } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions ? dimensions : "h-6 w-6"}, ${
        color ? color : ""
      }, ${classes ? classes : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
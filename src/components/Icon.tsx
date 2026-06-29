import React from "react";
import { type MaterialSymbol } from "material-symbols";
import { cn } from "../utils/cn";

interface IconProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> {
  icon: MaterialSymbol;
  hoverIcon?: MaterialSymbol;
  filled?: boolean;
  rounded?: boolean;
}

export default function Icon({
  icon,
  hoverIcon,
  filled,
  className,
  rounded = true,
  style,
  ...props
}: IconProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center justify-center leading-none",
        {
          "material-symbols-rounded": rounded,
          "material-symbols-outlined": !rounded,
        },
        className,
      )}
      style={{
        fontVariationSettings: filled
          ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
          : '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
        ...style,
      }}
      onMouseEnter={(event) => {
        setHovered(true);
        props.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        props.onMouseLeave?.(event);
      }}
    >
      {hovered ? hoverIcon || icon : icon}
    </span>
  );
}

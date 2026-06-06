import React from 'react';
import { type MaterialSymbol } from 'material-symbols';
import { cn } from '../utils/cn';


interface IconProps
  extends React.DetailedHTMLProps<
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
  ...props
}: IconProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      className={cn(
        {
          'material-symbols-rounded': rounded,
          'material-symbols-outlined': !rounded,
        },
        className,
      )}
      style={{
        fontVariationSettings: filled
          ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
          : '',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {hovered ? hoverIcon || icon : icon}
    </span>
  );
}

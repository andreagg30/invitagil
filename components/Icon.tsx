import React from 'react';
import { cn } from '../utils/cn';
import type { MaterialSymbol } from 'material-symbols';

interface IconProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  icon: MaterialSymbol;
  rounded?: boolean;
}
export default function Icon({
  icon,
  className,
  rounded = true,
  ...props
}: IconProps) {
  return (
    <span
      {...props}
      className={cn(
        {
          'material-symbols-rounded': rounded,
          'material-symbols-outlined': !rounded,
        },
        className,
      )}
    >
      {icon}
    </span>
  );
}

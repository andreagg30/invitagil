import { forwardRef } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "bg-transparent rounded-full outline-0 active:scale-105 h-10 w-10 cursor-pointer transition-all text-black flex items-center justify-center focus:outline-0",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;

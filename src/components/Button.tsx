import { cn } from "../utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "outlined";
  size?: "sm" | "base";
}
export default function Button({
  children,
  className,
  loading,
  variant = "primary",
  disabled,
  size = "base",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "bg-flower font-semibold uppercase text-sm font-body min-h-10 leading-none transition-all text-white py-2 px-4 rounded-full hover:bg-plum",
        "justify-center flex items-center",
        className,
        {
          "bg-white hover:bg-plum/10 text-flower border-2 border-flower":
            variant === "outlined",
          "active:scale-105 cursor-pointer": !disabled,
          'py-1 min-h-8 text-xs': size === 'sm'
        },
        "disabled:bg-gray-300 disabled:border-gray-500 disabled:text-gray-500 disabled:opacity-70",
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

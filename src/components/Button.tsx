import { cn } from "../utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "outlined";
}
export default function Button({
  children,
  className,
  loading,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-flower active:scale-105 h-10 cursor-pointer leading-none transition-all text-white py-2 px-4 rounded-lg hover:bg-plum",
        "justify-center flex items-center",
        className,
        {
          "bg-white hover:bg-plum/10 text-flower border-2 border-flower": variant === "outlined",
        },
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

import { cn } from "@/utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}
export default function Button({
  children,
  className,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-cyan-950 active:scale-105 h-10 cursor-pointer transition-all text-white py-2 px-4 rounded-md hover:bg-cyan-700",
        className,
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

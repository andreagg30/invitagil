import { cn } from "../utils/cn";
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
        "bg-flower active:scale-105 h-10 cursor-pointer transition-all text-white py-2 px-4 rounded-lg hover:bg-plum",
        'justify-center flex',
        className,
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

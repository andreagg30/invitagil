import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export default function IconButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-transparent rounded-full active:scale-105 h-10 w-10 cursor-pointer transition-all text-black flex items-center justify-center focus:outline-0",
        className,
      )}
    >
      {children}
    </button>
  );
}

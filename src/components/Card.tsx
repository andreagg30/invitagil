import { cn } from "../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "soft" | "base";
}

function Card({ children, className, variant='base', ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white flex flex-col rounded-3xl p-8 shadow-[0_28px_90px_rgba(178,58,125,0.16)]",
        {
          "shadow-[0_6px_15px_rgba(47,34,48,0.08)] rounded-xl": variant === "soft",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

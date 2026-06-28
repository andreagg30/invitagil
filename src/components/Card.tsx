import { cn } from "../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-white flex flex-col rounded-3xl p-8 shadow-[0_28px_90px_rgba(178,58,125,0.16)]", className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
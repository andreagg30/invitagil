import { cn } from "../utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-white flex flex-col border-2 rounded-lg p-8 border-flower", className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
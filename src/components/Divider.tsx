import { cn } from "../utils/cn";

interface Props {
  className?: string;
}
export function Divider({ className }: Props) {
  return <div className={cn("h-0.5 bg-border w-full", className)}></div>;
}

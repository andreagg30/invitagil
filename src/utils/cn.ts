import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

//? Construct classNames conditionally (using clsx) and merge them overriding css cascade conflicts (using twMerge)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

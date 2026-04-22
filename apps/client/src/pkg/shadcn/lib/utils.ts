import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// function
export function cn(...inputs: ClassValue[]) {
  // return
  return twMerge(clsx(inputs));
}

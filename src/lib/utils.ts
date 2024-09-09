import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create a sleeper function that takes an argument of ms and returns a promise
// that resolves after the given ms
export function sleeper(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

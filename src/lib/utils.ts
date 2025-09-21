import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/CartSlice";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheCartValues(payload: CartItem): string {
  const jsonPayload = JSON.stringify({ ...payload, quantity: undefined });
  const hash = CryptoJS.SHA256(jsonPayload).toString();
  return hash;
}

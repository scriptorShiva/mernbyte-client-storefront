import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/CartSlice";
import CryptoJS from "crypto-js";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheCartValues(payload: CartItem): string {
  const jsonPayload = JSON.stringify({ ...payload, quantity: undefined });
  const hash = CryptoJS.SHA256(jsonPayload).toString();
  return hash;
}

export const getMinProductPrice = (product: Product): number => {
  let total = 0;

  Object.values(product.priceConfiguration).forEach((config) => {
    const optionPrices = Object.values(config.availableOptions);
    if (optionPrices.length > 0) {
      const minPrice = Math.min(...optionPrices);
      total += minPrice;
    }
  });

  return total;
};

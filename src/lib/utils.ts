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

export const calculateCartItemTotal = (
  selectedProductConfig: CartItem,
  quantity: number
): number => {
  const addOnsTotalPrice =
    selectedProductConfig.chosenConfiguration.selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
  const categoriesTotalPrice = Object.entries(
    selectedProductConfig.chosenConfiguration.priceConfiguration
  ).reduce((acc, [key, value]: [string, string]) => {
    const category = selectedProductConfig.product?.priceConfiguration[key];
    const selectedOptionPrice = category?.availableOptions[value];
    return acc + selectedOptionPrice;
  }, 0);

  return (categoriesTotalPrice + addOnsTotalPrice) * quantity;
};

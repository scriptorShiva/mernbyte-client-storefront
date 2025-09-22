import { useMemo } from "react";
import { CartItem } from "../store/features/cart/CartSlice";

export function useTotalCart(selectedProductConfig: CartItem) {
  const totalPrice = useMemo(() => {
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

    return categoriesTotalPrice + addOnsTotalPrice;
  }, [selectedProductConfig]);
  return totalPrice;
}

import { Product, Topping } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes

    //   // in redux we don't have permission to directly mutate the state like this instead we have to replace the state with the new state. But in latest update in redux we have immer library which allows us to mutate the state directly
    //   state.value += 1;
    // },
    // In action we will send the payload data
    addToCart: (state, action: PayloadAction<CartItem>) => {
      return {
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            chosenConfiguration: action.payload.chosenConfiguration,
            quantity: action.payload.quantity,
          },
        ],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

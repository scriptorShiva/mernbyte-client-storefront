import { Product, Topping } from "@/lib/types";
import { hashTheCartValues } from "@/lib/utils";
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
  hash?: string;
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
      // Before add it to the cart. We will hash it and store it with the hash in localstorage
      const hash = hashTheCartValues(action.payload);
      const itemWithHash = { ...action.payload, hash };
      // add item to localstorage
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, itemWithHash])
      );

      const itemToAdd = {
        product: action.payload.product,
        chosenConfiguration: action.payload.chosenConfiguration,
        quantity: action.payload.quantity,
        hash: hash,
      };

      // now add to the redux store
      return {
        cartItems: [...state.cartItems, itemToAdd],
      };
    },
    setInitialCartUsingLocalStorage: (
      state,
      action: PayloadAction<CartItem[]>
    ) => {
      state.cartItems.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartUsingLocalStorage } = cartSlice.actions;

export default cartSlice.reducer;

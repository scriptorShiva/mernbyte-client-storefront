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

    changeCartItemQty: (
      state,
      action: PayloadAction<{ hash: string; qty: number }>
    ) => {
      // we will check if current item hash matches with the hash in the action payload and if it matches then we will update the quantity
      const itemIdx = state.cartItems.findIndex(
        (item) => item.hash === action.payload.hash
      );

      if (action.payload.qty === 0) {
        state.cartItems.splice(itemIdx, 1);
        // remove from local storage
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems)
        );
        return;
      }
      /**
       * 1 --> 0+1 = 1
       * -1 --> -1 + 1 = 0
       */
      if (itemIdx !== -1) {
        const newQty = state.cartItems[itemIdx].quantity + action.payload.qty;
        state.cartItems[itemIdx].quantity = newQty > 0 ? newQty : 1; // optional: prevent 0
      }

      // add in local storage
      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartUsingLocalStorage, changeCartItemQty } =
  cartSlice.actions;

export default cartSlice.reducer;

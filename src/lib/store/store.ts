import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer, //  must be an object of key: reducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

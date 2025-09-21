"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { setInitialCartUsingLocalStorage } from "@/lib/store/features/cart/CartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // benifit of using useRef is that on re-render the storeRef will persist and also on change this will not re-render
  const storeRef = useRef<AppStore | null>(null);
  // storeRef.current is the way to get the value from useRef. so we are checking if in ref store does not exit then create a new store.
  if (!storeRef.current) {
    // call makeStore function if store does not exist
    storeRef.current = makeStore();
    // we can add inital data here after page load.
    // What we have to do is on page refresh we have to persist cart data in store with the help of local Storage.
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    if (isLocalStorageAvailable) {
      const cartItems = localStorage.getItem("cartItems");
      // json.parse is causing errors sometimes make sure to add it in try catch block
      try {
        const parsedItems = JSON.parse(cartItems as string);
        if (cartItems) {
          storeRef.current.dispatch(
            setInitialCartUsingLocalStorage(parsedItems)
          );
        }
      } catch (error) {
        const err = error as Error;
        throw new Error("Failed to parse cartItems", err);
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

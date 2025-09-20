"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";

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
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

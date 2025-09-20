// This compoennt will be the client component so that we can use Redux Toolkit hooks here.

"use client";
import { Button } from "@/components/ui/button";
import { increment } from "../../../lib/store/features/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCounter = () => {
  // for calling to the store we need dispacher first to make a action
  const dispatch = useAppDispatch();

  // to get that incremental data, and whichever component calling this will have to re-render it automatically
  const value = useAppSelector((state) => state.cart.value);
  const handleIncreemnter = () => {
    dispatch(increment());
  };
  return (
    <>
      <div>
        <Link className="hover:text-primary" href={"/cart"}>
          <ShoppingBasket />
        </Link>
        <span className="absolute -top-4 -right-4 h-6 bg-primary rounded-full text-white font-bold p-2 flex items-center justify-center text[2px]">
          {value}
        </span>
      </div>

      <Button onClick={handleIncreemnter}>Test Inc</Button>
    </>
  );
};

export default CartCounter;

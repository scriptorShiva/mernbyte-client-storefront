// This compoennt will be the client component so that we can use Redux Toolkit hooks here.

"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCounter = () => {
  // As dispatch thing we already did on ProductDialog component here, we only use it here to get the data from the store
  const cartItemsCount = useAppSelector((state) => state.cart.cartItems.length);

  return (
    <>
      <div>
        <Link className="hover:text-primary" href={"/cart"}>
          <ShoppingBasket />
        </Link>
        <span className="absolute -top-4 -right-4 h-6 bg-primary rounded-full text-white font-bold p-2 flex items-center justify-center text[2px]">
          {cartItemsCount}
        </span>
      </div>
    </>
  );
};

export default CartCounter;

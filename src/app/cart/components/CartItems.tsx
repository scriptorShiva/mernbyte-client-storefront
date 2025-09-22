"use client";

import React, { useMemo } from "react";
import CartCard from "../components/CartCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { calculateCartItemTotal } from "@/lib/utils";

const CartItems = () => {
  // get data from redux store
  const cartData = useAppSelector((state) => state.cart.cartItems);

  // calculate total pricing
  const totalFinalPricingOfAllCartItems = useMemo(() => {
    return cartData.reduce((acc, item) => {
      return acc + calculateCartItemTotal(item, item.quantity);
    }, 0);
  }, [cartData]);

  if (!cartData || cartData.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md py-16 px-8 space-y-4">
        <ShoppingCart className="w-16 h-16 text-gray-400" />
        <div className="text-center text-xl font-semibold text-gray-700">
          Your cart is empty
          <div className="text-center text-gray-400 text-sm font-semibold">
            Looks like you haven&apos;t added any items yet.
          </div>
        </div>

        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-white font-medium hover:bg-primary/90 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <div>
      <section className="bg-white rounded-xl shadow-sm divide-y-2 overflow-hidden max-h-[500px] overflow-y-auto scrollbar-thin px-6">
        {cartData.map((item, index) => (
          <CartCard key={index} item={item} />
        ))}
      </section>

      <section className="my-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
        <div className="text-lg font-semibold">
          Total : <span className="">₹ {totalFinalPricingOfAllCartItems}</span>
        </div>
        <Button
          size="lg"
          className="mt-4 sm:mt-0 rounded-full shadow-md cursor-pointer"
        >
          Proceed to Checkout
        </Button>
      </section>
    </div>
  );
};

export default CartItems;

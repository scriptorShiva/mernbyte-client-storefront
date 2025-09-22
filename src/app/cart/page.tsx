import React from "react";
import CartItems from "./components/CartItems";

const Cart = () => {
  return (
    <>
      <div className="container mx-auto px-[150px]">
        <header className="text-center py-[50px]">
          <div className="text-2xl font-bold tracking-tight">
            {" "}
            🛒 Your Shopping Cart
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            Review your items and proceed to checkout.
          </p>
        </header>

        <section>
          <CartItems />
        </section>
      </div>
    </>
  );
};

export default Cart;

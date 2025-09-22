import React from "react";
import Image from "next/image";
import QuantitySelector from "@/components/custom/QuantitySelector";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, Topping } from "@/lib/types";
import { useAppDispatch } from "@/lib/store/hooks";
import { changeCartItemQty } from "@/lib/store/features/cart/CartSlice";
import { useTotalCart } from "@/lib/hooks/useTotalCart";

type ItemProps = {
  product: Product;
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  quantity: number;
  hash?: string;
};

const CartCard = ({ item }: { item: ItemProps }) => {
  const { product, chosenConfiguration, quantity } = item;
  // redux
  const dispatch = useAppDispatch();

  // usehook for updating price
  const totalPrice = useTotalCart(item);

  return (
    <>
      <section className="bg-white max-w-full grid grid-cols-12  justify-center items-center">
        <div className="flex gap-4 col-span-6">
          <section className="p-2">
            <Image
              className="rounded-2xl"
              src={product.imageUrl}
              alt={"logo"}
              width={100}
              height={100}
            />
          </section>
          <section className="flex flex-col justify-center">
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500 italic">
              {Object.entries(chosenConfiguration.priceConfiguration).map(
                ([key, value], index, array) => (
                  <span key={key}>
                    <span>{key}: </span>
                    <span>{value}</span>

                    {index < array.length - 1 && <span> | </span>}
                  </span>
                )
              )}
            </div>
            <div className="text-sm text-gray-500 italic">
              <span>AddOns : </span>
              {chosenConfiguration.selectedToppings.map((topping, index) => (
                <span key={topping._id}>
                  <span>{topping.label}</span>
                  {index < chosenConfiguration.selectedToppings.length - 1 && (
                    <span> , </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="m-auto col-span-4">
          <QuantitySelector
            value={quantity}
            onIncrease={() => {
              dispatch(changeCartItemQty({ hash: item.hash!, qty: 1 }));
            }}
            onDecrease={() => {
              dispatch(changeCartItemQty({ hash: item.hash!, qty: -1 }));
            }}
            //max={100}
            //min={5}
          />
        </section>

        <section>
          <div className="font-bold text-lg">
            <span>₹</span> <span>{totalPrice * quantity}</span>
          </div>
        </section>

        <section>
          <Button
            size="icon"
            className="rounded-full bg-red-200 text-red-500  hover:bg-red-600 hover:text-white
               shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => {
              dispatch(changeCartItemQty({ hash: item.hash!, qty: 0 }));
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </section>
      </section>
    </>
  );
};

export default CartCard;

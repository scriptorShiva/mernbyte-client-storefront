import React, { useState } from "react";
import ToppingsCheckboxGroup from "./ToppingsCheckboxGroup";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RadioGroupSelector from "@/components/custom/RadioGroup";
import Image from "next/image";
import { Product } from "@/lib/types";

const ProductDialog = ({ product }: { product: Product }) => {
  const [size, setSize] = useState("");

  const [toppings, setToppings] = useState<string[]>([]);
  return (
    <div>
      {/* Dialog box */}
      <Dialog>
        <div className="flex justify-end mx-2">
          <DialogTrigger className="rounded-full bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 shadow hover:shadow-lg hover:text-white cursor-pointer outline-none ease-linear transition-all duration-100 w-full ">
            Order Now
          </DialogTrigger>
        </div>
        <DialogContent className="max-w-3xl p-0 m-0">
          <div className="flex gap-6 h-full">
            {/* left-section */}
            <div className="bg-white flex justify-center items-center w-2/3 h-full rounded-l-xl">
              <Image
                src={product.imageUrl}
                alt={`${product.name}`}
                width={150}
                height={200}
                className="object-contain"
              />
            </div>

            {/* right section */}
            <div className="m-2">
              <section>
                <div className=" text-xl font-bold">{product.name}</div>
                <div className="text-sm">{product.description}</div>
              </section>

              {Object.entries(product.priceConfiguration).map(
                ([key, value]) => (
                  <section className="mt-6" key={key}>
                    <RadioGroupSelector
                      name={`Choose the ${key}`}
                      options={Object.keys(value.availableOptions).map((k) => ({
                        value: k,
                        label: k,
                      }))}
                      value={size}
                      onChange={setSize}
                    />
                  </section>
                )
              )}

              <section className="mt-6">
                <ToppingsCheckboxGroup
                  name="Toppings"
                  options={[
                    {
                      value: "cheeze",
                      label: "Cheeze",
                      image: "/logo.png",
                      price: 5,
                    },
                    {
                      value: "paneer",
                      label: "Paneer",
                      image: "/logo.png",
                      price: 10,
                    },
                    {
                      value: "soyabean",
                      label: "Soyabean",
                      image: "/logo.png",
                      price: 15,
                    },
                  ]}
                  value={toppings}
                  onChange={setToppings}
                />
              </section>

              <section className="mt-8 mb-4 flex justify-between align-center">
                <div>
                  <span className="font-medium">Price:</span>
                  <span className="font-medium"> ₹{100}</span>
                </div>
                <div>
                  <Button size={"sm"} className="cursor-pointer">
                    <ShoppingCart />
                    <span className="font-medium">Add to Cart</span>
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDialog;

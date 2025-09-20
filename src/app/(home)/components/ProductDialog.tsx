import React, { useState } from "react";
import AddOnsCheckboxGroup from "./AddOnsCheckboxGroup";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RadioGroupSelector from "@/components/custom/RadioGroup";
import Image from "next/image";
import { Product, Topping } from "@/lib/types";

type selectedCategories = {
  [key: string]: string;
};
const ProductDialog = ({ product }: { product: Product }) => {
  const [selectedCategories, setSelectedCategories] =
    useState<selectedCategories>({});

  const [AddOns, setAddOns] = useState<Topping[]>([]);

  // methods
  const handleSelectedCategories = (key: string, value: string) => {
    setSelectedCategories((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSelectedAddOns = (value: Topping[]) => {
    console.log(value, "vavvvv");
    setAddOns(value);
  };

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
            <div className="bg-white flex justify-center items-center w-2/3 h-full rounded-l-xl px-2">
              <Image
                src={product.imageUrl}
                alt={`${product.name}`}
                width={150}
                height={200}
                className="object-contain"
              />
            </div>

            {/* right section */}
            <div className=" flex flex-col m-2 w-full">
              <section>
                <div className=" text-xl font-bold">{product.name}</div>
                <div className="text-sm">{product.description}</div>
              </section>

              <section className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                {Object.entries(product.priceConfiguration).map(
                  ([key, value]) => (
                    <section className="mt-6" key={key}>
                      <RadioGroupSelector
                        name={`Choose the ${key}`}
                        options={Object.keys(value.availableOptions).map(
                          (k) => ({
                            value: k,
                            label: k,
                          })
                        )}
                        defaultValue={value.availableOptions[0]}
                        onChange={(value) =>
                          handleSelectedCategories(key, value)
                        }
                        value={selectedCategories[key]}
                      />
                    </section>
                  )
                )}

                {product.toppings && product.toppings.length > 0 && (
                  <section className="mt-6 h-full">
                    <AddOnsCheckboxGroup
                      name="AddOns"
                      options={product.toppings.map((topping) => ({
                        _id: topping._id,
                        label: topping.name,
                        image: topping.image,
                        price: topping.price,
                      }))}
                      value={AddOns}
                      onChange={handleSelectedAddOns}
                    />
                  </section>
                )}
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

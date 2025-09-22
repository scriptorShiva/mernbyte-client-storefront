import React, { useMemo, useState } from "react";
import AddOnsCheckboxGroup from "./AddOnsCheckboxGroup";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RadioGroupSelector from "@/components/custom/RadioGroup";
import Image from "next/image";
import { Product, Topping } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/CartSlice";
import { hashTheCartValues } from "@/lib/utils";
import { notify } from "@/components/custom/Toast";
import { useTotalCart } from "@/lib/hooks/useTotalCart";

type selectedCategories = {
  [key: string]: string;
};
const ProductDialog = ({ product }: { product: Product }) => {
  // dispatch
  const dispatch = useAppDispatch();

  // getting the cart values
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  // state
  const [setDialogOpen, setDialogOpenState] = useState(false);

  // default categories fetch
  const defaultCategory = Object.entries(product.category.priceConfiguration)
    .map(([key, value]) => {
      return {
        [key]: value.availableOptions[0],
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [selectedCategories, setSelectedCategories] =
    useState<selectedCategories>(
      defaultCategory as unknown as selectedCategories
    );

  const [AddOns, setAddOns] = useState<Topping[]>([]);

  // // using useMemo for compute the price not on each render but only on dependency change. (Memoise) --> It has its own cost
  // const totalPrice = React.useMemo(() => {
  //   const addOnsTotalPrice = AddOns.reduce((acc, curr) => acc + curr.price, 0);
  //   const categoriesTotalPrice = Object.entries(selectedCategories).reduce(
  //     (acc, [key, value]: [string, string]) => {
  //       const category = product?.priceConfiguration[key];
  //       const selectedOptionPrice = category?.availableOptions[value];
  //       return acc + selectedOptionPrice;
  //     },
  //     0
  //   );

  //   return categoriesTotalPrice + addOnsTotalPrice;
  // }, [AddOns, selectedCategories, product.priceConfiguration]);

  // we have replaced the above logic with custom hook as its a reusable item
  const totalPrice = useTotalCart({
    product,
    chosenConfiguration: {
      priceConfiguration: selectedCategories,
      selectedToppings: AddOns,
    },
    quantity: 0,
  });

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
    setAddOns(value);
  };

  const handleAddToCart = (product: Product) => {
    // add to cart logic
    // item to add
    const itemToAdd = {
      product,
      chosenConfiguration: {
        priceConfiguration: selectedCategories,
        selectedToppings: AddOns,
      },
      quantity: 1,
    };
    dispatch(addToCart(itemToAdd));

    // close dialog
    setDialogOpenState(false);

    // clear selected addons
    setAddOns([]);

    // add tost message
    notify.success("Item added to cart");
  };

  const isCartWithValuesAlreadyExist = useMemo(() => {
    const currentConfiguration = {
      product: product,
      chosenConfiguration: {
        priceConfiguration: selectedCategories,
        selectedToppings: AddOns,
      },
      quantity: 1,
    };

    const hashCurrentConfig = hashTheCartValues(currentConfiguration);

    return cartItems.some((item) => item.hash === hashCurrentConfig);
  }, [product, selectedCategories, AddOns, cartItems]);

  return (
    <div>
      {/* Dialog box */}
      <Dialog open={setDialogOpen} onOpenChange={setDialogOpenState}>
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
                        defaultValue={Object.keys(value.availableOptions)[0]}
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
                  <span className="font-medium"> ₹{totalPrice}</span>
                </div>
                <div>
                  <Button
                    size={"sm"}
                    className={`cursor-pointer flex items-center space-x-2 transition-all ${
                      isCartWithValuesAlreadyExist
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isCartWithValuesAlreadyExist ? (
                      <CircleCheckBig />
                    ) : (
                      <ShoppingCart />
                    )}
                    <span className="font-medium">
                      {isCartWithValuesAlreadyExist
                        ? "Go to Cart"
                        : "Add to Cart"}
                    </span>
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

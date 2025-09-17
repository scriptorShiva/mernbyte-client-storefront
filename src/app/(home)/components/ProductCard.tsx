"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RadioGroupSelector from "@/components/custom/RadioGroup";
import { useState } from "react";
import ToppingsCheckboxGroup from "./ToppingsCheckboxGroup";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropTypes = {
  product: Product;
};

const ProductCard = ({ product }: PropTypes) => {
  const [size, setSize] = useState("small");
  const [crust, setCrust] = useState("thin");
  const [toppings, setToppings] = useState<string[]>([]);
  return (
    <div>
      <Card className="border-none rounded-xl">
        <CardHeader className="flex items-center justify-center">
          {/* Use numbers for width and height */}
          <Image src="/logo.png" alt={product.id} width={150} height={150} />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            <span className="text-sm">From</span>
            <span className="font-bold"> ₹{product.price}</span>
          </p>
          {/* Dialog box */}
          <Dialog>
            <DialogTrigger className="rounded-full bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 shadow hover:shadow-lg hover:text-white cursor-pointer outline-none ease-linear transition-all duration-100">
              Choose
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 m-0">
              <div className="flex gap-6 h-full">
                {/* left-section */}
                <div className="bg-white flex justify-center items-center w-2/3 h-full rounded-l-xl">
                  <Image
                    src="/logo.png"
                    alt={product.name}
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

                  <section className="mt-6">
                    <RadioGroupSelector
                      name="Choose the size"
                      options={[
                        { value: "small", label: "Small" },
                        { value: "medium", label: "Medium" },
                        { value: "large", label: "Large" },
                      ]}
                      value={size}
                      onChange={setSize}
                    />
                  </section>

                  <section className="mt-6">
                    <RadioGroupSelector
                      name="Choose the crust"
                      options={[
                        { value: "thin", label: "Thin" },
                        { value: "thick", label: "Thick" },
                      ]}
                      value={crust}
                      onChange={setCrust}
                    />
                  </section>

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
                      <span className="font-medium"> ₹{product.price}</span>
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;

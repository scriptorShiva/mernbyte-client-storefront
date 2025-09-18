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

import { Product } from "@/lib/types";
import ProductDialog from "./ProductDialog";

type PropTypes = {
  product: Product;
};

const ProductCard = ({ product }: PropTypes) => {
  return (
    <div>
      <Card className="border-none rounded-xl">
        <CardHeader className="flex items-center justify-center h-[200px]">
          {/* Use numbers for width and height */}
          <Image
            src={product.imageUrl}
            alt={product._id}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-contain"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            <span className="text-sm">Starting from : </span>
            <span className="font-bold text-xl "> ₹{100}</span>
          </p>
        </CardFooter>

        <ProductDialog product={product} />
      </Card>
    </div>
  );
};

export default ProductCard;

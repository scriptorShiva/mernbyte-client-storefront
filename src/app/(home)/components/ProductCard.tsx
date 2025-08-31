import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  return (
    <div>
      <Card className="border-none rounded-xl ">
        <CardHeader className="flex items-center justify-center">
          <Image
            src={"/logo.png"}
            alt={product.id}
            width={"150"}
            height={"150"}
          />
        </CardHeader>
        <CardContent>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p>
            <span className="text-sm">From</span>
            <span className="font-bold"> ₹200</span>
          </p>

          <Button className="rounded-full bg-orange-200 hover:orange-bg-300 text-orange-500 px-6 py-2 shadow hover:shadow-lg hover:text-white cursor-pointer outline-none ease-linear transition-all duration-100">
            Choose
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ProductCard;

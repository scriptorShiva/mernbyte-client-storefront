import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { Product } from "./components/ProductCard";

export default function Home() {
  // product list rought structure
  const productList: Product[] = [
    {
      id: "1",
      name: "Pizza Margherita",
      description: "Classic cheese pizza with fresh basil and tomato sauce.",
      image: "./hero.png",
      price: 10,
    },
    {
      id: "2",
      name: "Veggie Supreme",
      description: "Loaded with capsicum, onion, tomato, corn, and olives.",
      image: "./hero.png",
      price: 12,
    },
    {
      id: "3",
      name: "Paneer Tikka Pizza",
      description: "Spicy paneer chunks with onion and capsicum topping.",
      image: "./hero.png",
      price: 14,
    },
    {
      id: "4",
      name: "Farmhouse Special",
      description: "Mushrooms, capsicum, onion, and tomato on cheesy base.",
      image: "./hero.png",
      price: 15,
    },
    {
      id: "5",
      name: "Cheese Burst",
      description: "Extra cheesy delight with gooey molten cheese center.",
      image: "./hero.png",
      price: 16,
    },
    {
      id: "6",
      name: "Spicy Mexican",
      description: "Jalapeños, olives, and spicy sauce for a fiery flavor.",
      image: "./hero.png",
      price: 17,
    },
    {
      id: "7",
      name: "Peri Peri Pizza",
      description: "Tangy peri-peri sauce with corn and paneer toppings.",
      image: "./hero.png",
      price: 18,
    },
    {
      id: "8",
      name: "Classic Margherita XL",
      description: "Extra-large version of the classic cheesy margherita.",
      image: "./hero.png",
      price: 20,
    },
  ];

  return (
    <>
      {/* section A */}
      <section className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-[50px]">
          {/* left */}
          <div>
            <h1 className="text-6xl font-black font-sans">
              Everything You Need <br />{" "}
              <span className="text-primary">Around the Corner</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-sung">
              Support nearby sellers and get what you want, whenever you want.
            </p>
            <Button
              className="mt-8 text-lg rounded-full py-7 px-6 font-bold cursor-pointer"
              size={"lg"}
            >
              Explore Around You
            </Button>
          </div>
          {/* right */}
          <div>
            <Image width={"700"} height={"700"} src={"/hero.png"} alt="hero" />
          </div>
        </div>
      </section>

      {/* section B */}
      <section className="container mx-auto mt-10 px-[50px]">
        <Tabs defaultValue="category-a">
          <TabsList className="space-x-8 bg-orange-300">
            <TabsTrigger className="cursor-pointer" value="category-a">
              Category A
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="category-b">
              Category B
            </TabsTrigger>
          </TabsList>
          <TabsContent value="category-a">
            <div className="grid grid-cols-4 gap-6 mt-6">
              {productList && productList.length > 0 ? (
                productList.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })
              ) : (
                <p>No products available</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="category-b">
            Make changes to your category-b here.
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

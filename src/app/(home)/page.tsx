import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard, { Product } from "./components/ProductCard";

export default function Home() {
  // product list rought structure
  const productList: Product[] = [
    {
      id: "1",
      name: "product A",
      description: "describe",
      image: "./hero.png",
      price: 10,
    },
    {
      id: "2",
      name: "product B",
      description: "describe",
      image: "./hero.png",
      price: 12,
    },
  ];
  return (
    <>
      {/* section A */}
      <section className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-[50px]">
          {/* left */}
          <div>
            <h1 className="text-7xl font-black font-sans ">
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
      <section className="container mx-auto mt-10">
        <Tabs defaultValue="category-a">
          <TabsList className="space-x-8 bg-orange-300">
            <TabsTrigger value="category-a">Category A</TabsTrigger>
            <TabsTrigger value="category-b">Category B</TabsTrigger>
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

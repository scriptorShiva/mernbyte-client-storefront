import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductList from "./components/ProductList";
import { Suspense } from "react";

export default async function Home() {
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
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </>
  );
}

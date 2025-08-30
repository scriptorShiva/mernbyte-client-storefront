import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
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
              Shop Nearby
            </Button>
          </div>
          {/* right */}
          <div>
            <Image width={"700"} height={"700"} src={"/hero.png"} alt="hero" />
          </div>
        </div>
      </section>
    </>
  );
}

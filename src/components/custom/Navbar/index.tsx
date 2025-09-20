import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPinHouse } from "lucide-react";
import Link from "next/link";
import { Store } from "@/lib/types";
import CartCounter from "./CartCounter";

const Navbar = async () => {
  const storeRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/kong/api/auth/tenants`,
    {
      next: {
        revalidate: 3600, // 1hour
      },
    }
  );

  // this is a dagerous step as sometimes data is not serialized or some error data came and we render it , so we have to fix that.
  // fix
  if (!storeRes.ok) {
    throw new Error("Failed to fetch stores");
  }
  const stores: { data: Store[] } = await storeRes.json();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-[100px]">
        {/* left side */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto"
            width={"100"}
            height={"100"}
          />
          <span className="font-bold text-gray-600 ">
            <span className="text-primary">monk</span>Market
          </span>
          <div className="px-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Stores" />
              </SelectTrigger>
              <SelectContent>
                {stores.data.map((store: Store) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={store.id}
                    value={store.id}
                  >
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* right side */}
        <div>
          <ul className="flex space-x-8">
            <li>
              <Link className="hover:text-primary" href={"/"}>
                Menu
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={"/"}>
                Orders
              </Link>
            </li>
            <li className="relative">
              <CartCounter />
            </li>
            <li>
              <Link href={"/"} className="flex space-x-2 hover:text-primary">
                <MapPinHouse />
                <span> North East, Delhi</span>
              </Link>
            </li>
            <li>
              <Button size={"sm"}>Logout</Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

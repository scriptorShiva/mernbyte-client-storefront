"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Store } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const StoreSelect = ({ stores }: { stores: { data: Store[] } }) => {
  const router = useRouter();
  // for get query params
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  // methods
  const handleOnStoreSelectChange = (id: string) => {
    if (id === "clear") {
      router.push("/", { scroll: false }); // clears filter, no scroll
    } else {
      router.push(`/?storeId=${id}`, { scroll: false }); // prevents page scroll
    }
  };

  return (
    <div>
      <Select
        onValueChange={handleOnStoreSelectChange}
        defaultValue={storeId || ""}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Stores" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clear" className="text-gray-500 italic">
            All Stores
          </SelectItem>
          {stores.data.map((store: Store) => (
            <SelectItem
              className="cursor-pointer"
              key={store.id}
              value={String(store.id)}
            >
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StoreSelect;

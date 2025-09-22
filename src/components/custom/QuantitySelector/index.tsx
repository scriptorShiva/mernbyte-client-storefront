import { Button } from "@/components/ui/button";
import React from "react";

interface QuantitySelectorProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantitySelector = ({
  value,
  onIncrease,
  onDecrease,
  min = 1,
  max = 100,
}: QuantitySelectorProps) => {
  return (
    <>
      <div className="flex gap-2 items-center border border-gray-200 rounded-full bg-gray-200 ">
        <Button
          variant="ghost"
          className="rounded-full hover:bg-gray-300 text-lg cursor-pointer"
          onClick={onDecrease}
          disabled={value <= min}
        >
          -
        </Button>
        <div className="text-center flex">{value}</div>
        <Button
          variant="ghost"
          className="rounded-full hover:bg-gray-300 text-lg cursor-pointer"
          onClick={onIncrease}
          disabled={value >= max}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default QuantitySelector;

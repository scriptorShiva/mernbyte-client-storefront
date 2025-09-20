import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { Topping } from "@/lib/types";

interface Props {
  name: string;
  options: Topping[];
  value: Topping[];
  onChange: (value: Topping[]) => void;
}

const AddOnsCheckboxGroup = ({ name, options, value, onChange }: Props) => {
  return (
    <div>
      <div className="text-sm font-medium mb-2">{name}</div>
      <div className="flex gap-2">
        {options.map((option) => {
          // selected value
          const isSelected = value.some((v) => v._id === option._id);
          return (
            <div key={option._id}>
              <div className="flex items-center">
                <Button
                  className={cn(
                    "p-0 m-0 h-auto rounded-md cursor-pointer font-normal border-2 transition-all",
                    isSelected
                      ? "border-orange-500"
                      : "bg-transparent text-black hover:border-orange-600"
                  )}
                  variant="outline"
                  value={option._id}
                  // here we are toggling on/off in checkbox logic
                  onClick={(e) => {
                    e.preventDefault();
                    const newValue = isSelected
                      ? value.filter((v) => v._id !== option._id)
                      : [...value, option];
                    onChange(newValue);
                  }}
                >
                  <div className="relative flex flex-col items-center justify-between p-2 gap-2 h-28">
                    {isSelected && (
                      <div className="absolute top-1 right-1">
                        <CircleCheck className="text-orange-500" />
                      </div>
                    )}
                    <Image
                      src={option.image}
                      alt={option.label}
                      width={50}
                      height={60}
                      className="object-contain"
                    />
                    <div>
                      <div>{option.label}</div>
                      <div className="text-xs font-medium ">{`₹${option.price}`}</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddOnsCheckboxGroup;

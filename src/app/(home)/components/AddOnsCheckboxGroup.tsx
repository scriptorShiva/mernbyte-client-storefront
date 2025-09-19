import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
  name: string;
  options: { value: string; label: string; image: string; price: number }[];
  value: string[];
  onChange: (value: string[]) => void;
}

const AddOnsCheckboxGroup = ({ name, options, value, onChange }: Props) => {
  return (
    <div>
      <div className="text-sm font-medium mb-2">{name}</div>
      <div className="flex gap-2">
        {options.map((option) => (
          <div key={option.value}>
            <div className="flex items-center">
              <Button
                className={cn(
                  "p-0 m-0 h-auto rounded-md cursor-pointer font-normal border-2 transition-all",
                  value.includes(option.value)
                    ? "border-orange-500"
                    : "bg-transparent text-black hover:border-orange-600"
                )}
                variant="outline"
                value={option.value}
                // here we are toggling on/off in checkbox logic
                onClick={(e) => {
                  e.preventDefault();
                  const newValue = value.includes(option.value)
                    ? value.filter((v) => v !== option.value)
                    : [...value, option.value];
                  onChange(newValue);
                }}
              >
                <div className="relative flex flex-col items-center justify-between p-2 gap-2 h-28">
                  {value.includes(option.value) && (
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
        ))}
      </div>
    </div>
  );
};

export default AddOnsCheckboxGroup;

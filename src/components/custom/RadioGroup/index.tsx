import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";

interface Props {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const RadioGroupSelector = ({ name, value, options, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{name}</div>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-3 gap-4 mt-2"
      >
        <div className="flex items-center space-x-2">
          {options.map((option) => {
            return (
              <div key={option.value} className="flex flex-col items-center">
                <RadioGroupItem
                  id={`${name}-${option.value}`}
                  value={option.value}
                  className="hidden peer"
                  aria-label={option.label}
                />
                <Label
                  htmlFor={`${name}-${option.value}`}
                  className="flex flex-col items-center justify-center cursor-pointer rounded-md border-2 border-muted bg-transparent w-20 p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:bg-primary font-normal"
                >
                  {option.label}
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioGroupSelector;

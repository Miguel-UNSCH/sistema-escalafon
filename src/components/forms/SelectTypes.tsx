import {
  InputsChildrenData,
  InputsPersonalData,
  InputsSpouseData,
} from "@/types";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { LuX } from "react-icons/lu";

type AllInputsData = InputsPersonalData | InputsChildrenData | InputsSpouseData;

interface ISelectTypeProps {
  label: string;
  name: keyof AllInputsData;
  control: Control<AllInputsData>;
  options: { items: string[]; defaultValue: string };
}

export const SelectTypea: React.FC<ISelectTypeProps> = ({
  label,
  name,
  control,
  options,
}) => {
  const [selectedValue, setSelectedValue] = useState(options.defaultValue);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const clearSelect = () => {
    setSelectedValue("");
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block mb-2 font-medium text-text-primary"
      >
        {label}
      </label>
      <div className="flex flex-row items-center border-2 mb-5 px-4 rounded-lg">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id={name}
              value={selectedValue}
              onChange={(e) => {
                handleSelectChange(e);
                field.onChange(e);
              }}
              className="bg-transparent p-2.5 border-transparent w-full text-sm outline-none"
              required
            >
              {options.items.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        />
        {selectedValue && (
          <LuX
            className="text-lg hover:text-[#d20f39] cursor-pointer"
            onClick={clearSelect}
          />
        )}
      </div>
    </div>
  );
};

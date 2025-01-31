import { InputsPersonalData } from "@/types";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { LuUserRound, LuX } from "react-icons/lu";

interface IInputTypeProps {
  label: string;
  name: keyof InputsPersonalData;
  type: "input" | "select";
  control: Control<InputsPersonalData>;
  options: { placeholder: string };
}

export const InputTypea: React.FC<IInputTypeProps> = ({
  label,
  name,
  control,
  options,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block mb-2 font-medium text-text-primary"
      >
        {label}
      </label>
      <div className="flex flex-row items-center border-2 px-4 rounded-lg">
        <LuUserRound />
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              value={inputValue}
              onChange={handleInputChange}
              className="bg-transparent p-2.5 border-transparent w-full text-sm outline-none"
              placeholder={options.placeholder}
              required
            />
          )}
        />
        {inputValue && (
          <LuX
            className="text-lg hover:text-[#d20f39] cursor-pointer"
            onClick={clearInput} // Borra el valor del input cuando se hace clic
          />
        )}
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { LuCheck, LuPenLine, LuUserRound, LuX } from "react-icons/lu";

type Inputs = {
  name: string;
  lastName: string;
  secondName: string;
};

interface IInputTypeProps {
  label: string;
  name: keyof Inputs;
  type: "input" | "select";
  control: Control<Inputs>;
  options: { placeholder: string };
}

export const InputTypea: React.FC<IInputTypeProps> = ({
  label,
  name,
  control,
  options,
}) => {
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
              className="bg-transparent p-2.5 border-transparent hover:border-transparent w-full text-sm outline-none"
              placeholder={options.placeholder}
              required
            />
          )}
        />
        <div className="flex flex-row gap-2">
          <LuPenLine className="text-lg hover:text-[#4c4f69]" />
          <LuCheck className="text-lg hover:text-[#40a02b]" />
          <LuX className="text-lg hover:text-[#d20f39]" />
        </div>
      </div>
    </div>
  );
};

import { InputsChildrenData, InputsPersonalData, InputsSpouseData } from "@/types";
import { IInputBasicFields } from "@/types/input";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { LuX } from "react-icons/lu";

type AllInputsData = InputsPersonalData | InputsChildrenData | InputsSpouseData;

interface IInputsData {
  names: string;
  lastName: string;
}

interface IBasicInputProps {
  control: Control<IInputsData>;
  fields: IInputBasicFields[];
}

export const BasicInput: React.FC<IBasicInputProps> = ({ control, fields }) => (
  <div className={`grid gap-4 md:grid-cols-${fields.length}`}>
    {fields.map((i) => (
      <div key={i.name} className="flex flex-col">
        <label htmlFor={i.name} className="block mb-2 font-medium text-text-primary">
          {i.label}
        </label>
        <div className="flex flex-row items-center mb-5 px-4 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <Controller
            name={i.name as keyof IInputsData}
            control={control}
            defaultValue={i.defaultValue || ""}
            render={({ field }) => (
              <input
                {...field}
                id={i.name}
                className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
                placeholder={i.placeholder}
                required={i?.required}
              />
            )}
          />
        </div>
      </div>
    ))}
  </div>
);

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

export const InputTypea: React.FC<IInputTypeProps> = ({ label, name, control, options }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block mb-2 font-medium text-text-primary">
        {label}
      </label>
      <div className="flex flex-row items-center mb-5 px-4 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
        {/* <LuUserRound /> */}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              value={inputValue}
              onChange={handleInputChange}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
              placeholder={options?.placeholder}
              required
            />
          )}
        />
        {inputValue && <LuX className="text-lg hover:text-[#d20f39] cursor-pointer" onClick={clearInput} />}
      </div>
    </div>
  );
};

interface IInputTypeProps {
  label: string;
  name: keyof AllInputsData;
  type: "input" | "select";
  control: Control<AllInputsData>;
  options: { placeholder: string };
}

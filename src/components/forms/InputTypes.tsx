import React, { useState } from "react";

import { InputsChildrenData, InputsPersonalData, InputsSpouseData } from "@/types";
import { IInputBasicFields, IInputDateFields, IInputFileLabels } from "@/types/input";
import { IStudiesTraining } from "@/utils/personal-file";
import { Control, Controller } from "react-hook-form";
import { LuX } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export interface IInputDateProps {
  control: Control<IStudiesTraining>;
  fields: IInputDateFields[];
}

export const InputDate: React.FC<IInputDateProps> = ({ control, fields }) => {
  return (
    <div className={`grid gap-4 md:grid-cols-${fields.length}`}>
      {fields.map((i) => (
        <div key={i.name}>
          <label htmlFor={i.name} className="block mb-2 font-medium text-text-primary">
            {i.label}
          </label>
          <div className="flex flex-row items-center mb-5 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            {/* From Date Picker */}
            <Controller
              name={`${i.name}Start` as keyof IStudiesTraining}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  id={`${i.name}-from`}
                  className="bg-transparent p-2.5 focus:outline-none focus:border-transparent border-none focus:ring-0 w-full text-sm"
                  required={i.required}
                />
              )}
            />
            <span className="px-2 text-text-primary">-</span>
            {/* To Date Picker */}
            <Controller
              name={`${i.name}End` as keyof IStudiesTraining}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  id={`${i.name}-to`}
                  className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm"
                  required={i.required}
                />
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
interface IInputFileProps {
  control: Control<IStudiesTraining>;
  fields: IInputFileLabels[];
}

export const InputFile: React.FC<IInputFileProps> = ({ control, fields }) => {
  return (
    <div className={`grid gap-4 md:grid-cols-${fields.length}`}>
      {fields.map((i) => (
        <div key={i.name} className="flex flex-col">
          <label htmlFor={i.name} className="block mb-2 font-medium text-text-primary">
            {i.label}
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            {i?.icon}
            <Controller
              name={i.name as keyof IStudiesTraining}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  id={i.name}
                  className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
                  accept=".jpg,.png,.pdf"
                  required={i?.required}
                />
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

interface IBasicInputProps {
  control: Control<IStudiesTraining>;
  fields: IInputBasicFields[];
}

export const BasicInput: React.FC<IBasicInputProps> = ({ control, fields }) => (
  <div className={`grid gap-4 md:grid-cols-${fields.length}`}>
    {fields.map((i) => (
      <div key={i.name} className="flex flex-col">
        <label htmlFor={i.name} className="block mb-2 font-medium text-text-primary">
          {i.label}
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          {i?.icon}
          <Controller
            name={i.name as keyof IStudiesTraining}
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
type AllInputsData = InputsPersonalData | InputsChildrenData | InputsSpouseData;

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

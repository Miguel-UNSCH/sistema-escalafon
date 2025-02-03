import React, { useState } from "react";

import { InputsChildrenData, InputsPersonalData, InputsSpouseData } from "@/types";
import { IBasicSelectFields } from "@/types/select";
import { Control, Controller } from "react-hook-form";
import { LuX } from "react-icons/lu";
import { IStudiesTraining } from "@/utils/personal-file";

interface IBasicSelectProps {
  control: Control<IStudiesTraining>;
  fields: Array<IBasicSelectFields>;
}

export const BasicSelect: React.FC<IBasicSelectProps> = ({ control, fields }) => {
  return (
    <div className={`grid gap-4 md:grid-cols-${fields.length}`}>
      {fields.map((i) => (
        <div key={i.name}>
          <label htmlFor={i.name} className="block mb-2 font-medium text-text-primary">
            {i.label}
          </label>
          <div className="flex flex-row items-center mb-5 px-4 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <Controller
              name={i.name as keyof IStudiesTraining}
              control={control}
              defaultValue={i.defaultValue || ""}
              render={({ field }) => (
                <select
                  {...field}
                  id={i.name}
                  className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
                  required
                >
                  {i.options.map((option, index) => (
                    <option key={index} value={option.value} className="bg-bg-card">
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

type AllInputsData = InputsPersonalData | InputsChildrenData | InputsSpouseData;

interface ISelectTypeProps {
  label: string;
  name: keyof AllInputsData;
  control: Control<AllInputsData>;
  options: { items: string[]; defaultValue: string };
}

export const SelectTypea: React.FC<ISelectTypeProps> = ({ label, name, control, options }) => {
  const [selectedValue, setSelectedValue] = useState(options.defaultValue);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const clearSelect = () => {
    setSelectedValue("");
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="block mb-2 font-medium text-text-primary">
        {label}
      </label>
      <div className="flex flex-row items-center mb-5 px-4 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
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
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
              required
            >
              {options.items.map((item, index) => (
                <option key={index} value={item} className="bg-bg-card">
                  {item}
                </option>
              ))}
            </select>
          )}
        />
        {selectedValue && <LuX className="text-lg hover:text-[#d20f39] cursor-pointer" onClick={clearSelect} />}
      </div>
    </div>
  );
};

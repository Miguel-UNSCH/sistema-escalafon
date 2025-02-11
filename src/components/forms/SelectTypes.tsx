import React from "react";

import { IBasicSelectFields } from "@/types/select";
import { Control, Controller } from "react-hook-form";
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

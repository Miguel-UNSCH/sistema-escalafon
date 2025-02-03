import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { BasicInput, InputDate, InputFile } from "./InputTypes";
import { BasicSelect } from "./SelectTypes";
import { IFormData } from "@/types";
import { IStudies } from "@/utils/personal-file";

export interface IBasicFormProps {
  formData: IFormData[];
}

export const BasicForm: React.FC<IBasicFormProps> = ({ formData }) => {
  const { control, handleSubmit } = useForm<IStudies>();

  const onSubmit: SubmitHandler<IStudies> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((i, index) => {
        switch (i.type) {
          case "BasicInput":
            return <BasicInput key={index} control={control} fields={i.fields} />;
          case "BasicSelect":
            return <BasicSelect key={index} control={control} fields={i.fields} />;
          case "InputDate":
            return <InputDate key={index} control={control} fields={i.fields} />;
          case "InputFile":
            return <InputFile key={index} control={control} fields={i.fields} />;
          default:
            return null;
        }
      })}

      <div className="flex flex-row justify-between w-full text-[#eff1f5]">
        <button type="button" className="justify-center items-center bg-[#d20f39] px-4 py-2 rounded-lg">
          Volver
        </button>
        <button type="submit" className="justify-center items-center bg-[#40a02b] ml-auto px-4 py-2 rounded-lg">
          Enviar
        </button>
      </div>
    </form>
  );
};

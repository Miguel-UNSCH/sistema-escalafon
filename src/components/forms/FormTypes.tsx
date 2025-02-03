import React from "react";

import { Control, SubmitHandler, useForm } from "react-hook-form";
import { BasicInput, InputDate, InputFile } from "./InputTypes";
import { BasicSelect } from "./SelectTypes";
import { IFormData } from "@/types";
import { IChildrenData, ISpouseData, IStudies, IStudiesTraining } from "@/utils/personal-file";

export interface IBasicFormProps {
  path: string;
  formData: IFormData[];
}

type FormTypeMapping = {
  studies: IStudies;
  spouse: ISpouseData;
  children: IChildrenData;
  studiesTraining: IStudiesTraining;
};

export const BasicForm: React.FC<IBasicFormProps> = ({ path, formData }) => {
  const typeMapping: { [key: string]: keyof FormTypeMapping } = {
    studies: "studies",
    spouse: "spouse",
    children: "children",
    studiesTraining: "studiesTraining",
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formType = typeMapping[path] || "studies";

  const { control, handleSubmit } = useForm<FormTypeMapping[typeof formType]>();

  const onSubmit: SubmitHandler<FormTypeMapping[typeof formType]> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((i, index) => {
        switch (i.type) {
          case "BasicInput":
            return <BasicInput key={index} control={control as Control<FormTypeMapping[typeof formType]>} fields={i.fields} path="studiesTraining" />;
          case "BasicSelect":
            return <BasicSelect key={index} control={control as Control<FormTypeMapping[typeof formType]>} fields={i.fields} />;
          case "InputDate":
            return <InputDate key={index} control={control as Control<FormTypeMapping[typeof formType]>} fields={i.fields} />;
          case "InputFile":
            return <InputFile key={index} control={control as Control<FormTypeMapping[typeof formType]>} fields={i.fields} />;
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

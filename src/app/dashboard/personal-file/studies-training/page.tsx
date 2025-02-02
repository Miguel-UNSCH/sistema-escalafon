"use client";
import React from "react";

import { BasicInput } from "@/components/forms/InputTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { BasicSelect } from "@/components/forms/SelectTypes";

import { studiesTraining as formData } from "@/utils/personal-file";

interface IInputsData {
  names: string;
  lastName: string;
}

const FormTemplateb = () => {
  const { control, handleSubmit } = useForm<IInputsData>();

  const onSubmit: SubmitHandler<IInputsData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((i, index) => {
        switch (i.type) {
          case "BasicInput":
            return <BasicInput key={index} control={control} fields={i.fields} />;
          case "BasicSelect":
            return <BasicSelect key={index} control={control} fields={i.fields} />;
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

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">Estudios y Capacitación</h3>
        <FormTemplateb />
      </div>
    </div>
  );
};

export default page;

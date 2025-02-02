"use client";
import React from "react";

import { BasicInput } from "@/components/forms/InputTypes";
import { IInputBasicData } from "@/types/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { LuUserRound } from "react-icons/lu";

interface IInputsData {
  names: string;
  lastName: string;
}

const FormTemplateb = () => {
  const { control, handleSubmit } = useForm<IInputsData>();

  const inputBasicData: IInputBasicData[] = [
    {
      type: "BasicInput",
      fields: [
        {
          label: "Apellidos y nombres",
          name: "fullName",
          placeholder: "Ingrese sus apellidos y nombres",
          icon: <LuUserRound />,
        },
      ],
    },
    {
      type: "BasicInput",
      fields: [
        {
          label: "Nombres",
          name: "names",
          placeholder: "Ingrese sus  nombres",
          icon: <LuUserRound />,
        },
        {
          label: "apellidos",
          name: "lastName",
          placeholder: "Ingrese sus apellidos",
          icon: <LuUserRound />,
        },
      ],
    },
  ];

  const onSubmit: SubmitHandler<IInputsData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputBasicData.map((inputData, index) => {
        switch (inputData.type) {
          case "BasicInput":
            return <BasicInput key={index} control={control} fields={inputData.fields} />;
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

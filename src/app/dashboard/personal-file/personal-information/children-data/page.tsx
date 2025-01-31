"use client";
import { InputTypea } from "@/components/forms/InputTypes";
import { InputsChildrenData } from "@/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormData {
  label: string;
  name: keyof InputsChildrenData;
  size?: string;
  type: "input" | "select";
  options: InputTypeForm | SelectTypeForm;
}
interface InputTypeForm {
  placeholder: string;
}

interface SelectTypeForm {
  items: string[];
  defaultValue: string;
}

const FormTemplatea = () => {
  const { control, handleSubmit } = useForm<InputsChildrenData>();

  const formData: IFormData[] = [
    {
      label: "Apellidos y nombres",
      name: "fullName",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese sus apellidos y nombres",
      },
    },
    {
      label: "Lugar y fecha de nacimiento",
      name: "birthPlaceAndDate",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese lugar y fecha de nacimiento",
      },
    },
    {
      label: "Edad",
      name: "age",
      type: "input",
      size: "small",
      options: {
        placeholder: "Ingrese su edad",
      },
    },
    {
      label: "Grado de instrucción",
      name: "educationLevel",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su grado de instrucción",
      },
    },
  ];

  const onSubmit: SubmitHandler<InputsChildrenData> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((field, index) => (
        <InputTypea
          key={index}
          label={field.label}
          name={field.name as keyof InputsChildrenData}
          type={field.type}
          control={control}
          options={field.options}
        />
      ))}
      <div className="flex flex-row justify-between w-full text-[#eff1f5]">
        <button
          type="button"
          className="justify-center items-center bg-[#d20f39] px-4 py-2 rounded-lg"
        >
          Volver
        </button>
        <button
          type="submit"
          className="justify-center items-center bg-[#40a02b] ml-auto px-4 py-2 rounded-lg"
        >
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
        <h3 className="font-bold font-montserrat text-xl uppercase">
          Datos de los hijos
        </h3>
        <FormTemplatea />
      </div>
    </div>
  );
};

export default page;

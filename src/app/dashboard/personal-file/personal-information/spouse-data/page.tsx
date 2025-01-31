"use client";
import { InputTypea } from "@/components/forms/InputTypes";
import { InputsSpouseData } from "@/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormData {
  label: string;
  name: keyof InputsSpouseData;
  size?: string;
  type: "input" | "select";
  options: {
    placeholder: string;
  };
}

const FormTemplatea = () => {
  const { control, handleSubmit } = useForm<InputsSpouseData>();

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
      label: "Departamento/Región",
      name: "region",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su departamento o región",
      },
    },
    {
      label: "Provincia",
      name: "province",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su provincia",
      },
    },
    {
      label: "Distrito",
      name: "district",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su distrito",
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
    {
      label: "Profesión",
      name: "profession",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su profesión",
      },
    },
    {
      label: "Ocupación",
      name: "occupation",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su ocupación",
      },
    },
    {
      label: "Centro de Trabajo",
      name: "workplace",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese el nombre de su centro de trabajo",
      },
    },
    {
      label: "Postgrado / Especialización (Título, Año, Universidad)",
      name: "postgraduate",
      type: "input",
      size: "medium",
      options: {
        placeholder:
          "Ingrese su postgrado o especialización (Título, Año, Universidad)",
      },
    },
  ];

  const onSubmit: SubmitHandler<InputsSpouseData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((field, index) => (
        <InputTypea
          key={index}
          label={field.label}
          name={field.name as keyof InputsSpouseData}
          type={field.type}
          control={control}
          options={field.options}
        />
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">
          Datos del Cónyuge
        </h3>
        <FormTemplatea />
      </div>
    </div>
  );
};

export default page;

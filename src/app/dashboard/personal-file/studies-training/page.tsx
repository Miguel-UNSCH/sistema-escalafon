"use client";
import { InputTypea } from "@/components/forms/InputTypes";
import { SelectTypea } from "@/components/forms/SelectTypes";
import { InputsStudiesData } from "@/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormData {
  label: string;
  name: keyof InputsStudiesData;
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
const FormTemplateb = () => {
  const { control, handleSubmit } = useForm<InputsStudiesData>();

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
      label: "Formación Académica",
      name: "academicBackground",
      type: "select",
      size: "medium",
      options: {
        items: [
          "Primaria Completa",
          "Primaria Incompleta",
          "Secundaria Completa",
          "Secundaria Incompleta",
          "Universitario Completo",
          "Universitario Incompleto",
          "Bachiller",
          "Titulado",
          "Postgrado",
          "Técnico Completo",
          "Técnico Incompleto",
          "Técnico Egresado",
          "Técnico Titulado",
        ],
        defaultValue: "Primaria Completa",
      },
    },
    {
      label: "Año (Del, Al)",
      name: "academicYear",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese los años de su formación (Del, Al)",
      },
    },
    {
      label: "Nombre de la institución",
      name: "institutionName",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese el nombre de la institución",
      },
    },
    {
      label: "Otros estudios con certificación",
      name: "otherCertifications",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese otros estudios con certificación",
      },
    },
    {
      label: "Centro de capacitación",
      name: "trainingCenter",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese el nombre del centro de capacitación",
      },
    },
    {
      label: "Materia",
      name: "subject",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese la materia o área de capacitación",
      },
    },
    {
      label: "Profesión o especialidad",
      name: "professionOrSpecialty",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese su profesión o especialidad",
      },
    },
    {
      label: "Periodo (Del, Al)",
      name: "trainingPeriod",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese el periodo de capacitación (Del, Al)",
      },
    },
    {
      label: "Horas Lectivas",
      name: "lectiveHours",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese las horas lectivas",
      },
    },
    {
      label: "Fecha de emisión",
      name: "issueDate",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Ingrese la fecha de emisión",
      },
    },
    {
      label: "Certificado escaneado en PDF",
      name: "certifiedPDF",
      type: "input",
      size: "medium",
      options: {
        placeholder: "Adjunte el certificado en formato PDF",
      },
    },
  ];

  const onSubmit: SubmitHandler<InputsStudiesData> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((field, index) =>
        field.type === "input" ? (
          <InputTypea
            key={index}
            label={field.label}
            name={field.name as keyof InputsStudiesData}
            type={field.type}
            control={control}
            options={field.options}
          />
        ) : (
          <SelectTypea
            key={index}
            label={field.label}
            name={field.name as keyof InputsStudiesData}
            control={control}
            options={field.options}
          />
        )
      )}
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
          Estudios y Capacitación
        </h3>
        <FormTemplateb />
      </div>
    </div>
  );
};

export default page;

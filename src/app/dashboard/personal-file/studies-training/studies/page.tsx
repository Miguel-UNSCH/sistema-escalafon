"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuSave, LuSchool, LuUserRoundPlus } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export type EstudiosFormValues = {
  name: string;
  lastName: string;
  academicFormation: string;
  trainingCenter: string;
  period: string;
  institution: string;
  certifications: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    formState: { errors },
  } = useForm<EstudiosFormValues>();

  const onSubmit: SubmitHandler<EstudiosFormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      {/* Nombres y Apellidos */}
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col font-poppins">
          <label htmlFor="name" className="block mb-2 pl-1 font-medium text-text-primary">
            Nombres
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="name"
              {...register("name", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col font-poppins">
          <label htmlFor="lastName" className="block mb-2 pl-1 font-medium text-text-primary">
            Apellidos
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="lastName"
              {...register("lastName", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Formación Académica */}
      <div className="flex flex-col mb-5 font-poppins">
        <label htmlFor="academicFormation" className="block mb-2 pl-1 font-medium text-text-primary">
          Formación Académica
        </label>
        <div className="flex flex-row items-center pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuSchool />
          <select
            id="academicFormation"
            {...register("academicFormation", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          >
            <option value="">Seleccione un grado</option>
            <option value="Primaria Completa">Primaria Completa</option>
            <option value="Secundaria Completa">Secundaria Completa</option>
            <option value="Bachiller">Bachiller</option>
            <option value="Titulado">Titulado</option>
            <option value="Postgrado">Postgrado</option>
            <option value="Técnico Completo">Técnico Completo</option>
          </select>
        </div>
        {errors.academicFormation && <p className="font-montserrat text-red-500">{errors.academicFormation.message}</p>}
      </div>

      <p>Año(Del, Al)</p>
      <p>Nombre de la institución</p>
      <p>Otros estudios con certificación</p>

      <div className="flex flex-row justify-end items-center gap-2">
        <div className="flex flex-row items-center gap-2 bg-[#7287fd] p-2 rounded-lg">
          <LuUserRoundPlus className="ml-2" />
          <button type="button" className="pr-2">
            Agregar
          </button>
        </div>
        <div className="flex flex-row items-center gap-2 bg-[#179299] p-2 rounded-lg">
          <LuSave className="ml-2" />
          <button type="submit" className="pr-2">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">Estudios</h3>
        <Form />
      </div>
    </div>
  );
};

export default page;

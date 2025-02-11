"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuSave, LuSchool, LuUserRoundPlus } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export type IForm = {
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  edad: number;
  departamento: string;
  provincia: string;
  distrito: string;
  gradoInstruccion: string;
};
const Form = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const [edad, setEdad] = useState<number | null>(null);

  const calculateAge = (birthDate: string) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();

    if (birthDateObj > today) {
      setEdad(0);
      return;
    }

    let edad = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) edad -= 1;

    setEdad(edad < 0 ? 0 : edad);
  };

  useEffect(() => {
    if (edad !== null) setValue("edad", edad);
  }, [edad, setValue]);

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      {/* Nombres y Apellidos */}
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="nombres" className="block mb-2 pl-1 font-medium text-text-primary">
            Nombres
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="nombres"
              {...register("nombres", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
            />
          </div>
          {errors.nombres && <p>{errors.nombres.message}</p>}
        </div>

        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="apellidos" className="block mb-2 pl-1 font-medium text-text-primary">
            Apellidos
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="apellidos"
              {...register("apellidos", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
            />
          </div>
          {errors.apellidos && <p>{errors.apellidos.message}</p>}
        </div>
      </div>

      {/* Lugar de Nacimiento */}
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="departamento" className="block mb-2 pl-1 font-medium text-text-primary">
            departamento
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="departamento"
              {...register("departamento", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
            />
          </div>
          {errors.departamento && <p className="text-red-500">{errors.departamento.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="provincia" className="block mb-2 pl-1 font-medium text-text-primary">
            provincia
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="provincia"
              {...register("provincia", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
            />
          </div>
          {errors.provincia && <p className="text-red-500">{errors.provincia.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="distrito" className="block mb-2 pl-1 font-medium text-text-primary">
            distrito
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="distrito"
              {...register("distrito", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
            />
          </div>
          {errors.distrito && <p className="text-red-500">{errors.distrito.message}</p>}
        </div>
      </div>

      {/* Fecha de Nacimiento */}
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col w-3/4 font-poppins">
          <label htmlFor="fechaNacimiento" className="block mb-2 pl-1 font-medium text-text-primary">
            Fecha de Nacimiento
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="fechaNacimiento"
              type="date"
              {...register("fechaNacimiento", {
                required: "Este campo es obligatorio",
                validate: {
                  notFutureDate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    if (selectedDate > today) {
                      return "La fecha de nacimiento no puede ser en el futuro.";
                    }
                    return true;
                  },
                },
              })}
              onChange={(e) => calculateAge(e.target.value)}
              max={today}
              className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
            />
          </div>
          {errors.fechaNacimiento && <p className="text-red-500">{errors.fechaNacimiento.message}</p>}
        </div>

        {/* Edad */}
        <div className="flex flex-col w-1/4 font-poppins">
          <label htmlFor="edad" className="block mb-2 pl-1 font-medium text-text-primary">
            Edad
          </label>
          <div className="flex flex-row items-center bg-transparent mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg w-full h-full transition-colors">
            <span className="bg-transparent p-2.5 outline-none w-full text-sm">{edad !== null ? edad : ""}</span>
            <input id="edad" type="hidden" value={edad || ""} {...register("edad", { required: "Este campo es obligatorio" })} />
          </div>
          {errors.edad && <p className="text-red-500">{errors.edad.message}</p>}
        </div>
      </div>

      {/* Grado de Instrucción */}
      <div className="flex flex-col mb-5 font-poppins">
        <label htmlFor="gradoInstruccion" className="block mb-2 pl-1 font-medium text-text-primary">
          Grado de Instrucción
        </label>
        <div className="flex flex-row items-center pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuSchool />
          <select
            id="gradoInstruccion"
            {...register("gradoInstruccion", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
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
        {errors.gradoInstruccion && <p className="font-montserrat text-red-500">{errors.gradoInstruccion.message}</p>}
      </div>

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
    <div className="flex flex-col justify-center items-center w-full font-poppins text-[#11111b]">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg w-auto">
        <h3 className="font-montserrat font-bold text-2xl text-center uppercase">datos de los hijos</h3>
        <div className="hidden flex-row justify-evenly items-center gap-2">
          <span className="flex justify-center items-center bg-[#ccd0da] rounded-full w-8 h-8">1</span>
          <div className="flex-grow bg-[#ccd0da] h-1"></div>
          <span className="flex justify-center items-center bg-[#ccd0da] rounded-full w-8 h-8">2</span>
        </div>

        <div className="flex justify-center items-center">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default page;

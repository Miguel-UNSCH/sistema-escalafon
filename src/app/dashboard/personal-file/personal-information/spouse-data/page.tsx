"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuSchool } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export type IForm = {
  nombres: string;
  apellidos: string;
  departamento: string;
  provincia: string;
  distrito: string;
  fechaNacimiento: string;
  edad: number; // calcular con la fecha de nacimiento de manera automatizada
  gradoInstruccion: string;
  profesion: string;
  ocupacion: string;
  centroTrabajo: string;
  tituloPostgrado: string;
};

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data: IForm) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="nombres" className="flex flex-row font-inter font-semibold capitalize">
            nombres
            <LuAsterisk />
          </label>
          <input type="text" placeholder="ingrese sus nombres" {...register("nombres", { required: true })} className="rounded-xl font-poppins" />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.nombres?.message}</span>
        </div>
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="apellidos" className="flex flex-row font-inter font-semibold capitalize">
            apellidos
            <LuAsterisk />
          </label>
          <input type="text" placeholder="ingrese apellidos" {...register("apellidos", { required: true })} className="rounded-xl font-poppins" />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.apellidos?.message}</span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/3">
          <label htmlFor="departamento" className="flex flex-row font-inter font-semibold capitalize">
            departamento
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese su departamento"
            {...register("departamento", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.departamento?.message}</span>
        </div>
        <div className="flex flex-col gap-2 mb-4 w-1/3">
          <label htmlFor="provincia" className="flex flex-row font-inter font-semibold capitalize">
            provincia
            <LuAsterisk />
          </label>
          <input type="text" placeholder="ingrese su provincia" {...register("provincia", { required: true })} className="rounded-xl font-poppins" />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.provincia?.message}</span>
        </div>
        <div className="flex flex-col gap-2 mb-4 w-1/3">
          <label htmlFor="distrito" className="flex flex-row font-inter font-semibold capitalize">
            distrito
            <LuAsterisk />
          </label>
          <input type="text" placeholder="ingrese su distrito" {...register("distrito", { required: true })} className="rounded-xl font-poppins" />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.distrito?.message}</span>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="fechaNacimiento" className="flex flex-row font-inter font-semibold capitalize">
            fecha de nacimiento
            <LuAsterisk />
          </label>
          <input type="date" {...register("fechaNacimiento", { required: true })} className="rounded-xl" />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="edad" className="flex flex-row font-inter font-semibold capitalize">
            edad
            <LuAsterisk />
          </label>
          <input type="number" {...register("edad", { required: true, min: 1 })} className="rounded-xl text-center" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4 font-poppins">
        <label htmlFor="gradoInstruccion" className="flex flex-row font-inter font-semibold capitalize">
          grado de instrucción
          <LuAsterisk />
        </label>
        <div className="flex flex-row items-center pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuSchool />
          <select
            id="gradoInstruccion"
            {...register("gradoInstruccion", { required: "este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none outline-none focus:outline-none focus:ring-0 w-full text-sm"
          >
            <option value="">seleccione un grado</option>
            <option value="Primaria Completa">primaria completa</option>
            <option value="Secundaria Completa">secundaria completa</option>
            <option value="Bachiller">bachiller</option>
            <option value="Titulado">titulado</option>
            <option value="Postgrado">postgrado</option>
            <option value="Técnico Completo">técnico completo</option>
          </select>
        </div>
        {errors.gradoInstruccion && <p className="font-montserrat text-red-500">{errors.gradoInstruccion.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4 w-full">
        <label htmlFor="profesion" className="flex flex-row font-inter font-semibold capitalize">
          profesión
          <LuAsterisk />
        </label>
        <input type="text" placeholder="ingrese su profesión" {...register("profesion", { required: true })} className="rounded-xl font-poppins" />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.profesion?.message}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4 w-full">
        <label htmlFor="ocupacion" className="flex flex-row font-inter font-semibold capitalize">
          ocupación
          <LuAsterisk />
        </label>
        <input type="text" placeholder="ingrese su ocupación" {...register("ocupacion", { required: true })} className="rounded-xl font-poppins" />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.ocupacion?.message}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4 w-full">
        <label htmlFor="centroTrabajo" className="flex flex-row font-inter font-semibold capitalize">
          centro de trabajo
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese su centro de trabajo"
          {...register("centroTrabajo", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.centroTrabajo?.message}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4 w-full">
        <label htmlFor="tituloPostgrado" className="flex flex-row font-inter font-semibold capitalize">
          título postgrado
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese su título de postgrado"
          {...register("tituloPostgrado", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.tituloPostgrado?.message}</span>
      </div>

      <div className="flex flex-row justify-center items-center gap-4 font-montserrat text-[#eff1f5] text-center">
        <button type="button" className="flex flex-row items-center gap-2 bg-[#e64553] hover:bg-[#fe640b] p-2 px-4 rounded-lg text-lg uppercase">
          <LuArrowLeft />
          regresar
        </button>
        <button type="submit" className="flex flex-row items-center gap-2 bg-[#179299] hover:bg-[#40a02b] p-2 px-4 rounded-lg text-lg uppercase">
          siguiente
          <LuArrowRight />
        </button>
      </div>
    </form>
  );
};

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins text-[#11111b]">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-lg">
        {/** si el personal es M (esposa) si es F (esposo) */}
        <h3 className="font-montserrat font-bold text-2xl text-center uppercase">datos de la esposa</h3>
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

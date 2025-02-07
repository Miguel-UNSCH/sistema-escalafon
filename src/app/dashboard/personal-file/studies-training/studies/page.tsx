"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuCirclePlus, LuSchool } from "react-icons/lu";

export type IForm = {
  formacionAcademica: string;
  anoInicio: string;
  anoFin: string;
  institucion: string;
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
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      <div className="flex flex-col gap-2 mb-4 font-poppins">
        <label htmlFor="formacionAcademica" className="flex flex-row font-inter font-semibold capitalize">
          formación académica
          <LuAsterisk />
        </label>
        <div className="flex flex-row items-center pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuSchool />
          <select
            id="formacionAcademica"
            {...register("formacionAcademica", { required: "este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
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
        {errors.formacionAcademica && <p className="font-montserrat text-red-500">{errors.formacionAcademica.message}</p>}
      </div>

      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="anoInicio" className="flex flex-row font-inter font-semibold capitalize">
            año inicio
            <LuAsterisk />
          </label>
          <input type="date" {...register("anoInicio", { required: true })} className="rounded-xl font-poppins" />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="anoFin" className="flex flex-row font-inter font-semibold capitalize">
            año fin
            <LuAsterisk />
          </label>
          <input type="date" {...register("anoFin", { required: true })} className="rounded-xl font-poppins" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="institucion" className="flex flex-row font-inter font-semibold capitalize">
          centro de capacitación
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese el centro de capacitación"
          {...register("institucion", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.institucion?.message}</span>
      </div>

      <div className="flex flex-row justify-end items-end mb-5 p-2 text-[#eff1f5]">
        <button
          type="button"
          className="text-right flex flex-row items-center gap-2 bg-[#04a5e5] px-4 p-2 rounded-xl font-montserrat font-semibold text-sm uppercase"
        >
          <LuCirclePlus />
          agregar estudios
        </button>
      </div>

      <div className="flex flex-row justify-center items-center gap-4 font-montserrat text-[#eff1f5] text-center">
        <button type="button" className="flex flex-row items-center gap-2 bg-[#e64553] hover:bg-[#fe640b] px-4 p-2 rounded-lg text-lg uppercase">
          <LuArrowLeft />
          regresar
        </button>
        <button type="submit" className="flex flex-row items-center gap-2 bg-[#179299] hover:bg-[#40a02b] px-4 p-2 rounded-lg text-lg uppercase">
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
    <div className="flex flex-col justify-center items-center shadow-sm font-poppins text-[#11111b]">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-lg">
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">estudios</h3>
        <div className="flex-row justify-evenly items-center gap-2 hidden">
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

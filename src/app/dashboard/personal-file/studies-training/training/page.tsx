"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { studiesTrainingSchema } from "@/validations/studiesTrainingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuCirclePlus, LuFileUp } from "react-icons/lu";

export type IForm = {
  centroCapacitacion: string;
  materiaCapacitacion: string;
  profesionEspecialidad: string;
  periodoInicio: Date;
  periodoFin: Date;
  horasLectivas: number;
  fechaEmisionCertificado: Date;
  certificadoEscaneado: string; // URL al PDF
};

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(studiesTrainingSchema),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="flex flex-col gap-4 mt-4 w-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="centroCapacitacion" className="flex flex-row font-inter font-semibold capitalize">
            centro de capacitación
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese el centro de capacitación"
            {...register("centroCapacitacion", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.centroCapacitacion?.message}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="materiaCapacitacion" className="flex flex-row font-inter font-semibold capitalize">
            materia de capacitación
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese la materia de capacitación"
            {...register("materiaCapacitacion", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.materiaCapacitacion?.message}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="profesionEspecialidad" className="flex flex-row font-inter font-semibold capitalize">
            profesión/especialidad
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese su profesión o la especialidad"
            {...register("profesionEspecialidad", { required: true })}
            className="rounded-xl font-poppins"
          />
        </div>

        <div className="flex flex-row gap-5 w-full">
          <div className="flex flex-col gap-2 mb-4 w-1/2">
            <label htmlFor="periodoInicio" className="flex flex-row font-inter font-semibold capitalize">
              periodo inicio
              <LuAsterisk />
            </label>
            <input type="date" {...register("periodoInicio", { required: true })} className="rounded-xl font-poppins" />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-1/2">
            <label htmlFor="periodoFin" className="flex flex-row font-inter font-semibold capitalize">
              periodo fin
              <LuAsterisk />
            </label>
            <input type="date" {...register("periodoFin", { required: true })} className="rounded-xl font-poppins" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="horasLectivas" className="flex flex-row font-inter font-semibold capitalize">
              horas lectivas
              <LuAsterisk />
            </label>
            <input type="number" {...register("horasLectivas", { required: true, min: 1 })} className="rounded-xl text-center" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 w-full">
          <div className="flex flex-col gap-2 mb-4 w-2/3">
            <label htmlFor="fechaEmisionCertificado" className="flex flex-row font-inter font-semibold capitalize">
              fecha de emisión del certificado
              <LuAsterisk />
            </label>
            <input type="date" {...register("fechaEmisionCertificado", { required: true })} className="rounded-xl" />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-1/3">
            <label htmlFor="certificadoEscaneado" className="flex flex-row font-inter font-semibold capitalize">
              certificado escaneado
              <LuAsterisk />
            </label>
            <div className="flex flex-row items-center gap-2 p-2 border rounded-xl">
              <LuFileUp />
              <input
                className="flex rounded-xl w-full cursor-pointer focus:outline-none"
                type="file"
                {...register("certificadoEscaneado", { required: true })}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-end items-end mb-5 p-2 text-[#eff1f5]">
          <button
            type="button"
            className="text-right flex flex-row items-center gap-2 bg-[#04a5e5] px-4 p-2 rounded-xl font-montserrat font-semibold text-sm uppercase"
          >
            <LuCirclePlus />
            agregar otra capacitación
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
    </div>
  );
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center shadow-sm font-poppins text-[#11111b]">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-lg">
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">capacitación</h3>
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

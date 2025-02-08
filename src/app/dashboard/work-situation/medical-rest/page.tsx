"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuFileUp } from "react-icons/lu";

export type IForm = {
  tipoDescanso: string;
  documentoSustento: string;
  fechaInicio: Date;
  fechaFin: Date;
  dependenciaOficina: string;
  cargo: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="tipoDescanso" className="flex flex-row font-inter font-semibold capitalize">
          tipo de descanso medico
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese el tipo de descanso medico"
          {...register("tipoDescanso", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.tipoDescanso?.message}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="documentoSustento" className="flex flex-row font-inter font-semibold text-nowrap capitalize">
          documento de sustento
          <LuAsterisk />
        </label>
        <div className="flex flex-row items-center gap-2 p-2 border rounded-xl">
          <LuFileUp />
          <input
            className="flex rounded-xl w-full cursor-pointer focus:outline-none"
            type="file"
            {...register("documentoSustento", { required: true })}
          />
        </div>
      </div>

      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="fechaInicio" className="flex flex-row font-inter font-semibold capitalize">
            fecha inicio
            <LuAsterisk />
          </label>
          <input type="date" {...register("fechaInicio", { required: true })} className="rounded-xl font-poppins" />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="fechaFin" className="flex flex-row font-inter font-semibold capitalize">
            fecha fin
            <LuAsterisk />
          </label>
          <input type="date" {...register("fechaFin", { required: true })} className="rounded-xl font-poppins" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="dependenciaOficina" className="flex flex-row font-inter font-semibold capitalize">
          dependencia o la oficina
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese la dependencia o la oficina"
          {...register("dependenciaOficina", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.dependenciaOficina?.message}</span>
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

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins text-[#11111b]">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-lg">
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">descanso medico</h3>
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

export default Page;

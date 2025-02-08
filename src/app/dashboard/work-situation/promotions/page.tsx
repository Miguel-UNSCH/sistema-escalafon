"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuFileUp } from "react-icons/lu";

export type IForm = {
  resolucionAscenso: string;
  cargoOrigen: string;
  cargoDestino: string;
  nivelRemunerativoInicio: number;
  nivelRemunerativoFin: number;
  pap: string;
  cnp: string;
  dependenciaOficina: string;
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
        <label htmlFor="resolucionAscenso" className="flex flex-row font-inter font-semibold text-nowrap capitalize">
          resolucion de ascenso
          <LuAsterisk />
        </label>
        <div className="flex flex-row items-center gap-2 p-2 border rounded-xl">
          <LuFileUp />
          <input
            className="flex rounded-xl w-full cursor-pointer focus:outline-none"
            type="file"
            {...register("resolucionAscenso", { required: true })}
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="cargoOrigen" className="flex flex-row font-inter font-semibold capitalize">
            cargo inicial
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese el cargo actual"
            {...register("cargoOrigen", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.cargoOrigen?.message}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="cargoOrigen" className="flex flex-row font-inter font-semibold capitalize">
            cargo final
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese el cargo final"
            {...register("cargoOrigen", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.cargoOrigen?.message}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="nivelRemunerativoInicio" className="flex flex-row font-inter font-semibold capitalize">
            nivel remunerativo inicio
            <LuAsterisk />
          </label>
          <input type="number" {...register("nivelRemunerativoInicio", { required: true, min: 1 })} className="rounded-xl text-center" />
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="nivelRemunerativoFin" className="flex flex-row font-inter font-semibold capitalize">
            nivel remunerativo fin
            <LuAsterisk />
          </label>
          <input type="number" {...register("nivelRemunerativoFin", { required: true, min: 1 })} className="rounded-xl text-center" />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="pap" className="flex flex-row font-inter font-semibold uppercase">
            pap
            <LuAsterisk />
          </label>
          <input type="text" placeholder="ingrese su pap" {...register("pap", { required: true })} className="rounded-xl font-poppins" />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.pap?.message}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="cnp" className="flex flex-row font-inter font-semibold uppercase">
            cnp
            <LuAsterisk />
          </label>
          <input type="text" placeholder="ingrese su cnp" {...register("cnp", { required: true })} className="rounded-xl font-poppins" />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.cnp?.message}</span>
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
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">ascensos</h3>
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

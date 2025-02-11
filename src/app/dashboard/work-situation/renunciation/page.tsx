"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuFileUp } from "react-icons/lu";

export type IForm = {
  motivoRenuncia: string;
  fechaRenuncia: Date;
  documentoRenuncia: string;
};
//oficina de tesoreria
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
        <label htmlFor="motivoRenuncia" className="flex flex-row font-inter font-semibold capitalize">
          centro laboral
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese el motivo de la renuncia"
          {...register("motivoRenuncia", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.motivoRenuncia?.message}</span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="fechaRenuncia" className="flex flex-row font-inter font-semibold capitalize">
          fecha de renuncia
          <LuAsterisk />
        </label>
        <input type="date" {...register("fechaRenuncia", { required: true })} className="rounded-xl" />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="documentoRenuncia" className="flex flex-row font-inter font-semibold text-nowrap capitalize">
          documento de renuncia
          <LuAsterisk />
        </label>
        <div className="flex flex-row items-center gap-2 p-2 border rounded-xl">
          <LuFileUp />
          <input
            className="flex rounded-xl w-full cursor-pointer focus:outline-none"
            type="file"
            {...register("documentoRenuncia", { required: true })}
          />
        </div>
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
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">renuncia y liquidacion</h3>
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

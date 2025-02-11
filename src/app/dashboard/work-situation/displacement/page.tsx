"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuFileUp } from "react-icons/lu";

export type IForm = {
  tipo: string;
  documentoRotacion: string;
  fechaDesplazamiento: string;
  oficinaOrigen: string;
  oficinaDestino: string;
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
        <label htmlFor="tipo" className="flex flex-row font-inter font-semibold capitalize">
          tipo de desplazamiento
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese el tipo de desplazamiento"
          {...register("tipo", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.tipo?.message}</span>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="documentoRotacion" className="flex flex-row font-inter font-semibold text-nowrap capitalize">
            documento de rotación
            <LuAsterisk />
          </label>
          <div className="flex flex-row items-center gap-2 p-2 border rounded-xl">
            <LuFileUp />
            <input
              className="flex rounded-xl w-full cursor-pointer focus:outline-none"
              type="file"
              {...register("documentoRotacion", { required: true })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="fechaDesplazamiento" className="flex flex-row font-inter font-semibold capitalize">
            fecha del desplazamiento
            <LuAsterisk />
          </label>
          <input type="date" {...register("fechaDesplazamiento", { required: true })} className="rounded-xl" />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="oficinaOrigen" className="flex flex-row font-inter font-semibold capitalize">
            de la oficina
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese la oficina de origen"
            {...register("oficinaOrigen", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.oficinaOrigen?.message}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-1/2">
          <label htmlFor="oficinaDestino" className="flex flex-row font-inter font-semibold capitalize">
            a la oficina
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese la oficina de destino"
            {...register("oficinaDestino", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.oficinaDestino?.message}</span>
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
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">desplazamiento</h3>
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

"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuCirclePlus, LuFileUp } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export type IForm = {
  centroLaboral: string;
  dependenciaOficina: string;
  cargo: string;
  periodoInicio: string;
  periodoFin: string;
  documentoSustento: string;
  fechaEmision: string; // replantear
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
        <label htmlFor="centroLaboral" className="flex flex-row font-inter font-semibold capitalize">
          centro laboral
          <LuAsterisk />
        </label>
        <input
          type="text"
          placeholder="ingrese la materia de capacitación"
          {...register("centroLaboral", { required: true })}
          className="rounded-xl font-poppins"
        />
        <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.centroLaboral?.message}</span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="dependenciaOficina" className="flex flex-row font-inter font-semibold capitalize">
            dependendia/oficina
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese la materia de capacitación"
            {...register("dependenciaOficina", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.dependenciaOficina?.message}</span>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="cargo" className="flex flex-row font-inter font-semibold capitalize">
            cargo
            <LuAsterisk />
          </label>
          <input
            type="text"
            placeholder="ingrese la materia de capacitación"
            {...register("cargo", { required: true })}
            className="rounded-xl font-poppins"
          />
          <span className="font-montserrat font-semibold text-[#d20f39] text-sm">{errors.cargo?.message}</span>
        </div>
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
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="fechaEmision" className="flex flex-row font-inter font-semibold capitalize">
            fecha de emisión
            <LuAsterisk />
          </label>
          <input type="date" {...register("fechaEmision", { required: true })} className="rounded-xl" />
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
      </div>

      <div className="flex flex-row justify-end items-end mb-5 p-2 text-[#eff1f5]">
        <button
          type="button"
          className="text-right flex flex-row items-center gap-2 bg-[#04a5e5] px-4 p-2 rounded-xl font-montserrat font-semibold text-sm uppercase"
        >
          <LuCirclePlus />
          registrar otra eperiencia
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
    <div className="flex flex-col justify-center items-center font-poppins text-[#11111b]">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-lg">
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">experiencia laboral</h3>
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

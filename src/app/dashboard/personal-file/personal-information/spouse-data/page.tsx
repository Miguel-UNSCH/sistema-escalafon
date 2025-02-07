"use client";

import { SpouseFormValues } from "@/utils/personal-file";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuArrowLeft, LuArrowRight, LuAsterisk, LuMapPin, LuSave, LuSchool } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const SpouseForm = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control,
    setValue,
    formState: { errors },
  } = useForm<SpouseFormValues>();

  const [age, setAge] = useState<number | null>(null);

  const calculateAge = (birthDate: string) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();

    if (birthDateObj > today) {
      setAge(0);
      return;
    }

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) age -= 1;

    setAge(age < 0 ? 0 : age);
  };

  useEffect(() => {
    if (age !== null) setValue("spouseAge", age);
  }, [age, setValue]);

  const onSubmit: SubmitHandler<SpouseFormValues> = (data) => console.log(data);

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      {/* Nombres y Apellidos */}
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col font-poppins">
          <label htmlFor="spouseFirstName" className="block mb-2 font-medium text-text-primary">
            Nombres
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="spouseFirstName"
              {...register("spouseFirstName", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>

          {errors.spouseFirstName && <p>{errors.spouseFirstName.message}</p>}
        </div>

        <div className="flex flex-col font-poppins">
          <label htmlFor="spouseLastName" className="block mb-2 font-medium text-text-primary">
            Apellidos
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="spouseLastName"
              {...register("spouseLastName", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>
          {errors.spouseLastName && <p>{errors.spouseLastName.message}</p>}
        </div>
      </div>

      {/* Lugar de Nacimiento */}
      <div className="flex flex-col font-poppins">
        <label htmlFor="spouseBirthPlace" className="block mb-2 font-medium text-text-primary">
          Lugar de Nacimiento
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuMapPin />
          <input
            id="spouseBirthPlace"
            {...register("spouseBirthPlace", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          />
        </div>
        {errors.spouseBirthPlace && <p className="text-red-500">{errors.spouseBirthPlace.message}</p>}
      </div>

      {/* Fecha de Nacimiento */}
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col w-3/4 font-poppins">
          <label htmlFor="spouseBirthDate" className="block mb-2 font-medium text-text-primary">
            Fecha de Nacimiento
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="spouseBirthDate"
              type="date"
              {...register("spouseBirthDate", {
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
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>
          {errors.spouseBirthDate && <p className="text-red-500">{errors.spouseBirthDate.message}</p>}
        </div>

        {/* Edad */}
        <div className="flex flex-col w-1/4 font-poppins">
          <label htmlFor="age" className="block mb-2 font-medium text-text-primary">
            Edad
          </label>
          <div className="flex flex-row items-center bg-transparent mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg w-full h-full transition-colors">
            <span className="bg-transparent p-2.5 w-full text-sm outline-none">{age !== null ? age : ""}</span>
            <input id="age" type="hidden" value={age || ""} {...register("spouseAge", { required: "Este campo es obligatorio" })} />
          </div>
          {errors.spouseAge && <p className="text-red-500">{errors.spouseAge.message}</p>}
        </div>
      </div>

      {/* Grado de Instrucción */}
      <div className="flex flex-col mb-5 font-poppins">
        <label htmlFor="spouseEducationLevel" className="block mb-2 font-medium text-text-primary">
          Grado de Instrucción
        </label>
        <div className="flex flex-row items-center pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuSchool />
          <select
            id="spouseEducationLevel"
            {...register("spouseEducationLevel", { required: "Este campo es obligatorio" })}
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
        {errors.spouseEducationLevel && <p className="font-montserrat text-red-500">{errors.spouseEducationLevel.message}</p>}
      </div>

      {/* Profesión */}
      <div className="flex flex-col font-poppins">
        <label htmlFor="spouseProfession" className="block mb-2 font-medium text-text-primary">
          Profesión
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <input
            id="spouseProfession"
            {...register("spouseProfession", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          />
        </div>
        {errors.spouseProfession && <p className="text-red-500">{errors.spouseProfession.message}</p>}
      </div>

      {/* Ocupación */}
      <div className="flex flex-col font-poppins">
        <label htmlFor="spouseOccupation" className="block mb-2 font-medium text-text-primary">
          Ocupación
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <input
            id="spouseOccupation"
            {...register("spouseOccupation", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          />
        </div>
        {errors.spouseOccupation && <p className="text-red-500">{errors.spouseOccupation.message}</p>}
      </div>

      {/* Centro de Trabajo */}
      <div className="flex flex-col font-poppins">
        <label htmlFor="spouseWorkplace" className="block mb-2 font-medium text-text-primary">
          Centro de Trabajo
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <input
            id="spouseWorkplace"
            {...register("spouseWorkplace", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          />
        </div>
        {errors.spouseWorkplace && <p className="text-red-500">{errors.spouseWorkplace.message}</p>}
      </div>

      {/* Postgrado / Especialización */}
      <div className="flex flex-col font-poppins">
        <label htmlFor="spousePostgraduateTitle" className="block mb-2 font-medium text-text-primary">
          Título de Postgrado
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <input
            id="spousePostgraduateTitle"
            {...register("spousePostgraduateTitle")}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex flex-row justify-end items-center gap-2">
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
        {/** si el personal es M (esposa) si es F (esposo) */}
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">datos de la esposa</h3>
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

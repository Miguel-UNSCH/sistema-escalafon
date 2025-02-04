"use client";
import { SpouseFormValues } from "@/utils/personal-file";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuMapPin, LuSave, LuSchool } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

const SpouseForm = () => {
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
          <div className="flex flex-row items-center bg-[#9ca0b0] mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg w-full transition-colors">
            <span className="bg-transparent p-2.5 w-full text-sm outline-none">{age !== null ? age : "-"}</span>
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

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">Datos del Cónyuge</h3>
        <SpouseForm />
      </div>
    </div>
  );
};

export default page;

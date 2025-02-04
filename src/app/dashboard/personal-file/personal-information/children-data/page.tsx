"use client";
import { ChildrenFormValues } from "@/utils/personal-file";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuMapPin, LuSave, LuSchool, LuUserRoundPlus } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

const Form = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control,
    setValue,
    formState: { errors },
  } = useForm<ChildrenFormValues>();

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
    if (age !== null) setValue("age", age);
  }, [age, setValue]);

  const onSubmit: SubmitHandler<ChildrenFormValues> = (data) => console.log(data);

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      {/* Nombres y Apellidos */}
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col font-poppins">
          <label htmlFor="name" className="block mb-2 pl-1 font-medium text-text-primary">
            Nombres
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="name"
              {...register("name", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="flex flex-col font-poppins">
          <label htmlFor="lastName" className="block mb-2 pl-1 font-medium text-text-primary">
            Apellidos
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="lastName"
              {...register("lastName", { required: "Este campo es obligatorio" })}
              className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
            />
          </div>
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Lugar de Nacimiento */}
      <div className="flex flex-col font-poppins">
        <label htmlFor="birthPlace" className="block mb-2 pl-1 font-medium text-text-primary">
          Lugar de Nacimiento
        </label>
        <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuMapPin />
          <input
            id="birthPlace"
            {...register("birthPlace", { required: "Este campo es obligatorio" })}
            className="bg-transparent p-2.5 focus:border-transparent border-none focus:outline-none focus:ring-0 w-full text-sm outline-none"
          />
        </div>
        {errors.birthPlace && <p className="text-red-500">{errors.birthPlace.message}</p>}
      </div>

      {/* Fecha de Nacimiento */}
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col w-3/4 font-poppins">
          <label htmlFor="birthDate" className="block mb-2 pl-1 font-medium text-text-primary">
            Fecha de Nacimiento
          </label>
          <div className="flex flex-row items-center mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
            <input
              id="birthDate"
              type="date"
              {...register("birthDate", {
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
          {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
        </div>

        {/* Edad */}
        <div className="flex flex-col w-1/4 font-poppins">
          <label htmlFor="age" className="block mb-2 pl-1 font-medium text-text-primary">
            Edad
          </label>
          <div className="flex flex-row items-center bg-transparent mb-5 pl-2 border border-border-primary focus-within:border-border-focus rounded-lg w-full h-full transition-colors">
            <span className="bg-transparent p-2.5 w-full text-sm outline-none">{age !== null ? age : ""}</span>
            <input id="age" type="hidden" value={age || ""} {...register("age", { required: "Este campo es obligatorio" })} />
          </div>
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
      </div>

      {/* Grado de Instrucción */}
      <div className="flex flex-col mb-5 font-poppins">
        <label htmlFor="educationLevel" className="block mb-2 pl-1 font-medium text-text-primary">
          Grado de Instrucción
        </label>
        <div className="flex flex-row items-center pl-2 border border-border-primary focus-within:border-border-focus rounded-lg transition-colors">
          <LuSchool />
          <select
            id="educationLevel"
            {...register("educationLevel", { required: "Este campo es obligatorio" })}
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
        {errors.educationLevel && <p className="font-montserrat text-red-500">{errors.educationLevel.message}</p>}
      </div>

      <div className="flex flex-row justify-end items-center gap-2">
        <div className="flex flex-row items-center gap-2 bg-[#7287fd] p-2 rounded-lg">
          <LuUserRoundPlus className="ml-2" />
          <button type="button" className="pr-2">
            Agregar
          </button>
        </div>
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
        <h3 className="font-bold font-montserrat text-xl uppercase">Datos de los hijos</h3>
        <Form />
      </div>
    </div>
  );
};

export default page;

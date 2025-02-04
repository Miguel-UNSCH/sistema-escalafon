"use client";
import React from "react";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
type InputTextProps = {
  label: string;
  name: string;
  placeholder: string;
  errorMessage: {
    required: string;
    minLength: { value: number; message: string };
    maxLength: { value: number; message: string };
  };
};

const InputText: React.FC<InputTextProps> = ({ label, name, placeholder, errorMessage }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        placeholder={placeholder}
        {...register(name, {
          required: errorMessage.required,
          minLength: errorMessage.minLength,
          maxLength: errorMessage.maxLength,
        })}
        className="bg-transparent border-none outline-none"
      />
      {errors[name] && <p>{errors[name]?.message}</p>}
    </div>
  );
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputNumber = () => {
  return <div>InputNumber</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputDate = () => {
  return <div>InputDate</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputDates = () => {
  return <div>InputDates</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputCheckbox = () => {
  return <div>InputCheckbox</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputFullName = () => {
  return <div>InputFullName</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputLocation = () => {
  return <div>InputLocation</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputTextArea = () => {
  return <div>InputTextArea</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputDocument = () => {
  return <div>InputDocument</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export const InputPeriod = () => {
  return <div>InputPeriod</div>;
};
/** ---------------------------------------------------------------------------------------------------------------------------------------------- */

type FormValues = {
  name: string;
  email: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        label="Nombre"
        name="name"
        placeholder="Ingrese su nombre"
        errorMessage={{
          required: "Este campo es obligatorio",
          minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
          maxLength: { value: 50, message: "Debe tener como máximo 50 caracteres" },
        }}
      />

      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "El correo electrónico no es válido",
            },
          })}
          className="bg-transparent border-none outline-none"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <button type="submit">Enviar</button>
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

"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";

/** ---------------------------------------------------------------------------------------------------------------------------------------------- */
export type IForm = {
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  sexo: string;
  edad: number;
  dni: string;
  nAutogenerado: string;
  licenciaConducir: string;
  grupoSanguineo: string;
  fechaIngreso: string;
  unidadEstructurada: string;
  fechaNacimiento: string;
  nacionalidad: string;
  domicilio: string;
  interiorUrbanizacion: string;
  telefono: string;
  celular: string;
  email: string;
  regimenPensionario: string;
  nombreAfp: string;
  situacionLaboral: string;
  estadoCivil: string;
  discapacidad: boolean;
  departamento: string; // ubigeo
  provincia: string; // ubigeo
  distrito: string; // ubigeo

  cargo: string;
  dependenciaOficina: string;
};
const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const [edad, setEdad] = useState<number | null>(null);

  const calculateAge = (birthDate: string) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();

    if (birthDateObj > today) {
      setEdad(0);
      return;
    }

    let edad = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) edad -= 1;

    setEdad(edad < 0 ? 0 : edad);
  };

  useEffect(() => {
    if (edad !== null) setValue("edad", edad);
  }, [edad, setValue]);

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col font-poppins">
          <label htmlFor="nombres" className="block mb-2 pl-1 font-medium text-text-primary">
            Nombres
          </label>
          <input
            id="nombres"
            {...register("nombres", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.nombres && <p>{errors.nombres.message}</p>}
        </div>

        <div className="flex flex-col font-poppins">
          <label htmlFor="apellidoPaterno" className="block mb-2 pl-1 font-medium text-text-primary">
            Apellido Paterno
          </label>
          <input
            id="apellidoPaterno"
            {...register("apellidoPaterno", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.apellidoPaterno && <p>{errors.apellidoPaterno.message}</p>}
        </div>

        <div className="flex flex-col font-poppins">
          <label htmlFor="apellidoMaterno" className="block mb-2 pl-1 font-medium text-text-primary">
            Apellido Materno
          </label>
          <input
            id="apellidoMaterno"
            {...register("apellidoMaterno", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.apellidoMaterno && <p>{errors.apellidoMaterno.message}</p>}
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="sexo" className="block mb-2 font-medium text-text-primary">
            Sexo
          </label>
          <select
            id="sexo"
            {...register("sexo", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          >
            <option value="">Seleccione el sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          {errors.sexo && <p>{errors.sexo.message}</p>}
        </div>

        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="grupoSanguineo" className="block mb-2 font-medium text-text-primary">
            Grupo sanguíneo
          </label>
          <input
            id="grupoSanguineo"
            {...register("grupoSanguineo", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.grupoSanguineo && <p>{errors.grupoSanguineo.message}</p>}
        </div>

        <div className="flex flex-col font-poppins">
          <label htmlFor="edad" className="block mb-2 font-medium text-text-primary">
            Edad
          </label>
          <input
            id="edad"
            type="number"
            value={edad || 0}
            {...register("edad", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.edad && <p>{errors.edad.message}</p>}
        </div>
      </div>

      <div className="flex flex-col font-poppins">
        <label htmlFor="dni" className="block mb-2 font-medium text-text-primary">
          DNI / Carnet de extranjería
        </label>
        <input
          id="dni"
          {...register("dni", { required: "Este campo es obligatorio" })}
          className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
        />
        {errors.dni && <p>{errors.dni.message}</p>}
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="nAutogenerado" className="block mb-2 font-medium text-text-primary">
            N° de Autogenerado
          </label>
          <input
            id="nAutogenerado"
            {...register("nAutogenerado", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.nAutogenerado && <p>{errors.nAutogenerado.message}</p>}
        </div>

        <div className="flex flex-col w-full font-poppins">
          <label htmlFor="licenciaConducir" className="block mb-2 font-medium text-text-primary">
            Licencia de conducir
          </label>
          <input
            id="licenciaConducir"
            {...register("licenciaConducir", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.licenciaConducir && <p>{errors.licenciaConducir.message}</p>}
        </div>
      </div>

      <div className="flex flex-col font-poppins">
        <label htmlFor="fechaIngreso" className="block mb-2 font-medium text-text-primary">
          Fecha de ingreso
        </label>
        <input
          id="fechaIngreso"
          type="date"
          {...register("fechaIngreso", { required: "Este campo es obligatorio" })}
          className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
        />
        {errors.fechaIngreso && <p>{errors.fechaIngreso.message}</p>}
      </div>

      <div className="flex flex-col font-poppins">
        <label htmlFor="unidadEstructurada" className="block mb-2 font-medium text-text-primary">
          Unidad estructurada
        </label>
        <input
          id="unidadEstructurada"
          {...register("unidadEstructurada", { required: "Este campo es obligatorio" })}
          className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
        />
        {errors.unidadEstructurada && <p>{errors.unidadEstructurada.message}</p>}
      </div>

      {/* Cargo */}
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="dependenciaOficina" className="block mb-2 font-medium text-text-primary capitalize">
            dependencia/oficina
          </label>
          <input
            id="dependenciaOficina"
            {...register("dependenciaOficina", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.dependenciaOficina && <p>{errors.dependenciaOficina.message}</p>}
        </div>

        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="cargo" className="block mb-2 font-medium text-text-primary capitalize">
            cargo
          </label>
          <input
            id="cargo"
            {...register("cargo", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.cargo && <p>{errors.cargo.message}</p>}
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-ful">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="nacionalidad" className="block mb-2 font-medium text-text-primary capitalize">
            nacionalidad
          </label>
          <input
            id="nacionalidad"
            {...register("nacionalidad", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.nacionalidad && <p>{errors.nacionalidad.message}</p>}
        </div>

        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="fechaNacimiento" className="block mb-2 font-medium text-text-primary capitalize">
            fecha de nacimiento
          </label>
          <input
            id="fechaNacimiento"
            type="date"
            {...register("fechaNacimiento", { required: "Este campo es obligatorio" })}
            onChange={(e) => calculateAge(e.target.value)}
            max={today}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.fechaNacimiento && <p>{errors.fechaNacimiento.message}</p>}
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="departamento" className="block mb-2 font-medium text-text-primary capitalize">
            departamento
          </label>
          <input
            id="departamento"
            {...register("departamento", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.departamento && <p>{errors.departamento.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="provincia" className="block mb-2 font-medium text-text-primary capitalize">
            provincia
          </label>
          <input
            id="provincia"
            {...register("provincia", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.provincia && <p>{errors.provincia.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="distrito" className="block mb-2 font-medium text-text-primary capitalize">
            distrito
          </label>
          <input
            id="distrito"
            {...register("distrito", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.distrito && <p>{errors.distrito.message}</p>}
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="domicilio" className="block mb-2 font-medium text-text-primary capitalize">
            domicilio
          </label>
          <input
            id="domicilio"
            {...register("domicilio", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.domicilio && <p>{errors.domicilio.message}</p>}
        </div>
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="interiorUrbanizacion" className="block mb-2 font-medium text-text-primary capitalize">
            interior urbanizacion
          </label>
          <input
            id="interiorUrbanizacion"
            {...register("interiorUrbanizacion", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.interiorUrbanizacion && <p>{errors.interiorUrbanizacion.message}</p>}
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="telefono" className="block mb-2 font-medium text-text-primary capitalize">
            telefono
          </label>
          <input
            id="telefono"
            {...register("telefono", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.telefono && <p>{errors.telefono.message}</p>}
        </div>
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="celular" className="block mb-2 font-medium text-text-primary capitalize">
            celular
          </label>
          <input
            id="celular"
            {...register("celular", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.celular && <p>{errors.celular.message}</p>}
        </div>
      </div>

      <div className="flex flex-col w-full font-poppins">
        <label htmlFor="email" className="block mb-2 font-medium text-text-primary capitalize">
          email
        </label>
        <input
          id="email"
          {...register("email", { required: "Este campo es obligatorio" })}
          className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="regimenPensionario" className="block mb-2 font-medium text-text-primary capitalize">
            regimenPensionario
          </label>
          <input
            id="regimenPensionario"
            {...register("regimenPensionario", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.regimenPensionario && <p>{errors.regimenPensionario.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="nombreAfp" className="block mb-2 font-medium text-text-primary capitalize">
            nombreAfp
          </label>
          <input
            id="nombreAfp"
            {...register("nombreAfp", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.nombreAfp && <p>{errors.nombreAfp.message}</p>}
        </div>
        <div className="flex flex-col w-1/3 font-poppins">
          <label htmlFor="situacionLaboral" className="block mb-2 font-medium text-text-primary capitalize">
            situacionLaboral
          </label>
          <input
            id="situacionLaboral"
            {...register("situacionLaboral", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.situacionLaboral && <p>{errors.situacionLaboral.message}</p>}
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="estadoCivil" className="block mb-2 font-medium text-text-primary capitalize">
            estadoCivil
          </label>
          <input
            id="estadoCivil"
            {...register("estadoCivil", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.estadoCivil && <p>{errors.estadoCivil.message}</p>}
        </div>
        <div className="flex flex-col w-1/2 font-poppins">
          <label htmlFor="discapacidad" className="block mb-2 font-medium text-text-primary capitalize">
            discapacidad
          </label>
          <input
            id="discapacidad"
            {...register("discapacidad", { required: "Este campo es obligatorio" })}
            className="bg-transparent mb-5 p-2.5 border border-border-primary rounded-lg focus:outline-none w-full text-sm"
          />
          {errors.discapacidad && <p>{errors.discapacidad.message}</p>}
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
    <div className="flex flex-col justify-center items-center w-full font-poppins text-[#11111b]">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg w-auto">
        <h3 className="font-montserrat font-bold text-2xl text-center uppercase">datos personales</h3>
        <div className="hidden flex-row justify-evenly items-center gap-2">
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

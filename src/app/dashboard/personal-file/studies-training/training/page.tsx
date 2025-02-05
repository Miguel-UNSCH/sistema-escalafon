"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { studiesTrainingSchema } from "@/validations/studiesTrainingSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export type IForm = {
  centroCapacitacion: string;
  materiaCapacitacion: string;
  profesionEspecialidad: string;
  periodoInicio: Date;
  periodoFin: Date;
  horasLectivas: number;
  fechaEmisionCertificado: Date;
  certificadoEscaneado: string; // URL al PDF
};

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(studiesTrainingSchema),
  });
  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="flex flex-col gap-4 mt-4">
      crear un formulario
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="centroCapacitacion">centro de capacitación</label>
          <input type="text" placeholder="Centro de capacitación" {...register("centroCapacitacion", { required: true })} />
          <span className="text-[#d20f39]">{errors.centroCapacitacion?.message}</span>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="materiaCapacitacion">materia de capacitación</label>
          <input type="text" placeholder="Materia de capacitación" {...register("materiaCapacitacion", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="profesionEspecialidad">profesión/Especialidad</label>
          <input type="text" placeholder="Profesión o Especialidad" {...register("profesionEspecialidad", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="periodoInicio">periodo inicio</label>
          <input type="date" {...register("periodoInicio", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="periodoFin">periodo fin</label>
          <input type="date" {...register("periodoFin", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="horasLectivas">horas lectivas</label>
          <input type="number" {...register("horasLectivas", { required: true, min: 1 })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="fechaEmisionCertificado">fecha de emisión del certificado</label>
          <input type="date" {...register("fechaEmisionCertificado", { required: true })} />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="certificadoEscaneado">certificado escaneado</label>
          <input type="file" {...register("certificadoEscaneado", { required: true })} />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

const page = () => {
  return (
    <div className="flex flex-col justify-center bg-white shadow-sm p-4 rounded-lg w-full font-poppins">
      <h3 className="font-bold font-montserrat text-center text-xl uppercase">capacitación</h3>
      <div className="flex flex-row justify-evenly items-center gap-2">
        <span className="flex justify-center items-center bg-[#ccd0da] rounded-full w-8 h-8">1</span>
        <div className="flex-grow bg-[#ccd0da] h-1"></div>
        <span className="flex justify-center items-center bg-[#ccd0da] rounded-full w-8 h-8">2</span>
      </div>

      <Form />
    </div>
  );
};

export default page;

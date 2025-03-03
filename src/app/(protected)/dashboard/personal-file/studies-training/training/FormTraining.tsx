"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { capacitacionSchema, ZCapacitacion } from "@/lib/schemas/capacitacion.schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/forms/InputTypes";
import { DatePicker } from "@/components/forms/DateTypes";

interface FormTrainingProps {
  personalId: number;
}

export const FormTraining = ({ personalId }: FormTrainingProps) => {
  const form = useForm<ZCapacitacion>({
    resolver: zodResolver(capacitacionSchema),
    defaultValues: {
      personalId,
      centroCapacitacion: "",
      materia: "",
      especialidad: "",
      periodo: {
        from: undefined,
        to: undefined,
      },
      horasLectivas: 0,
      fechaEmision: undefined,
      certificadoPdf: "",
    },
  });

  const onSubmit = async (data: ZCapacitacion) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextField control={form.control} name="centroCapacitacion" label="Centro de capacitacion *" placeholder="Ingrese el centro donde realizo la capacitacion" />

        <TextField control={form.control} name="materia" label="Materia *" placeholder="Ingrese la materia" />

        <TextField control={form.control} name="especialidad" label="Especialidad *" placeholder="Ingrese la especialidad" />

        <div className="gap-4 grid grid-cols-2">
          <DatePicker control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
          <DatePicker control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
        </div>

        <TextField control={form.control} name="horasLectivas" label="Horas lectivas" placeholder="Ingrese las horas lectivas" />

        <DatePicker control={form.control} name="fechaEmision" label="Fecha de emision del certificado" disabled={false} />

        <TextField control={form.control} name="certificadoPdf" label="Certificado PDF" placeholder="Ingrese el enlace del certificado" />

        <div className="flex justify-end">
          <Button type="submit" onClick={() => console.log(form.getValues())} className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};

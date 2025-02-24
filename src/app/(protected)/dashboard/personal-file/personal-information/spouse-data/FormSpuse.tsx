"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/forms/DateTypes";
import { TextField } from "@/components/forms/InputTypes";
import { UbigeoForm } from "@/components/forms/UbigeoForm";
import { SelectField } from "@/components/forms/SelectTypes";
import { conyugeSchema, ZConyuge } from "@/lib/schemas/conyuge.schema";

export const ConyugeForm = () => {
  const form = useForm<ZConyuge>({
    resolver: zodResolver(conyugeSchema),
    defaultValues: {
      personalId: 1,
      nombres: "",
      apellidos: "",
      gradoInstruccion: undefined,
      profesion: "",
      ocupacion: "",
      centroTrabajo: "",
      postgrado: "",
      ubigeo: {
        departamento: "",
        provincia: "",
        distrito: "",
      },
    },
  });

  // Escuchar cambios en el grado de instrucción
  const gradoInstruccion = useWatch({ control: form.control, name: "gradoInstruccion" });

  // Determinar si los campos deben estar habilitados
  const isProfesionEnabled = ["tecnico", "universitario", "posgrado"].includes(gradoInstruccion);
  const isPostgradoEnabled = gradoInstruccion === "posgrado";

  const gradoInstruccionOptions = [
    { key: "sin instruccion", value: "Sin Instruccion" },
    { key: "primaria completa", value: "Primaria Completa" },
    { key: "primaria incompleta", value: "Primaria Incompleta" },
    { key: "secundaria completa", value: "Secundaria Completa" },
    { key: "secundaria incompleta", value: "Secundaria Incompleta" },
    { key: "tecnico", value: "Tecnico" },
    { key: "universitario", value: "Universitario" },
    { key: "posgrado", value: "Posgrado" },
    { key: "null", value: "Prefiero no decirlo" },
  ];

  const onSubmit = (data: ZConyuge) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="nombres" label="Nombres *" placeholder="Ingrese sus nombres" />
          <TextField control={form.control} name="apellidos" label="Apellidos *" placeholder="Ingrese sus apellidos" />
        </div>

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Lugar de nacimiento</p>
          <div className="gap-2 grid grid-cols-3">
            <UbigeoForm isCompleteFromDB={false} />
          </div>
        </div>

        <DatePicker control={form.control} name="fechaNacimiento" label="Fecha de nacimiento" disabled={false} />

        <SelectField
          control={form.control}
          name="gradoInstruccion"
          label="Grado de instrucción *"
          placeholder="Seleccione una opción"
          options={gradoInstruccionOptions}
          disabled={false}
        />

        <TextField control={form.control} name="profesion" label="Profesión" placeholder="Ingrese su profesión" disabled={!isProfesionEnabled} />

        <TextField control={form.control} name="posgrado" label="Posgrado" placeholder="Ingrese el postgrado" disabled={!isPostgradoEnabled} />

        <TextField control={form.control} name="ocupacion" label="Ocupación" placeholder="Ocupación" disabled={false} />

        <TextField control={form.control} name="centroTrabajo" label="Centro de Trabajo" placeholder="Centro de trabajo" disabled={false} />

        <div className="flex justify-end">
          <Button type="submit" className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};

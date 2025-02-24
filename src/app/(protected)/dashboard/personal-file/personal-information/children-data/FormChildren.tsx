"use client";

import { DatePicker } from "@/components/forms/DateTypes";
import { TextField } from "@/components/forms/InputTypes";
import { SelectField } from "@/components/forms/SelectTypes";
import { UbigeoForm } from "@/components/forms/UbigeoForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { hijoSchema } from "@/lib/schemas/hijo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const FormHijo = () => {
  const form = useForm<z.infer<typeof hijoSchema>>({
    resolver: zodResolver(hijoSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      personalId: 1,
      fechaNacimiento: undefined,
      gradoInstruccion: "",

      ubigeo: {
        departamento: "",
        provincia: "",
        distrito: "",
      },
    },
  });

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

  const onSubmit = (data: z.infer<typeof hijoSchema>) => console.log(data);

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

        <div className="flex justify-end">
          <Button type="submit" className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { gradoInstruccionOptions } from "@/utils/items";
import { DatePicker } from "@/components/forms/DateTypes";
import { TextField } from "@/components/forms/InputTypes";
import { UbigeoForm } from "@/components/forms/UbigeoForm";
import { SelectField } from "@/components/forms/SelectTypes";
import { conyugeSchema, ZConyuge } from "@/lib/schemas/conyuge.schema";
import { createConyuge, getConyuge } from "@/services/conyugeService";

export const ConyugeForm = ({ personalId }: { personalId: string }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const defaultValues = {
    personalId,
    nombres: "",
    apellidos: "",
    gradoInstruccion: undefined,
    fechaNacimiento: undefined,
    profesion: "",
    ocupacion: "",
    centroTrabajo: "",
    postgrado: "",
    ubigeo: {
      inei: "",
      reniec: "",
      departamento: "",
      provincia: "",
      distrito: "",
    },
  };

  const form = useForm<ZConyuge>({ resolver: zodResolver(conyugeSchema), defaultValues });

  useEffect(() => {
    const fetchConyugeData = async () => {
      try {
        const conyugeData: (ZConyuge & { id: string }) | null = await getConyuge(personalId);

        if (conyugeData) {
          console.log("conyugeData", conyugeData);

          const safeUbigeo = conyugeData.ubigeo ?? {
            inei: "",
            reniec: "",
            departamento: "",
            provincia: "",
            distrito: "",
          };

          form.reset({
            ...conyugeData,
            ubigeo: safeUbigeo,
            personalId,
          });
        }

        setError(null);
      } catch (err) {
        console.error("Error obteniendo datos del cónyuge:", err);
        setError("No se encontraron datos del cónyuge.");
      } finally {
        setLoading(false);
      }
    };

    fetchConyugeData();
  }, [personalId, form]);

  const gradoInstruccion = useWatch({ control: form.control, name: "gradoInstruccion" });

  const isProfesionEnabled = ["TEC", "UNI", "POS"].includes(gradoInstruccion);
  const isPostgradoEnabled = gradoInstruccion === "POS";

  const onSubmit = async (data: ZConyuge) => {
    try {
      await createConyuge(data);
      setError(null);
    } catch (err) {
      console.error("Error enviando los datos:", err);
      setError("Hubo un problema al guardar los datos. Verifica la información.");
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Cargando datos...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="gap-2 grid grid-cols-2">
          <TextField control={form.control} name="nombres" label="Nombres *" placeholder="Ingrese sus nombres" disabled={false} />
          <TextField control={form.control} name="apellidos" label="Apellidos *" placeholder="Ingrese sus apellidos" disabled={false} />
        </div>

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Lugar de nacimiento</p>
          <div className="gap-2 grid grid-cols-3">
            <UbigeoForm control={form.control} setValue={form.setValue} watch={form.watch} isCompleteFromDB={false} />
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

        <TextField control={form.control} name="postgrado" label="Postgrado" placeholder="Ingrese el postgrado" disabled={!isPostgradoEnabled} />

        <TextField control={form.control} name="ocupacion" label="Ocupación *" placeholder="Ocupación" disabled={false} />

        <TextField control={form.control} name="centroTrabajo" label="Centro de Trabajo" placeholder="Centro de trabajo" disabled={false} />

        {error && <pre className="text-red-500 text-center">{JSON.stringify(error, null, 2)}</pre>}

        <div className="flex justify-end">
          <Button type="submit" onClick={() => console.log(form.getValues())} className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
};

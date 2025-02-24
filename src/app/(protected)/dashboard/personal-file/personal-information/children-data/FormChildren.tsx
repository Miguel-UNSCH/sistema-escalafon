"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { gradoInstruccionOptions } from "@/utils/items";
import { DatePicker } from "@/components/forms/DateTypes";
import { TextField } from "@/components/forms/InputTypes";
import { UbigeoForm } from "@/components/forms/UbigeoForm";
import { SelectField } from "@/components/forms/SelectTypes";
import { hijoSchema, ZHijo } from "@/lib/schemas/hijo.schema";
import { getHijos, createHijo } from "@/services/hijoService";

interface HijoFormProps {
  personalId: number;
}

export const FormHijo = ({ personalId }: HijoFormProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ZHijo>({
    resolver: zodResolver(hijoSchema),
    defaultValues: {
      personalId,
      nombres: "",
      apellidos: "",
      fechaNacimiento: undefined,
      gradoInstruccion: undefined,
      ubigeo: {
        inei: "",
        reniec: "",
        departamento: "",
        provincia: "",
        distrito: "",
      },
    },
  });

  useEffect(() => {
    const fetchHijosData = async () => {
      try {
        const hijosData: ZHijo[] = await getHijos(personalId);

        if (hijosData.length > 0) {
          form.reset(hijosData[0]);
        }

        setError(null);
      } catch (err) {
        console.error("Error obteniendo datos del hijo:", err);
        setError("No se encontraron datos del hijo.");
      } finally {
        setLoading(false);
      }
    };

    fetchHijosData();
  }, [personalId, form]);

  const onSubmit = async (data: ZHijo) => {
    try {
      await createHijo(data);
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

"use client";

import { fn_rt_b } from "@/actions/reports-action";
import { InputField } from "@/components/custom-fields/input-field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FnProps = {
  user_id: string;
};

const motivoSchema = z.object({
  motivo: z.string().min(1, "El motivo es obligatorio"),
});

export const FnB = ({ user_id }: FnProps) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof motivoSchema>>({
    resolver: zodResolver(motivoSchema),
    defaultValues: { motivo: "sin especificar" },
  });

  const motivoValue = form.watch("motivo");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await fn_rt_b(user_id);
      if (res.success && res.data) setData(res.data);

      setIsLoading(false);
    };

    loadData();
  }, [user_id, form]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="border-mantle border-b-2 rounded-full w-8 h-8 animate-spin" />
        <span className="ml-3 text-text text-sm">Cargando datos...</span>
      </div>
    );
  }

  if (!data) {
    return <p className="p-4 text-red">No se pudieron cargar los datos.</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <div className="max-w-md">
        <Form {...form}>
          <form className="space-y-4">
            <InputField control={form.control} name="motivo" label="Motivo del reporte" type="text" />
          </form>
        </Form>
      </div>

      <div className="content-center gap-x-8 gap-y-4 grid grid-cols-1 md:grid-cols-2 px-8">
        {[
          ["Apellidos y Nombres", data.name_lastname],
          ["Condición Laboral", data.cond_lab],
          ["Oficina", data.oficina],
          ["Cargo", data.cargo],
          ["Profesión", data.profesion],
          ["Nivel Remunerativo", data.n_rem],
          ["Fecha de Nacimiento", data.fecha_nac],
          ["DNI", data.dni],
          ["Reg. Lab.", data.reg_lab],
          ["Meta", data.meta],
          ["Lug. Nac.", data.lug_nac],
          ["Est Civil", data.est_civil],
          ["Domic.", data.domicilio],
          ["Tipo Contrato", data.t_contract],
          ["Motivo", motivoValue],
          ["Fecha", data.fecha],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-4">
            <p className="w-48 font-primary font-semibold text-sm uppercase text-nowrap">{label}</p>
            <p className="font-text text-xs">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

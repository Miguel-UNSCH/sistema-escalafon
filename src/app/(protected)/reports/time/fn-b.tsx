"use client";

import { fn_rt_b } from "@/actions/reports-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FnRtBResponse } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileCheck2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FnProps = {
  user_id: string;
  setFnDataFull?: (data: { data: FnRtBResponse }) => void;
  setFormValues?: (data: z.infer<typeof report_timeSchema>) => void;
};

export const report_timeSchema = z.object({
  motivo: z.string().min(1, "El motivo es obligatorio"),
  init: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date))
    .optional(),
  end: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date))
    .optional(),
});

export const FnB = ({ user_id, setFnDataFull, setFormValues }: FnProps) => {
  const [data, setData] = useState<FnRtBResponse | null>(null);

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof report_timeSchema>>({
    resolver: zodResolver(report_timeSchema),
    defaultValues: { motivo: "sin especificar", init: undefined, end: undefined },
  });

  const onSubmit = (formValues: z.infer<typeof report_timeSchema>) => {
    startTransition(async () => {
      const res = await fn_rt_b(user_id, formValues);
      if (res.success && res.data) {
        setData(res.data);
        setFnDataFull?.({ data: res.data });
        setFormValues?.(formValues); // ✅ guardar valores en el padre
      }
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const res = await fn_rt_b(user_id, {
        motivo: "sin especificar",
        init: undefined,
        end: undefined,
      });
      if (res.success && res.data) {
        setData(res.data);
        setFnDataFull?.({ data: res.data });
      }
      setIsLoading(false);
    };

    loadData();
  }, [user_id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="border-mantle border-b-2 rounded-full w-8 h-8 animate-spin" />
        <span className="ml-3 text-text text-sm">Cargando datos...</span>
      </div>
    );
  }

  if (!data) return <p className="p-4 text-red">No se pudieron cargar los datos.</p>;

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <div className="px-8 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pb-3">
            <InputField control={form.control} name="motivo" label="Motivo del reporte" type="text" placeholder="Ingresar el motivo del reporte" />
            <div className="gap-4 grid grid-cols-2">
              <DateField control={form.control} name="init" label="Fecha Inicio" dateLimit="past" disabled={false} />
              <DateField control={form.control} name="end" label="Fecha Fin" dateLimit="past" disabled={false} />
            </div>
            <div className="flex justify-end items-center gap-2">
              <Button type="submit" className="bg-mantle hover:bg-green px-4 py-2 text-text hover:text-base" disabled={form.formState.isSubmitting}>
                <FileCheck2 />
                {isPending ? "Generando Reporte..." : "Generar Reporte"}
              </Button>
            </div>
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
          ["Motivo", data.motivo],
          ["Fecha", data.fecha],
        ].map(([label, value], i) => (
          <div key={i} className="flex sm:flex-row flex-col sm:items-center gap-1 sm:gap-4">
            <p className="w-48 font-primary font-semibold text-sm uppercase text-nowrap">{label}</p>
            <p className="font-text text-xs capitalize">{value || "-----"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

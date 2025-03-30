"use client";

import { createConfEdit, deleteConfEdit, getConfEdit, updateConfEdit } from "@/actions/conf-edit-action";
import { DateField } from "@/components/custom-fields/date-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEditTime } from "@/context/edit-time-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2, Pencil } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const editSchema = z
  .object({
    fecha_inicio: z
      .string({ required_error: "Fecha de inicio es requerida" })
      .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
      .transform((date) => new Date(date)),

    fecha_fin: z
      .string({ required_error: "Fecha de culminación es requerida" })
      .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
      .transform((date) => new Date(date)),
  })
  .refine((data) => data.fecha_fin > data.fecha_inicio, {
    message: "La fecha de culminación debe ser posterior a la fecha de inicio.",
    path: ["fecha_fin"], // Apunta el error directamente al campo fecha_fin
  });

export type ZEdit = z.infer<typeof editSchema>;

export const EditTime = () => {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [confId, setConfId] = useState<number | null>(null);
  const { updateVersion } = useEditTime();

  const form = useForm<ZEdit>({
    resolver: zodResolver(editSchema),
    defaultValues: { fecha_inicio: undefined, fecha_fin: undefined },
  });

  useEffect(() => {
    startTransition(async () => {
      const res = await getConfEdit();
      if (res.success && res.data) {
        setConfId(res.data.id);
        form.setValue("fecha_inicio", res.data.fecha_inicio);
        form.setValue("fecha_fin", res.data.fecha_fin);
        setShowForm(true);
      }
    });
  }, [form]);

  const onSubmit = async (data: ZEdit) => {
    startTransition(async () => {
      const res = confId !== null ? await updateConfEdit(confId, data as any) : await createConfEdit(data as any);
      if (res.success) {
        toast.success(res.message);
        if (!confId && res.data?.id) setConfId(res.data.id);
        updateVersion();
      } else toast.error(res.message);
    });
  };

  const onDelete = async () => {
    if (!confId) return;
    startTransition(async () => {
      const res = await deleteConfEdit(confId);
      if (res.success) {
        toast.success(res.message);
        setShowForm(false);
        form.reset();
        setConfId(null);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div>
      <h2 className="py-2 font-primary font-bold text-peach text-2xl">Establecer tiempo de edición de datos</h2>

      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="mb-4">
          <Pencil className="mr-2 w-4 h-4" /> Establecer fecha de edición
        </Button>
      )}

      {showForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
            <DateField control={form.control} name="fecha_inicio" label="Fecha de inicio" disabled={false} dateLimit="any" />
            <DateField control={form.control} name="fecha_fin" label="Fecha de culminación" disabled={false} dateLimit="future" />

            <div className="flex justify-end gap-4">
              {confId && (
                <Button type="button" onClick={onDelete} variant="destructive" className="flex flex-row items-center gap-2 bg-surface0 hover:bg-surface1 font-special text-red">
                  <Trash2 className="mr-2 w-4 h-4" /> Eliminar
                </Button>
              )}
              <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 font-special">
                <Save /> {isPending ? "Guardando..." : confId ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

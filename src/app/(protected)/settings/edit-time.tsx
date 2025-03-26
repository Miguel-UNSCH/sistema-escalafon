"use client";

import { createConfEdit, deleteConfEdit, getConfEdit, updateConfEdit } from "@/actions/conf-edit-action";
import { DateField } from "@/components/custom-fields/date-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2, Pencil } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const editSchema = z.object({
  fecha_inicio: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  fecha_fin: z
    .string({ required_error: "Fecha de culminación es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
});

export type ZEdit = z.infer<typeof editSchema>;

export const EditTime = () => {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [confId, setConfId] = useState<number | null>(null);

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
      if (confId !== null) {
        const res = await updateConfEdit(confId, data as any);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await createConfEdit(data as any);
        if (res.success) {
          toast.success(res.message);
          setShowForm(true);
        } else {
          toast.error(res.message);
        }
      }
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
            <DateField control={form.control} name="fecha_inicio" label="Fecha de inicio" disabled={false} dateLimit="future" />
            <DateField control={form.control} name="fecha_fin" label="Fecha de culminación" disabled={false} dateLimit="future" />

            <div className="flex justify-end">
              {confId && (
                <Button type="button" onClick={onDelete} variant="destructive">
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

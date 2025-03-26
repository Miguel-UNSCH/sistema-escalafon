"use client";

import { deleteDependencia, updateDependencia } from "@/actions/others-action";
import { InputField } from "@/components/custom-fields/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { dependenciaSchema, ZDependencia } from "@/lib/schemas/others-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dependencia } from "@prisma/client";
import { Save, Trash } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ModifyDependencia = ({
  dependencia,
  onUpdated,
  setSelectedDependencia,
}: {
  dependencia: Dependencia;
  onUpdated: () => void;
  setSelectedDependencia: React.Dispatch<React.SetStateAction<Dependencia | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZDependencia>({
    resolver: zodResolver(dependenciaSchema),
    defaultValues: { nombre: dependencia.nombre, codigo: dependencia.codigo, direccion: dependencia.direccion || "" },
  });

  const onUpdate = (data: ZDependencia) => {
    startTransition(async () => {
      try {
        const response = await updateDependencia(dependencia.id, data);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Dependencia actualizada exitosamente.");
          onUpdated();
          setSelectedDependencia(null);
          form.reset();
        }
      } catch {
        toast.error("Error al modificar el cargo.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteDependencia(dependencia.id);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Dependencia eliminada exitosamente.");
          onUpdated();
          setSelectedDependencia(null);
          form.reset();
        }
      } catch {
        toast.error("Error al modificar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Modificar Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre" placeholder="Nombre de la dependencia" />
          <InputField control={form.control} name="codigo" label="Codigo" placeholder="Codigo de la dependencia" />
          <InputField control={form.control} name="direccion" label="Direccion" placeholder="Direccion de la dependencia" />

          <div className="flex flex-row justify-end gap-4">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 bg-blue">
              <Save size={16} />
              {isPending ? "Guardando..." : "Actualizar"}
            </Button>
            <Button onClick={onDelete} type="button" disabled={isPending} className="flex flex-row items-center gap-2 bg-red">
              <Trash size={16} />
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

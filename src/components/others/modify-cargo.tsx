"use client";

import { Cargo } from "@prisma/client";
import { Save, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cargoSchema, ZCargo } from "@/lib/schemas/others-schema";
import { InputField } from "@/components/custom-fields/input-field";
import { deleteCargo, patchCargo } from "@/actions/others-action";
import toast from "react-hot-toast";

export const ModifyCargoComponent = ({
  cargo,
  onUpdated,
  setSelectedCargo,
}: {
  cargo: Cargo;
  onUpdated: () => void;
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: { nombre: cargo.nombre },
  });

  const onUpdate = (data: ZCargo) => {
    startTransition(async () => {
      try {
        const response = await patchCargo(cargo.id, data.nombre);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Cargo actualizado exitosamente.");
          onUpdated();
          setSelectedCargo(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al modificar el cargo.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteCargo(cargo.id);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Cargo eliminado exitosamente.");
          onUpdated();
          setSelectedCargo(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al modificar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Modificar Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre del Cargo" placeholder="Ejemplo: Gerente" />

          <div className="flex justify-end gap-4">
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

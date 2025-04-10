"use client";

import { Cargo } from "@prisma/client";
import { Package } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cargoSchema, ZCargo } from "@/lib/schemas/others-schema";
import { InputField } from "@/components/custom-fields/input-field";
import { createCargo } from "@/actions/others-action";
import toast from "react-hot-toast";

export const CreateCargoComponent = ({
  onCargoCreated,
  setSelectedCargo,
}: {
  onCargoCreated: () => void;
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: { nombre: "" },
  });

  const onSubmit = (data: ZCargo) => {
    startTransition(async () => {
      try {
        const result = await createCargo(data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Cargo registrado exitosamente.");
          form.reset();
          onCargoCreated();
          setSelectedCargo(null);
        }
      } catch {
        toast.error("Error al registrar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Agregar Nuevo Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre del cargo" placeholder="Ejemplo: Gerente" />

          <div className="flex flex-row justify-end">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              <Package />
              {isPending ? "Creando..." : "Crear Cargo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

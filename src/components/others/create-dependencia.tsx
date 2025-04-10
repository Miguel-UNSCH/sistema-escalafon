import { createDependencia } from "@/actions/others-action";
import { InputField } from "@/components/custom-fields/input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { dependenciaSchema, ZDependencia } from "@/lib/schemas/others-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dependencia } from "@prisma/client";
import { Boxes } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const CreateDependencia = ({
  onDependenciaCreated,
  setSelectedDependencia,
}: {
  onDependenciaCreated: () => void;
  setSelectedDependencia: React.Dispatch<React.SetStateAction<Dependencia | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZDependencia>({
    resolver: zodResolver(dependenciaSchema),
    defaultValues: { nombre: "", codigo: "", direccion: "" },
  });

  const onSubmit = (data: ZDependencia) => {
    startTransition(async () => {
      try {
        const response = await createDependencia(data);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Dependencia registrada exitosamente.");
          form.reset();
          onDependenciaCreated();
          setSelectedDependencia(null);
        }
      } catch {
        toast.error("Error al registrar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Agregar Nueva Dependencia</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputField control={form.control} name="nombre" label="Nombre" placeholder="Ingrese el nombre de la dependencia" />
          <InputField control={form.control} name="codigo" label="Codigo" placeholder="Ingrese el codigo de la dependencia" />
          <InputField control={form.control} name="direccion" label="Direccion" placeholder="Ingrese la direccion de la dependencia" />

          <div className="flex flex-row justify-end">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              <Boxes />
              {isPending ? "Guardando..." : "Crear Dependencia"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

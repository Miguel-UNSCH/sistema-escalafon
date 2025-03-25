import { cargoDependenciaRecord, createCargoDependencia, deleteCargoDependencia } from "@/actions/others-action";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CargoField } from "../custom-fields/cargo-field";
import { z } from "zod";
import { cargoSchema } from "@/lib/schemas/others-schema";

export const dependenciaSchema = z.object({
  cargo: cargoSchema,
});

export type ZDependencia = z.infer<typeof dependenciaSchema>;

export const ModifyDependencia = ({
  dependencia,
  onUpdated,
  setSelectedDependencia,
}: {
  dependencia: cargoDependenciaRecord;
  onUpdated: () => void;
  setSelectedDependencia: React.Dispatch<React.SetStateAction<cargoDependenciaRecord | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZDependencia>({
    resolver: zodResolver(dependenciaSchema),
    defaultValues: { cargo: { nombre: "" } },
  });

  const onUpdate = (data: ZDependencia) => {
    startTransition(async () => {
      try {
        const response = await createCargoDependencia(dependencia.id, data.cargo.nombre);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("cargo agregado.");
          onUpdated();
          setSelectedDependencia(null);
          form.reset();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al agregar el cargo.");
      }
    });
  };

  const onDelete = (id: number) => {
    startTransition(async () => {
      try {
        const response = await deleteCargoDependencia(dependencia.id, id);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("cargo quitado exitosamente.");
          onUpdated();
          setSelectedDependencia(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al quitar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <div>
        <p className="font-primary font-bold text-mauve text-lg md:text-xl uppercase">Modificar Cargos</p>

        <div className="flex flex-col gap-2 text-nowrap">
          <p className="font-text font-semibold text-[1rem] text-text md:text-lg">{dependencia.nombre}</p>
          <ul className="flex flex-col gap-2 ml-2 pl-2 border-red border-l-4 text-subtext1 list-inside">
            {dependencia.cargos.length ? (
              dependencia.cargos.map((cargo) => (
                <li key={cargo.id} className="flex flex-row justify-between items-center bg-mantle hover:bg-surface0 px-4 py-1 rounded-md font-special text-sm cursor-pointer">
                  <p className="">{cargo.nombre}</p>
                  <button className="hover:bg-crust p-1 rounded-full hover:text-red" onClick={() => onDelete(cargo.id)}>
                    <X size={16} />
                  </button>
                </li>
              ))
            ) : (
              <p className="font-special font-semibold text-red md:text-[1rem] text-sm">No hay cargos registrados</p>
            )}
          </ul>
        </div>
      </div>

      <div className="grid">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-2">
            <div className="w-full">
              <CargoField control={form.control} name="cargo.nombre" label="Agregar cargo" />
            </div>

            <div className="flex sm:flex-row flex-col justify-end items-center gap-2 w-full">
              <Button variant="outline" onClick={() => setSelectedDependencia(null)} className="w-full sm:w-auto">
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 bg-blue w-full sm:w-auto">
                <Save size={16} />
                {isPending ? "Agregando..." : "Agregar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

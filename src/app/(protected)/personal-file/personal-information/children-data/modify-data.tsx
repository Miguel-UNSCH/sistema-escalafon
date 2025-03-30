"use client";

import { childrenRecord, deleteChildren, updateChildren } from "@/actions/children-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { childrenSchema, ZChildren } from "@/lib/schemas/personal-schema";
import { gradoInstruccionOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ModifyProps = {
  item: childrenRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<childrenRecord | null>>;
  edit?: boolean;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem, edit }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    nombres: item.nombres,
    apellidos: item.apellidos,
    dni: item.dni,
    fecha_nacimiento: item.fecha_nacimiento.toISOString(),
    ubigeo: { inei: item.ubigeo.inei, reniec: item.ubigeo.reniec, departamento: item.ubigeo.departamento, provincia: item.ubigeo.provincia, distrito: item.ubigeo.distrito },
    grado_instruccion: item.grado_instruccion,
  };
  const form = useForm<ZChildren>({ resolver: zodResolver(childrenSchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZChildren) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        const response = await updateChildren(item.id, updateData);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Actualizacion exitosa.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
      } catch {
        toast.error("Error al modificar.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteChildren(item.id);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Eliminacion exitosa.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
      } catch {
        toast.error("Error al eliminar.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Actualizar datos del hijo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="nombres" label="Nombres *" placeholder="Ingrese los nombres" disabled={!edit} />
            <InputField control={form.control} name="apellidos" label="Apellidos *" placeholder="Ingrese los apellidos" disabled={!edit} />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="dni" label="DNI *" placeholder="Ingrese el DNI" />
            <DateField control={form.control} name="fecha_nacimiento" label="Fecha de nacimiento" disabled={!edit} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold">Lugar de nacimiento</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <UbigeoField control={form.control} setValue={form.setValue} watch={form.watch} disabled={!edit} />
            </div>
          </div>

          <SelectField control={form.control} name="grado_instruccion" label="Grado de Instrucción *" options={gradoInstruccionOp} disabled={!edit} />

          <div className="flex sm:flex-row flex-col justify-end gap-4">
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              cancelar
            </Button>
            {edit && (
              <>
                <Button onClick={onDelete} type="button" disabled={isPending} className="flex flex-row items-center gap-2 bg-maroon">
                  <Trash size={16} />
                  {isPending ? "Eliminando..." : "Eliminar"}
                </Button>
                <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 bg-teal hover:bg-green">
                  <Save size={16} />
                  {isPending ? "Guardando..." : "Actualizar"}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

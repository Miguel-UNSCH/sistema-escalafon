"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { gradoInstruccionOp } from "@/utils/options";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { conyugeSchema, ZConyuge } from "@/lib/schemas/personal-schema";
import { updateSpouse, deleteSpouse, spouseRecord } from "@/actions/conyuge-action";

export const ModifyData = ({ spouseData, onRefresh }: { spouseData: spouseRecord; onRefresh: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    nombres: spouseData.nombres,
    apellidos: spouseData.apellidos,
    dni: spouseData.dni,
    fecha_nacimiento: spouseData.fecha_nacimiento.toISOString(),
    ubigeo: {
      inei: spouseData.ubigeo.inei,
      reniec: spouseData.ubigeo.reniec,
      departamento: spouseData.ubigeo.departamento,
      provincia: spouseData.ubigeo.provincia,
      distrito: spouseData.ubigeo.distrito,
    },
    grado_instruccion: spouseData.grado_instruccion,
  };
  const form = useForm<ZConyuge>({ resolver: zodResolver(conyugeSchema), defaultValues: defaultValues as any });

  const handleSubmit = (data: ZConyuge) => {
    startTransition(async () => {
      try {
        const result = await updateSpouse(data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Cónyuge actualizado exitosamente.");
          onRefresh();
        }
      } catch {
        toast.error("Error al actualizar los datos del cónyuge.");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteSpouse();
        if (!result.success) {
          toast.error(result.message);
        } else {
          form.reset();
          toast.success("Cónyuge eliminado exitosamente.");
          onRefresh();
        }
      } catch {
        toast.error("Error al eliminar el cónyuge.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar o Eliminar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="nombres" label="Nombres *" placeholder="Ingrese sus nombres" />
            <InputField control={form.control} name="apellidos" label="Apellidos *" placeholder="Ingrese sus apellidos" />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="dni" label="DNI *" placeholder="Ingrese su DNI" />
            <DateField control={form.control} name="fecha_nacimiento" label="Fecha de nacimiento" disabled={false} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold">Lugar de nacimiento</p>
            <div className="gap-2 grid grid-cols-3">
              <UbigeoField control={form.control} setValue={form.setValue} watch={form.watch} isCompleteFromDB={false} />
            </div>
          </div>

          <SelectField control={form.control} name="grado_instruccion" label="Grado de Instrucción *" options={gradoInstruccionOp} disabled={false} />

          <div className="flex justify-end gap-3">
            <Button onClick={handleDelete}>
              <Trash /> Eliminar
            </Button>
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              <Edit /> {isPending ? "Guardando..." : "Modificar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

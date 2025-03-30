"use client";

import { deletePersonal, personalRecord, updatePersonal } from "@/actions/personal-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { SwitchField } from "@/components/custom-fields/switch-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { personalSchema, ZPersonal } from "@/lib/schemas/personal-schema";
import { estadoCivilOp, grupoSanguineoOp, lic_condOp, sexoOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ModifyData = ({ personalData, onRefresh, edit }: { personalData: personalRecord; onRefresh: () => void; edit: boolean }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    ubigeo: {
      inei: personalData.ubigeo.inei,
      reniec: personalData.ubigeo.reniec,
      departamento: personalData.ubigeo.departamento,
      provincia: personalData.ubigeo.provincia,
      distrito: personalData.ubigeo.distrito,
    },
    sexo: personalData.sexo,
    grupo_sanguineo: personalData.grupo_sanguineo,
    n_autogenerado: personalData.n_autogenerado || "",
    licencia_conducir: personalData.licencia_conducir || "",
    fecha_ingreso: personalData.fecha_nacimiento.toISOString(),
    fecha_nacimiento: personalData.fecha_nacimiento.toISOString(),
    domicilio: personalData.domicilio,
    numero_contacto: personalData.numero_contacto,
    estado_civil: personalData.estado_civil,
    numero_hijos: personalData.numero_hijos,
    discapacidad: personalData.discapacidad,
  };

  const form = useForm<ZPersonal>({
    resolver: zodResolver(personalSchema),
    defaultValues: defaultValues as any,
  });

  const handleSubmit = (data: ZPersonal) => {
    startTransition(async () => {
      try {
        const result = await updatePersonal(personalData.id, data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Personal actualizado exitosamente.");
          onRefresh();
        }
      } catch {
        toast.error("Error al actualizar los datos del personal.");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deletePersonal(personalData.id);
        if (!result.success) {
          toast.error(result.message);
        } else {
          form.reset();
          toast.success("Personal eliminado exitosamente.");
          onRefresh();
        }
      } catch {
        toast.error("Error al eliminar el personal.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar o Vaciar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 pb-5">
          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold">Lugar de nacimiento</p>
            <div className="gap-2 grid grid-cols-3">
              <UbigeoField control={form.control} setValue={form.setValue} watch={form.watch} disabled={!edit} />
            </div>
          </div>

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="domicilio" label="Domicilio *" placeholder="Domicilio" disabled={!edit} />
            <DateField control={form.control} name="fecha_nacimiento" label="Fecha de nacimiento" disabled={!edit} />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <SelectField control={form.control} name="sexo" label="Sexo *" placeholder="Seleccione su sexo" options={sexoOp} disabled={!edit} />
            <SelectField control={form.control} name="grupo_sanguineo" label="Grupo sanguineo *" placeholder="Seleccione una opcion" options={grupoSanguineoOp} disabled={!edit} />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="n_autogenerado" label="Numero Autogenerado" placeholder="Ingrese el numero autogenerado" disabled={!edit} />
            <SelectField control={form.control} name="licencia_conducir" label="Licencia de Conducir" placeholder="Seleccione la licencia" options={lic_condOp} disabled={!edit} />
          </div>

          <DateField control={form.control} name="fecha_ingreso" label="Fecha de Ingreso al GRA" disabled={!edit} />
          <InputField control={form.control} name="numero_contacto" label="Numero de Contacto" placeholder="Ingrese el numero de contacto" disabled={!edit} />
          <SelectField control={form.control} name="estado_civil" label="Estado civil *" options={estadoCivilOp} disabled={!edit} />
          <InputField control={form.control} name="numero_hijos" label="Numero de hijos" placeholder="Ingrese el numero de hijos" type="number" disabled={!edit} />
          <SwitchField control={form.control} name="discapacidad" label="Discapacidad *" description="Presenta algun tipo de discapacidad." disabled={!edit} />

          {edit && (
            <div className="flex justify-end gap-3">
              <Button onClick={handleDelete}>
                <Trash /> Vaciar
              </Button>
              <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
                <Edit /> {isPending ? "Guardando..." : "Modificar"}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

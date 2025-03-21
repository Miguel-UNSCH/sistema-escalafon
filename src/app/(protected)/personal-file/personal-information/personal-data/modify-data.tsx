"use client";

import { deletePersonal, personalRecord, updatePersonal } from "@/actions/personal-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { SwitchField } from "@/components/custom-fields/switch-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { personalSchema, ZPersonal } from "@/lib/schemas/personal-schema";
import { estadoCivilOp, grupoSanguineoOp, regimenPensionarioOp, sexoOp, situacionLaboralOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ModifyData = ({ personalData, onRefresh }: { personalData: personalRecord; onRefresh: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    ubigeo: {
      inei: personalData.ubigeo.inei,
      reniec: personalData.ubigeo.reniec,
      departamento: personalData.ubigeo.departamento,
      provincia: personalData.ubigeo.provincia,
      distrito: personalData.ubigeo.distrito,
    },
    cargo: { nombre: personalData.cargo.nombre },
    dependencia: { codigo: personalData.dependencia.codigo, nombre: personalData.dependencia.nombre, direccion: personalData.dependencia.direccion },
    sexo: personalData.sexo,
    grupo_sanguineo: personalData.grupo_sanguineo,
    n_autogenerado: personalData.n_autogenerado || "",
    licencia_conducir: personalData.licencia_conducir || "",
    fecha_ingreso: personalData.fecha_nacimiento.toISOString(),
    anios_servicio: personalData.anios_servicio,
    fecha_nacimiento: personalData.fecha_nacimiento.toISOString(),
    domicilio: personalData.domicilio,
    numero_contacto: personalData.numero_contacto,
    unidad_estructurada: personalData.unidad_estructurada,
    regimen_pensionario: personalData.regimen_pensionario,
    situacion_laboral: personalData.situacion_laboral,
    estado_civil: personalData.estado_civil,
    numero_hijos: personalData.numero_hijos,
    discapacidad: personalData.discapacidad,
  };
  const form = useForm<ZPersonal>({ resolver: zodResolver(personalSchema), defaultValues: defaultValues as any });

  const handleSubmit = (data: ZPersonal) => {
    startTransition(async () => {
      try {
        const result = await updatePersonal(personalData.id, data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Cónyuge actualizado exitosamente.");
          onRefresh();
        }
      } catch (e) {
        toast.error("Error al actualizar los datos del cónyuge.");
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
          toast.success("Cónyuge eliminado exitosamente.");
          onRefresh();
        }
      } catch (e) {
        toast.error("Error al eliminar el cónyuge.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar o Eliminar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 pb-5">
          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold">Lugar de nacimiento</p>
            <div className="gap-2 grid grid-cols-3">
              <UbigeoField control={form.control} setValue={form.setValue} watch={form.watch} isCompleteFromDB={false} />
            </div>
          </div>
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="domicilio" label="Domicilio *" placeholder="Domicilio" />
            <DateField control={form.control} name="fecha_nacimiento" label="Fecha de nacimiento" disabled={false} />
          </div>
          <div className="gap-2 grid grid-cols-2">
            <SelectField control={form.control} name="sexo" label="Sexo *" placeholder="Seleccione su sexo" options={sexoOp} disabled={false} />
            <SelectField control={form.control} name="grupo_sanguineo" label="Grupo sanguineo *" placeholder="Seleccione una opcion" options={grupoSanguineoOp} disabled={false} />
          </div>
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="n_autogenerado" label="Numero Autogenerado" placeholder="Ingrese el numero autogenerado" />
            <InputField control={form.control} name="licencia_conducir" label="Licencia de Conducir" placeholder="Ingrese la licencia" />
          </div>
          <div className="gap-2 grid grid-cols-2">
            <DateField control={form.control} name="fecha_ingreso" label="Fecha de Ingreso al GRA" disabled={false} />
            <InputField control={form.control} name="anios_servicio" label="Anios de servicio" placeholder="Ingrese los anios de servicio" type="number" />
          </div>
          <InputField control={form.control} name="numero_contacto" label="Numero de Contacto" placeholder="Ingrese el numero de contacto" />
          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold">Dependencia</p>
            <div className="gap-2 grid grid-cols-3">
              <DependenciaField control={form.control} disabled={false} />
            </div>
          </div>
          <InputField control={form.control} name="unidad_estructurada" label="Unidad Estructurada" placeholder="Ingrese el nombre de la unidad estructurada" />
          <CargoField control={form.control} name="cargo.nombre" disabled={false} />

          <div className="gap-2 grid grid-cols-2">
            <SelectField control={form.control} name="regimen_pensionario" label="Regimen Pensionario *" options={regimenPensionarioOp} disabled={false} />
            <SelectField control={form.control} name="situacion_laboral" label="Situacion Laboral *" options={situacionLaboralOp} disabled={false} />
          </div>
          <SelectField control={form.control} name="estado_civil" label="Estado civil *" options={estadoCivilOp} disabled={false} />
          <InputField control={form.control} name="numero_hijos" label="Numero de hijos" placeholder="Ingrese el numero de hijos" type="number" />
          <SwitchField control={form.control} name="discapacidad" label="Discapacidad *" description="Presenta algun tipo de discapacidad." disabled={false} />

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

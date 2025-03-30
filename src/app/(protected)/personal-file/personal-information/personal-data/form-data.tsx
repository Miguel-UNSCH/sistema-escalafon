"use client";

import React, { useTransition } from "react";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createPersonal } from "@/actions/personal-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { SwitchField } from "@/components/custom-fields/switch-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { personalSchema, ZPersonal } from "@/lib/schemas/personal-schema";
import { estadoCivilOp, grupoSanguineoOp, lic_condOp, sexoOp } from "@/utils/options";
import toast from "react-hot-toast";

export const CreateData = ({ onRefresh }: { onRefresh: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    ubigeo: { inei: "", reniec: "", departamento: "", provincia: "", distrito: "" },
    sexo: undefined,
    grupo_sanguineo: undefined,
    n_autogenerado: "",
    licencia_conducir: undefined,
    fecha_ingreso: undefined,
    fecha_nacimiento: undefined,
    domicilio: "",
    numero_contacto: "",
    estado_civil: undefined,
    numero_hijos: 0,
    discapacidad: false,
  };
  const form = useForm<ZPersonal>({ resolver: zodResolver(personalSchema), defaultValues });

  const onSubmit = (data: ZPersonal) => {
    startTransition(async () => {
      try {
        const result = await createPersonal(data);

        if (!result.success) {
          toast.error(result.message);
        } else {
          form.reset();
          toast.success("Personal registrado exitosamente.");
          onRefresh();
        }
      } catch {
        toast.error("Error al procesar la información.");
      }
    });
  };

  return (
    <div className="w-full">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Datos Personales</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
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
            <SelectField control={form.control} name="licencia_conducir" label="Licencia de Conducir" placeholder="Seleccione la licnecia" options={lic_condOp} disabled={false} />
          </div>

          <DateField control={form.control} name="fecha_ingreso" label="Fecha de Ingreso al GRA" disabled={false} />

          <InputField control={form.control} name="numero_contacto" label="Numero de Contacto" placeholder="Ingrese el numero de contacto" />

          <SelectField control={form.control} name="estado_civil" label="Estado civil *" options={estadoCivilOp} disabled={false} />
          <InputField control={form.control} name="numero_hijos" label="Numero de hijos" placeholder="Ingrese el numero de hijos" type="number" />
          <SwitchField control={form.control} name="discapacidad" label="Discapacidad *" description="Presenta algun tipo de discapacidad." disabled={false} />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              <Save />
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// eslint-disable no-unused-vars
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/custom-fields/input-field";
import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { childrenSchema, ZChildren } from "@/lib/schemas/personal-schema";
import { gradoInstruccionOp } from "@/utils/options";
import { createChild } from "@/actions/children-action";
import toast from "react-hot-toast";

type FormDataProps = {
  fetchChildren: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchChildren }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZChildren>({
    resolver: zodResolver(childrenSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      fecha_nacimiento: undefined,
      ubigeo: { inei: "", reniec: "", departamento: "", provincia: "", distrito: "" },
      grado_instruccion: undefined,
    },
  });

  const onSubmit = (data: ZChildren) => {
    startTransition(async () => {
      try {
        const result = await createChild(data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Hijo registrado exitosamente.");
          form.reset();
          fetchChildren();
        }
      } catch (e: unknown) {
        toast.error("Error al registrar el hijo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="nombres" label="Nombres *" placeholder="Ingrese los nombres" />
            <InputField control={form.control} name="apellidos" label="Apellidos *" placeholder="Ingrese los apellidos" />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="dni" label="DNI *" placeholder="Ingrese el DNI" />
            <DateField control={form.control} name="fecha_nacimiento" label="Fecha de nacimiento" disabled={false} />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-inter font-semibold">Lugar de nacimiento</p>
            <div className="gap-2 grid grid-cols-3">
              <UbigeoField control={form.control} setValue={form.setValue} watch={form.watch} isCompleteFromDB={false} />
            </div>
          </div>

          <SelectField control={form.control} name="grado_instruccion" label="Grado de Instrucción *" options={gradoInstruccionOp} disabled={false} />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              <Save />
              {isPending ? "Guardando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

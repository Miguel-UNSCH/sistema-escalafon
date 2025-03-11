// eslint-disable no-unused-vars
"use client";

import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { gradoInstruccionOp } from "@/utils/options";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UbigeoField } from "@/components/custom-fields/ubigeo-field";
import { conyugeSchema, ZConyuge } from "@/lib/schemas/personal-schema";
import { createSpouse, getCurrentSpouse } from "@/actions/conyuge-action";

export const FormData = () => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm<ZConyuge>({
    resolver: zodResolver(conyugeSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      fecha_nacimiento: undefined,
      ubigeo: { inei: "", reniec: "", departamento: "", provincia: "", distrito: "" },
      grado_instruccion: undefined,
    },
  });

  useEffect(() => {
    const fetchSpouseData = async () => {
      setLoading(true);

      try {
        const response = await getCurrentSpouse();
        if (response.success && response.data) {
          if (response.success && response.data) form.reset(response.data);
          toast.success("Datos del cónyuge cargados correctamente.");
        }
      } catch (e: unknown) {
        toast.error("Error al cargar los datos del cónyuge.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpouseData();
  }, [form]);

  const onSubmit = (data: ZConyuge) => {
    startTransition(async () => {
      try {
        const result = await createSpouse(data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          form.reset();
          toast.success("Cónyuge registrado exitosamente.");
        }
      } catch (e: unknown) {
        toast.error("Error al registrar el cónyuge.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold text-2xl text-center uppercase">Datos del Cónyuge</p>

      {loading ? (
        <p className="text-subtext0 text-center">Cargando datos...</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
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

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
                <Save />
                {isPending ? "Guardando..." : "Registrar"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

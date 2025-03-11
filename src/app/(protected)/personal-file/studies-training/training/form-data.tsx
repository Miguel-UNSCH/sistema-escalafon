"use client";

import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { DateField } from "@/components/custom-fields/date-field";
import { createCapacitacion } from "@/actions/capacitacion-action";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { capacitacionSchema, ZCapacitacionS } from "@/lib/schemas/user-schema";

type FormDataProps = {
  fetchCapacitaciones: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchCapacitaciones }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZCapacitacionS>({
    resolver: zodResolver(capacitacionSchema),
    defaultValues: {
      centro_capacitacion: "",
      materia: "",
      especialidad: "",
      horas_lectivas: 0,
      periodo: { from: undefined, to: undefined },
      file: undefined,
    },
  });

  const onSubmit = async (data: ZCapacitacionS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "capacitaciones");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createCapacitacion({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Capacitación registrada exitosamente.");
          form.reset();
          fetchCapacitaciones();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la capacitación.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <div className="gap-4 grid grid-cols-2">
            <InputField control={form.control} name="centro_capacitacion" label="Centro de Capacitación *" placeholder="Ingrese el nombre del centro de capacitación" />
            <InputField control={form.control} name="materia" label="Materia *" placeholder="Ingrese la materia" />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <InputField control={form.control} name="especialidad" label="Especialidad *" placeholder="Ingrese la especialidad" />
            <InputField control={form.control} name="horas_lectivas" label="Horas Lectivas *" type="number" placeholder="Ingrese las horas lectivas" />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
          </div>

          <UploadField control={form.control} name="file" label="Documento" allowedTypes={["pdf"]} />

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

"use client";

import { createDemerito } from "@/actions/m-d-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { UserField } from "@/components/custom-fields/user-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { demeritoSchema, ZDemerito } from "@/lib/schemas/m-d-schema";
import { uploadFile } from "@/service/file-service";
import { tipo_suspensionOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormDataProps = {
  fetchDemeritos: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchDemeritos }) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = {
    user: { name: "", dni: "" },
    fecha: undefined,
    tipo_sancion: undefined,
    cargo: { nombre: "" },
    dependencia: { nombre: "", codigo: "", direccion: "" },
    file: undefined,
  };

  const form = useForm<ZDemerito>({ resolver: zodResolver(demeritoSchema), defaultValues });

  const onSubmit = async (data: ZDemerito) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "demeritos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDemerito({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Demérito registrado exitosamente.");
          form.reset();
          fetchDemeritos();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el demérito.");
      }
    });
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <UserField control={form.control} name="user" label="Buscar al personal" />
          <SelectField control={form.control} name="tipo_sancion" label="Tipo de Sancion *" options={tipo_suspensionOp} />
          <DateField control={form.control} name="fecha" label="Fecha de la bonificacion" disabled={false} />

          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
          </div>

          <UploadField control={form.control} name="file" label="Documento *" allowedTypes={["pdf"]} />

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

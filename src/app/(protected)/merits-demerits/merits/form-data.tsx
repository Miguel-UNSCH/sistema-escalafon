"use client";

import { createMerito, meritoRecord } from "@/actions/m-d-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { meritoSchema, ZMerito } from "@/lib/schemas/m-d-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onMeritoCreated: () => void;
  setSelectedMerito: React.Dispatch<React.SetStateAction<meritoRecord | null>>;
};

export const Create: React.FC<CreateProps> = ({ onMeritoCreated, setSelectedMerito }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    fecha: undefined,
    cargo: { nombre: "" },
    dependencia: { nombre: "", codigo: "", direccion: "" },
    file: undefined,
  };

  const form = useForm<ZMerito>({ resolver: zodResolver(meritoSchema), defaultValues });

  const onSubmit = async (data: ZMerito) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "meritos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createMerito({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Mérito registrado exitosamente.");
          form.reset();
          onMeritoCreated();
          setSelectedMerito(null);
        }
      } catch (e: unknown) {
        toast.error("Error al registrar el mérito.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <DateField control={form.control} name="fecha" label="Fecha de la bonificacion" disabled={false} />

          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
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

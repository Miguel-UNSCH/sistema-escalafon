"use client";

import { createRenuncia } from "@/actions/renuncia-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { renunciaSchema, ZRenunciaS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormDataProps = {
  fetchRenuncias: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchRenuncias }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    motivo: "",
    fecha: undefined,
    cargo: { nombre: "" },
    dependencia: { nombre: "", codigo: "", direccion: "" },
    file: undefined,
  };

  const form = useForm<ZRenunciaS>({ resolver: zodResolver(renunciaSchema), defaultValues });

  const onSubmit = async (data: ZRenunciaS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "renuncias");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createRenuncia({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Renuncia registrada exitosamente.");
          form.reset();
          fetchRenuncias();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la renuncia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="motivo" label="Motivo de Renuncia*" placeholder="Ingrese la resolucion del motivo de la renuncia" />

          <DateField control={form.control} name="fecha" label="Fecha de la Renuncia" disabled={false} />

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

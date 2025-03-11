"use client";

import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createExp } from "@/actions/exp-action";
import { uploadFile } from "@/service/file-service";
import { expSchema, ZExpS } from "@/lib/schemas/user-schema";
import { DateField } from "@/components/custom-fields/date-field";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";

type FormDataProps = {
  fetchExperiences: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchExperiences }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZExpS>({
    resolver: zodResolver(expSchema),
    defaultValues: {
      centro_labor: "",
      periodo: { from: undefined, to: undefined },
      cargo: { nombre: "" },
      dependencia: { nombre: "", codigo: "", direccion: "" },
      file: undefined,
    },
  });

  const onSubmit = async (data: ZExpS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "experiencias");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createExp({ ...data, file_id });

        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Experiencia registrada exitosamente.");
          form.reset();
          fetchExperiences();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la experiencia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="centro_labor" label="Centro de Labor *" placeholder="Ingrese el centro de labor" />
          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
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

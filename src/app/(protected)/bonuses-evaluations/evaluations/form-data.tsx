"use client";

import { createEvaluation, evaluationRecord } from "@/actions/evaluation-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { evaluationSchema, ZEvaluation } from "@/lib/schemas/bonus-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<evaluationRecord | null>>;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    puntuacion: 0,
    fecha: undefined,
    cargo: { nombre: "" },
    dependencia: { nombre: "", codigo: "", direccion: "" },
    file: undefined,
  };

  const form = useForm<ZEvaluation>({ resolver: zodResolver(evaluationSchema), defaultValues });

  const onSubmit = async (data: ZEvaluation) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "evaluaciones");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createEvaluation({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Evaluación registrada exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la evaluación.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <DateField control={form.control} name="fecha" label="Fecha de la evaluacion" disabled={false} />
            <InputField control={form.control} name="puntuacion" label="Puntuacion *" type="number" />
          </div>

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

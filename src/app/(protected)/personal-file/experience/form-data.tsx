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
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { ExperienceRecord } from "./content-data";
import { CargoIdDependenciaField, DependenciaIdField } from "@/components/custom-fields/cargos-dependencia";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ExperienceRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZExpS>({
    resolver: zodResolver(expSchema),
    defaultValues: {
      centro_labor: "",
      periodo: { from: undefined, to: undefined },
      cargo_id: "",
      dependencia_id: "",
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
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la experiencia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="centro_labor" label="Centro de Labor *" placeholder="Ingrese el centro de labor" />

          <DependenciaIdField control={form.control} name="dependencia_id" label="Dependencia *" />
          <CargoIdDependenciaField control={form.control} name="cargo_id" dependencia_id={form.watch("dependencia_id")} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
          </div>

          <UploadField control={form.control} name="file" label="Documento" allowedTypes={["pdf"]} />

          <div className="flex justify-end gap-2">
            {showCancel && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
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

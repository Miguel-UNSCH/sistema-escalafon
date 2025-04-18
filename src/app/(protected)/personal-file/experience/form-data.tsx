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

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ExperienceRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  edit: boolean;
  id: string;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, edit, id }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZExpS>({
    resolver: zodResolver(expSchema),
    defaultValues: {
      centro_labor: "",
      periodo: { from: undefined, to: undefined },
      cargo: "",
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

        const result = await createExp(id, { ...data, file_id });

        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Experiencia registrada exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar la experiencia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="centro_labor" label="Centro de Labor *" placeholder="Ingrese el centro de labor" disabled={!edit} />

          <InputField control={form.control} name="cargo" label="Cargo *" placeholder="Ingrese el cargo" disabled={!edit} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={!edit} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={!edit} />
          </div>

          <UploadField control={form.control} name="file" label="Documento" allowedTypes={["pdf"]} disabled={!edit} />

          <div className="flex justify-end gap-2">
            {showCancel && onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            {edit && (
              <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
                <Save />
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

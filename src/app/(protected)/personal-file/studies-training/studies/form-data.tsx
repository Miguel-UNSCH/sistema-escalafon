"use client";

import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { nivelEducativoOp } from "@/utils/options";
import { uploadFile } from "@/service/file-service";
import { createStudy } from "@/actions/studies-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { estudiosSchema, ZEstudioS } from "@/lib/schemas/user-schema";
import { SelectField } from "@/components/custom-fields/select-field";
import { StudyRecord } from "./content-data";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<StudyRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  edit: boolean;
  id: string;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, edit, id }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZEstudioS>({
    resolver: zodResolver(estudiosSchema),
    defaultValues: {
      institucion: "",
      carrera: "",
      periodo: { from: undefined, to: undefined },
      file: undefined,
      nivel: undefined,
    },
  });

  const nivelSeleccionado = form.watch("nivel");
  const requiereCarrera = ["t", "u", "m", "d", "e"].includes(nivelSeleccionado || "");

  const onSubmit = async (data: ZEstudioS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "estudios");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createStudy(id, { ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Estudio registrado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar el estudio.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="nivel" label="Formacion Academica *" options={nivelEducativoOp} disabled={!edit} />

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="institucion" label="Nombre de la Institucion *" placeholder="Ingrese el nombre de la institucion" disabled={!edit} />
            <InputField control={form.control} name="carrera" label="Carrera/Especialidad *" placeholder="Ingrese el nombre de la carrera" disabled={!edit || !requiereCarrera} />
          </div>

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

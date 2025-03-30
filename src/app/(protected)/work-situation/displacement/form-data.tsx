"use client";

import { createDesplazamiento, desplazamientoRecord } from "@/actions/desplazamiento-action";
import { CargoIdDependenciaField, DependenciaIdField } from "@/components/custom-fields/cargos-dependencia";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { desplazamientoSchema, ZDesplazamientoS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { tipoDesplazamientoOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<desplazamientoRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  edit: boolean;
};
export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, edit }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo_desplazamiento: undefined,
    fecha: undefined,
    tipo_file: "",
    current_cargo_id: "",
    new_cargo_id: "",
    current_dependencia_id: "",
    new_dependencia_id: "",
    file: undefined,
  };
  const form = useForm<ZDesplazamientoS>({ resolver: zodResolver(desplazamientoSchema), defaultValues });

  const onSubmit = async (data: ZDesplazamientoS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "desplazamientos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDesplazamiento({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Desplazamiento registrado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar el desplazamiento.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_desplazamiento" label="Tipo de Desplazamiento" options={tipoDesplazamientoOp} disabled={!edit} />

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="tipo_file" label="Tipo de Documento" placeholder="Ingrese el tipo de documento" disabled={!edit} />
            <DateField control={form.control} name="fecha" label="Fecha" disabled={!edit} />
          </div>

          <DependenciaIdField control={form.control} name="current_dependencia_id" label="Dependencia Actual *" disabled={!edit} />
          <CargoIdDependenciaField control={form.control} name="current_cargo_id" dependencia_id={form.watch("current_dependencia_id")} label="Cargo Actual *" disabled={!edit} />

          <DependenciaIdField control={form.control} name="new_dependencia_id" label="Nueva Dependencia *" disabled={!edit} />
          <CargoIdDependenciaField control={form.control} name="new_cargo_id" dependencia_id={form.watch("new_dependencia_id")} label="Nuevo Cargo *" disabled={!edit} />

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

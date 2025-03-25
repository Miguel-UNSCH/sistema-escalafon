"use client";
import { ascensoRecord, createAscenso } from "@/actions/ascenso-action";
import { CargoIdDependenciaField, DependenciaIdField } from "@/components/custom-fields/cargos-dependencia";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ascensoSchema, ZAscensoS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ascensoRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    resolucion_ascenso: "",
    nivel_remunerativo: "",
    cnp: 0,
    fecha: undefined,
    current_cargo_id: "",
    new_cargo_id: "",
    current_dependencia_id: "",
    new_dependencia_id: "",
    file: undefined,
  };
  const form = useForm<ZAscensoS>({ resolver: zodResolver(ascensoSchema), defaultValues });

  const onSubmit = async (data: ZAscensoS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "ascensos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createAscenso({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Ascenso registrado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el ascenso.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="resolucion_ascenso" label="Resolucion de Ascenso *" placeholder="Ingrese la resolucion de ascenso" />
            <InputField control={form.control} name="cnp" label="CNP *" type="number" />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="nivel_remunerativo" label="Nivel Remunerativo *" placeholder="Ingrese el nivel remunerativo" />
            <DateField control={form.control} name="fecha" label="Fecha" disabled={false} />
          </div>

          <DependenciaIdField control={form.control} name="current_dependencia_id" label="Dependencia Actual *" />
          <CargoIdDependenciaField control={form.control} name="current_cargo_id" dependencia_id={form.watch("current_dependencia_id")} label="Cargo Actual *" />

          <DependenciaIdField control={form.control} name="new_dependencia_id" label="Nueva Dependencia *" />
          <CargoIdDependenciaField control={form.control} name="new_cargo_id" dependencia_id={form.watch("new_dependencia_id")} label="Nuevo Cargo *" />

          <UploadField control={form.control} name="file" label="Documento *" allowedTypes={["pdf"]} />

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

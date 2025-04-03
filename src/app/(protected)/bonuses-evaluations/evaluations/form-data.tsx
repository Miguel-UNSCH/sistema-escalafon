"use client";

import { createEvaluation, evaluationRecord } from "@/actions/evaluation-action";
import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { UserField } from "@/components/custom-fields/user-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { evaluationSchema, ZEvaluation } from "@/lib/schemas/bonus-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<evaluationRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
  edit: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, user_id, edit }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    evaluador: { name: "", dni: "", id: "" },
    etapa: undefined,
    fecha: undefined,
    cargo_id: "",
    dependencia_id: "",
    ev_cargo_id: "",
    ev_dependencia_id: "",
    file: undefined,
  };

  const form = useForm<ZEvaluation>({ resolver: zodResolver(evaluationSchema), defaultValues });

  const evaluadorId = useWatch({
    control: form.control,
    name: "evaluador.id",
    defaultValue: "",
  });

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

        const result = await createEvaluation(user_id, { ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Evaluación registrada exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar la evaluación.");
      }
    });
  };

  const selectValues = [
    { key: "0", value: "Ninguna" },
    { key: "1", value: "Primera Etapa" },
    { key: "2", value: "Segunda Etapa" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <DateField control={form.control} name="fecha" label="Fecha de la evaluacion" disabled={!edit} />
            <SelectField control={form.control} name="etapa" label="Etapa" options={selectValues} disabled={!edit} />
          </div>

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" disabled={!edit} />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} label="Cargo *" disabled={!edit} />

          <div className="flex flex-col gap-4">
            <p className="font-primary font-semibold">Datos del Evaluador</p>
            <UserField control={form.control} name="evaluador" label="Numbre *" disabled={!edit} />
            <DependenciasUserField control={form.control} name="ev_dependencia_id" user_id={evaluadorId} label="Dependencia *" disabled={!edit} />
            <CargosUserField control={form.control} name="ev_cargo_id" user_id={evaluadorId} dependencia_id={form.watch("ev_dependencia_id")} label="Cargo *" disabled={!edit} />
          </div>

          <UploadField control={form.control} name="file" label="Documento *" allowedTypes={["pdf"]} disabled={!edit} />

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

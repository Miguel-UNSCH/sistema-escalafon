"use client";

import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { descansoMedicoSchema, ZDesMedS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { tipoDescansoOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DescansoMedicoRecord } from "./content-data";
import { InputField } from "@/components/custom-fields/input-field";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { createDescanso } from "@/actions/descanso-action";

type CreateProps = {
  onMedicalCreated: () => void;
  setSelectedMedical: React.Dispatch<React.SetStateAction<DescansoMedicoRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
};

export const Create: React.FC<CreateProps> = ({ onMedicalCreated, setSelectedMedical, onCancel, showCancel, user_id }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo_descanso: undefined,
    detalle: "",
    periodo: { from: undefined, to: undefined },
    cargo_id: "",
    dependencia_id: "",
    file: undefined,
  };

  const form = useForm<ZDesMedS>({ resolver: zodResolver(descansoMedicoSchema), defaultValues });

  const onSubmit = async (data: ZDesMedS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "descansos_medicos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDescanso({ ...data, file_id });
        if (!result.success) toast.error(result.message);
        else {
          toast.success("Descanso médico registrado exitosamente.");
          form.reset();
          onMedicalCreated();
          setSelectedMedical(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el descanso médico.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_descanso" label="Tipo de Descanso" options={tipoDescansoOp} />
          <InputField control={form.control} name="detalle" label="Detalle *" placeholder="Detalle" />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} />

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

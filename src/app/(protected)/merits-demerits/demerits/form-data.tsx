"use client";

import { createDemerito } from "@/actions/m-d-action";
import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { UserField } from "@/components/custom-fields/user-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { demeritoSchema, ZDemerito } from "@/lib/schemas/m-d-schema";
import { uploadFile } from "@/service/file-service";
import { tipo_suspensionOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { DemeritoRecord } from "./content-data";
import { InputField } from "@/components/custom-fields/input-field";

type CreateProps = {
  onItemCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<DemeritoRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
};

export const Create: React.FC<CreateProps> = ({ onItemCreated, setSelectedItem, onCancel, showCancel }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    user: { name: "", dni: "", id: "" },
    tipo_sancion: undefined,
    tipo_documento: undefined,
    asunto: "",
    periodo: { from: undefined, to: undefined },
    dependencia_id: "",
    cargo_id: "",
    file: undefined,
  };

  const form = useForm<ZDemerito>({ resolver: zodResolver(demeritoSchema), defaultValues });

  const userId = useWatch({
    control: form.control,
    name: "user.id",
    defaultValue: "",
  });

  const onSubmit = async (data: ZDemerito) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "demeritos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDemerito({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Demérito registrado exitosamente.");
          form.reset();
          onItemCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el demérito.");
      }
    });
  };

  const selectValues = [
    { key: "0", value: "Ninguna" },
    { key: "1", value: "Resolucion" },
    { key: "2", value: "Memorando" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <UserField control={form.control} name="user" label="Buscar al personal" />

          <SelectField control={form.control} name="tipo_sancion" label="Tipo de Sancion *" options={tipo_suspensionOp} />
          <SelectField control={form.control} name="tipo_documento" label="Tipo de Documento *" options={selectValues} />
          <InputField control={form.control} name="asunto" label="Asunto *" placeholder="Asunto de la sancion" />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={userId} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={userId} dependencia_id={form.watch("dependencia_id")} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
          </div>

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

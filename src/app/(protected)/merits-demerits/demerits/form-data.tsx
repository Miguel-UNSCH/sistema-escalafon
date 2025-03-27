"use client";

import { createDemerito, demeritoRecord } from "@/actions/m-d-action";
import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { UserField } from "@/components/custom-fields/user-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { demeritoSchema, ZDemerito } from "@/lib/schemas/m-d-schema";
import { uploadFile } from "@/service/file-service";
import { tipo_sancionOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { InputField } from "@/components/custom-fields/input-field";

type CreateProps = {
  onItemCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<demeritoRecord | null>>;
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
    fecha_start: undefined,
    fecha_end: undefined,
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

  const tipoSancion = useWatch({
    control: form.control,
    name: "tipo_sancion",
    defaultValue: undefined,
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
      } catch {
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

          <SelectField control={form.control} name="tipo_sancion" label="Tipo de Sancion *" options={tipo_sancionOp} />
          <SelectField control={form.control} name="tipo_documento" label="Tipo de Documento *" options={selectValues} />
          <InputField control={form.control} name="asunto" label="Detalle *" placeholder="Detalle de la sancion" />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={userId} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={userId} dependencia_id={form.watch("dependencia_id")} />

          {tipoSancion === "sus" ? (
            <div className="gap-4 grid grid-cols-2">
              <DateField control={form.control} name="fecha_start" label="Fecha de inicio" disabled={false} dateLimit="any" />
              <DateField control={form.control} name="fecha_end" label="Fecha de culminación" disabled={false} dateLimit="any" />
            </div>
          ) : (
            <DateField control={form.control} name="fecha_start" label="Fecha" disabled={false} dateLimit="past" />
          )}

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

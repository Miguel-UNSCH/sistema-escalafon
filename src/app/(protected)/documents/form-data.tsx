"use client";

import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { tipo_docOp } from "@/utils/options";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { createDocumento, documentRecord } from "@/actions/document-action";
import { UserField } from "@/components/custom-fields/user-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { SelectField } from "@/components/custom-fields/select-field";
import { documentSchema, ZDocumentS } from "@/lib/schemas/documents-schema";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { DateField } from "@/components/custom-fields/date-field";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<documentRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, user_id }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo_documento: undefined,
    asunto: "",
    received: { name: "", dni: "", id: "" },
    cargo_id: "",
    dependencia_id: "",
    r_cargo_id: "",
    r_dependencia_id: "",
    file: undefined,
    fecha: undefined,
  };

  const form = useForm<ZDocumentS>({ resolver: zodResolver(documentSchema), defaultValues });

  const receivedId = useWatch({
    control: form.control,
    name: "received.id",
    defaultValue: "",
  });

  const onSubmit = async (data: ZDocumentS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "documentos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDocumento({ ...data, file_id });

        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Evaluación registrada exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el documento.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_documento" label="Tipo de Documento *" options={tipo_docOp} />

          <InputField control={form.control} name="asunto" label="Asunto *" placeholder="Ingrese el asunto del documento" />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} label="Cargo *" />
          <DateField control={form.control} name="fecha" label="Fecha *" disabled={false} />

          <div className="flex flex-col gap-4">
            <p className="font-primary font-semibold">Datos del destinatario</p>
            <UserField control={form.control} name="received" label="Numbre *" />
            <DependenciasUserField control={form.control} name="r_dependencia_id" user_id={receivedId} label="Dependencia *" />
            <CargosUserField control={form.control} name="r_cargo_id" user_id={receivedId} dependencia_id={form.watch("r_dependencia_id")} label="Cargo *" />
          </div>

          <UploadField control={form.control} name="file" label="Documento *" allowedTypes={["pdf", "docx"]} />

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

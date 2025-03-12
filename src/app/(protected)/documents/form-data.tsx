"use client";

import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { tipo_docOp } from "@/utils/options";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { createDocumento } from "@/actions/document-action";
import { UserField } from "@/components/custom-fields/user-field";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { SelectField } from "@/components/custom-fields/select-field";
import { documentSchema, ZDocumentS } from "@/lib/schemas/documents-schema";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";

type FormDataProps = {
  fetchDocumentos: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchDocumentos }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    numero_documento: "",
    tipo_documento: undefined,
    asunto: "",
    receptor: { name: "", dni: "" },
    cargo_emisor: { nombre: "" },
    cargo_receptor: { nombre: "" },
    dependencia_emisor: { nombre: "", codigo: "", direccion: "" },
    dependencia_receptor: { nombre: "", codigo: "", direccion: "" },
    file: undefined,
  };

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
          toast.success("Documento registrado exitosamente.");
          form.reset();
          fetchDocumentos();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el documento.");
      }
    });
  };

  const form = useForm<ZDocumentS>({ resolver: zodResolver(documentSchema), defaultValues });
  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="numero_documento" label="Identificador del Documento *" placeholder="Ingrese el identificador unico del documento" />
            <InputField control={form.control} name="asunto" label="Asunto *" placeholder="Ingrese el asunto del documento" />
          </div>

          <UserField control={form.control} name="receptor" label="Seleccionar usuario" />

          <SelectField control={form.control} name="tipo_documento" label="Tipo de Documento *" options={tipo_docOp} />

          <div className="gap-2 grid grid-cols-2">
            <CargoField control={form.control} name="cargo_emisor.nombre" label="Cargo Emisor *" />
            <CargoField control={form.control} name="cargo_receptor.nombre" label="Cargo Receptor *" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia del Remitente</p>
            <div className="gap-2 grid grid-cols-3">
              <DependenciaField control={form.control} name="dependencia_emisor" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia del Receptor</p>
            <div className="gap-2 grid grid-cols-3">
              <DependenciaField control={form.control} name="dependencia_receptor" />
            </div>
          </div>

          <UploadField control={form.control} name="file" label="Documento *" allowedTypes={["pdf", "docx"]} />

          <div className="flex justify-end">
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

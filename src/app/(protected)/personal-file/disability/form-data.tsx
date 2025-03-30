"use client";

import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { createDisability, discapacidadRecord } from "@/actions/disability-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { SelectField } from "@/components/custom-fields/select-field";
import { entidad_certificadoraOp, tDscapacidadOp } from "@/utils/options";
import { disabilitySchema, ZDisabilityS } from "@/lib/schemas/user-schema";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<discapacidadRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  edit: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, edit }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo: undefined,
    discapacidad: "",
    entidad_certificadora: undefined,
    fecha_certificacion: undefined,
    file: undefined,
  };

  const form = useForm<ZDisabilityS>({ resolver: zodResolver(disabilitySchema), defaultValues });

  const onSubmit = async (data: ZDisabilityS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "discapacidades");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDisability({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Discapacidad registrada exitosamente.");
          form.reset(defaultValues);
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar la discapacidad.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo" label="Tipo *" options={tDscapacidadOp} disabled={!edit} />
          <InputField control={form.control} name="discapacidad" label="Discapacidad *" placeholder="Ingrese la discapacidad" disabled={!edit} />

          <div className="gap-2 grid grid-cols-2">
            <SelectField control={form.control} name="entidad_certificadora" label="Entidad certificadora *" options={entidad_certificadoraOp} disabled={!edit} />
            <DateField control={form.control} name="fecha_certificacion" label="Fecha de certificación" disabled={!edit} />
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

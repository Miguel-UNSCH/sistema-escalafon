"use client";

import { createRenuncia, renunciaRecord } from "@/actions/renuncia-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { renunciaSchema, ZRenunciaS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onRenunciaCreated: () => void;
  setSelectedRenuncia: React.Dispatch<React.SetStateAction<renunciaRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
};

export const Create: React.FC<CreateProps> = ({ onRenunciaCreated, setSelectedRenuncia, onCancel, showCancel }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    motivo: "",
    fecha: undefined,
    cargo_id: "",
    dependencia_id: "",
    file: undefined,
  };

  const form = useForm<ZRenunciaS>({ resolver: zodResolver(renunciaSchema), defaultValues });

  const onSubmit = async (data: ZRenunciaS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "renuncias");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createRenuncia({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Renuncia registrada exitosamente.");
          form.reset();
          onRenunciaCreated();
          setSelectedRenuncia(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la renuncia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="motivo" label="Motivo de Renuncia*" placeholder="Ingrese la resolucion del motivo de la renuncia" />

          <DateField control={form.control} name="fecha" label="Fecha de la bonificacion" disabled={false} />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id="cm8hfj7mu0000t88wdvgnkkbo" label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id="cm8hfj7mu0000t88wdvgnkkbo" dependencia_id={form.watch("dependencia_id")} />

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

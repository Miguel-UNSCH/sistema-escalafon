"use client";

import { bonusPersonalRecord, createBonusPer } from "@/actions/bonus_per-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { bonusPersonalSchema, ZBonusPersonal } from "@/lib/schemas/bonus-schema";
import { uploadFile } from "@/service/file-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<bonusPersonalRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, user_id }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo: "",
    resolucion_bonus: "",
    fecha: undefined,
    dependencia_id: "",
    cargo_id: "",
    file: undefined,
  };

  const form = useForm<ZBonusPersonal>({ resolver: zodResolver(bonusPersonalSchema), defaultValues });

  const onSubmit = async (data: ZBonusPersonal) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "bonificaciones");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createBonusPer({ ...data, file_id });

        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Bonificación personal registrada exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la bonificación personal.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="tipo" label="Tipo *" placeholder="Ingrese el tipo de bonificacion personal" />
          <InputField control={form.control} name="resolucion_bonus" label="Resolucion Bonus *" placeholder="Ingrese la resolucion" />

          <DateField control={form.control} name="fecha" label="Fecha de la bonificacion" disabled={false} />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} />

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

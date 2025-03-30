"use client";

import { useForm } from "react-hook-form";
import { ConsRecord } from "./content-data";
import { consSchema, ZConsS } from "@/lib/schemas/documents-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DateField } from "@/components/custom-fields/date-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { InputField } from "@/components/custom-fields/input-field";
import { useTransition } from "react";
import { uploadFile } from "@/service/file-service";
import toast from "react-hot-toast";
import { createCons } from "@/actions/cons-action";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ConsRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
  edit: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, user_id, edit }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    nivel_remunerado: "",
    periodo: { from: undefined, to: undefined },
    pap: "",
    cnp: "",
    cargo_id: "",
    dependencia_id: "",
    file: undefined,
  };

  const form = useForm<ZConsS>({ resolver: zodResolver(consSchema), defaultValues });

  const onSubmit = async (data: ZConsS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "constancias");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createCons({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Registro guardado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar la constancia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <InputField control={form.control} name="nivel_remunerado" label="Nivel remunerativo *" placeholder="nivel remunerativo" disabled={!edit} />
          <InputField control={form.control} name="pap" label="pap *" placeholder="pap" disabled={!edit} />
          <InputField control={form.control} name="cnp" label="cap/cnp *" placeholder="cap/cnp" disabled={!edit} />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" disabled={!edit} />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} disabled={!edit} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={!edit} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={!edit} />
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

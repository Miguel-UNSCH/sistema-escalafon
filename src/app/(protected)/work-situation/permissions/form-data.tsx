"use client";

import { createPerLicVac } from "@/actions/per-lic-vac-action";
import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { per_lic_vacSchema, ZPerLicVacS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { tipoPermisoLicenciaVacacionOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PerLicVacRecord } from "./content-data";
import { InputField } from "@/components/custom-fields/input-field";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<PerLicVacRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
  edit: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel, user_id, edit }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo: undefined,
    detalle: "",
    periodo: { from: undefined, to: undefined },
    cargo_id: "",
    dependencia_id: "",
    file: undefined,
  };

  const form = useForm<ZPerLicVacS>({ resolver: zodResolver(per_lic_vacSchema), defaultValues });

  const onSubmit = async (data: ZPerLicVacS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "permisos_licencias_vacaciones");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createPerLicVac({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Registro guardado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar el permiso/licencia/vacación.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo" label="Tipo de Permiso / Licencia / Vacacion *" options={tipoPermisoLicenciaVacacionOp} disabled={!edit} />
          <InputField control={form.control} name="detalle" label="Detalle *" placeholder="Detalle" disabled={!edit} />

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

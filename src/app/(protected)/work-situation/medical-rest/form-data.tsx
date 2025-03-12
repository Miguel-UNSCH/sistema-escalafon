"use client";
import { createDesanso } from "@/actions/descanso-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
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

type FormDataProps = {
  fetchDescansos: () => void;
};

export const FormData: React.FC<FormDataProps> = ({ fetchDescansos }) => {
  const [isPending, startTransition] = useTransition();
  const defaultValues = {
    tipo_descanso: undefined,
    periodo: { from: undefined, to: undefined },
    cargo: { nombre: "" },
    dependencia: { nombre: "", codigo: "", direccion: "" },
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

        const result = await createDesanso({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Descanso médico registrado exitosamente.");
          form.reset();
          fetchDescansos();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el descanso médico.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-semibold uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_descanso" label="Tipo de Descanso" options={tipoDescansoOp} />
          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
          </div>

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
          </div>

          <UploadField control={form.control} name="file" label="Documento" allowedTypes={["pdf"]} />

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

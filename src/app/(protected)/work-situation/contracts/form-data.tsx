"use client";

import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { createContract } from "@/actions/contract-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CLaboralOp, RLaboralOp, TContratoOp } from "@/utils/options";
import { SelectField } from "@/components/custom-fields/select-field";
import { contratoSchema, ZContratoS } from "@/lib/schemas/w-situation-schema";
import { ContractRecord } from "./content-data";
import { CargoIdDependenciaField, DependenciaIdField } from "@/components/custom-fields/cargos-dependencia";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ContractRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
  user_id: string;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo_contrato: "dl_276",
    condicion_laboral: undefined,
    regimen_laboral: undefined,
    resolucion_contrato: "",
    nivel_remuneracion: "",
    pap: 0,
    cnp: 0,
    meta: "",
    periodo: { from: undefined, to: undefined },
    cargo_id: "",
    dependencia_id: "",
    file: undefined,
  };

  const form = useForm<ZContratoS>({ resolver: zodResolver(contratoSchema), defaultValues: defaultValues as any });
  const tipoContrato = form.watch("tipo_contrato");

  const onSubmit = async (data: ZContratoS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "contratos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createContract({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Contrato registrado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
      } catch {
        toast.error("Error al registrar el contrato.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_contrato" label="Tipo de Contrato *" options={TContratoOp} />
          <SelectField control={form.control} name="condicion_laboral" label="Condición Laboral *" options={CLaboralOp} />

          {(tipoContrato === "dl_276" || tipoContrato === "cas" || tipoContrato === "dl_276_proyecto") && (
            <SelectField control={form.control} name="regimen_laboral" label="Régimen Laboral *" options={RLaboralOp} />
          )}

          {(tipoContrato === "dl_276" || tipoContrato === "dl_276_proyecto" || tipoContrato === "cas") && (
            <InputField
              control={form.control}
              name="resolucion_contrato"
              label={tipoContrato === "cas" ? "Contrato CAS *" : "Resolución de Nombramiento o Contrato *"}
              placeholder="Ingrese la resolución o contrato"
            />
          )}

          {tipoContrato === "dl_276" && (
            <>
              <InputField control={form.control} name="nivel_remuneracion" label="Nivel Remunerativo *" placeholder="Ingrese el nivel" />
              <div className="gap-2 grid grid-cols-2">
                <InputField control={form.control} name="pap" label="PAP" placeholder="Ingrese el PAP" type="number" />
                <InputField control={form.control} name="cnp" label="CNP" placeholder="Ingrese el CNP" type="number" />
              </div>
            </>
          )}

          {tipoContrato === "dl_276_proyecto" && <InputField control={form.control} name="meta" label="Meta *" placeholder="Ingrese la meta" />}

          {tipoContrato === "practicante" && <InputField control={form.control} name="resolucion_contrato" label="Convenio *" placeholder="Ingrese el convenio" />}

          <DependenciaIdField control={form.control} name="dependencia_id" label="Dependencia *" />
          <CargoIdDependenciaField control={form.control} name="cargo_id" dependencia_id={form.watch("dependencia_id")} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminación" disabled={false} />
          </div>

          <UploadField control={form.control} name="file" label="Documento" allowedTypes={["pdf"]} />

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

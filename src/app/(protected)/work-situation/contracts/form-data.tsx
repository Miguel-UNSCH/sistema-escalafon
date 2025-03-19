"use client";

import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { contractRecord, createContract } from "@/actions/contract-action";
import { DateField } from "@/components/custom-fields/date-field";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CLaboralOp, RLaboralOp, TContratoOp } from "@/utils/options";
import { SelectField } from "@/components/custom-fields/select-field";
import { contratoSchema, ZContratoS } from "@/lib/schemas/w-situation-schema";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<contractRecord | null>>;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZContratoS>({
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      tipo_contrato: undefined,
      condicion_laboral: undefined,
      resolucion_contrato: "",
      regimen_laboral: undefined,
      nivel_remuneracion: "",
      pap: 0,
      cnp: 0,
      meta: "",
      convenio: "",
      fecha_ingreso: undefined,
      fecha_cese: undefined,
      file: undefined,
      cargo: { nombre: "" },
      dependencia: { nombre: "", codigo: "", direccion: "" },
    },
  });

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
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
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
          <SelectField control={form.control} name="condicion_laboral" label="Condicion Laboral *" options={CLaboralOp} />

          <InputField control={form.control} name="resolucion_contrato" label="Resolucion de Contrato *" placeholder="Ingrese la resolucion del contrato" />
          <SelectField control={form.control} name="regimen_laboral" label="Regimen Laboral *" options={RLaboralOp} />

          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
          </div>

          <InputField control={form.control} name="nivel_remuneracion" label="Nivel Remunerativo *" placeholder="Ingrese el nivel de remuneracion" />

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="pap" label="PAP" placeholder="Ingrese el PAP" type="number" />
            <InputField control={form.control} name="cnp" label="CNP" placeholder="Ingrese el CNP" type="number" />
          </div>

          <InputField control={form.control} name="meta" label="Meta" placeholder="Ingrese la meta" />
          <InputField control={form.control} name="convenio" label="Convenio" placeholder="Ingrese el convenio" />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="fecha_ingreso" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="fecha_cese" label="Fecha de culminacion" disabled={false} />
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

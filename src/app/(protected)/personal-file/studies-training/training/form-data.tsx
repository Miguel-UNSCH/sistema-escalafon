"use client";

import toast from "react-hot-toast";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/service/file-service";
import { DateField } from "@/components/custom-fields/date-field";
import { createCapacitacion } from "@/actions/capacitacion-action";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { capacitacionSchema, ZCapacitacionS } from "@/lib/schemas/user-schema";
import { CapacitacionRecord } from "./content-data";
import { SelectField } from "@/components/custom-fields/select-field";
import { tCapacitacionOp } from "@/utils/options";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<CapacitacionRecord | null>>;
  onCancel?: () => void;
  showCancel?: boolean;
};

export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem, onCancel, showCancel }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZCapacitacionS>({
    resolver: zodResolver(capacitacionSchema),
    defaultValues: {
      tipe: undefined,
      centro_capacitacion: "",
      materia: "",
      especialidad: "",
      horas_lectivas: 0,
      periodo: { from: undefined, to: undefined },
      file: undefined,
    },
  });

  const onSubmit = async (data: ZCapacitacionS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "capacitaciones");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createCapacitacion({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Capacitación registrada exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar la capacitación.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} label="Tipo de Capacitacion *" name="tipe" options={tCapacitacionOp} />

          <div className="gap-4 grid grid-cols-2">
            <InputField control={form.control} name="centro_capacitacion" label="Centro de Capacitación *" placeholder="Ingrese el nombre del centro de capacitación" />
            <InputField control={form.control} name="materia" label="Materia *" placeholder="Ingrese la materia" />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <InputField control={form.control} name="especialidad" label="Especialidad *" placeholder="Ingrese la especialidad" />
            <InputField control={form.control} name="horas_lectivas" label="Horas Lectivas *" type="number" placeholder="Ingrese las horas lectivas" />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
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

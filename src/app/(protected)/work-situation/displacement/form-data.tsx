"use client";
import { createDesplazamiento, desplazamientoRecord } from "@/actions/desplazamiento-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { desplazamientoSchema, ZDesplazamientoS } from "@/lib/schemas/w-situation-schema";
import { uploadFile } from "@/service/file-service";
import { tipoDesplazamientoOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CreateProps = {
  onCreated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<desplazamientoRecord | null>>;
};
export const Create: React.FC<CreateProps> = ({ onCreated, setSelectedItem }) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues = {
    tipo_desplazamiento: undefined,
    fecha: undefined,
    tipo_file: "",
    current_cargo: { nombre: "" },
    new_cargo: { nombre: "" },
    current_dependencia: { nombre: "", codigo: "", direccion: "" },
    new_dependencia: { nombre: "", codigo: "", direccion: "" },
    file: undefined,
  };
  const form = useForm<ZDesplazamientoS>({ resolver: zodResolver(desplazamientoSchema), defaultValues });

  const onSubmit = async (data: ZDesplazamientoS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "data", "desplazamientos");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        const result = await createDesplazamiento({ ...data, file_id });

        if (!result.success) toast.error(result.message);
        else {
          toast.success("Desplazamiento registrado exitosamente.");
          form.reset();
          onCreated();
          setSelectedItem(null);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al registrar el desplazamiento.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Registrar</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_desplazamiento" label="Tipo de Desplazamiento" options={tipoDesplazamientoOp} />

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="tipo_file" label="Tipo de Documento" placeholder="Ingrese el tipo de documento" />
            <DateField control={form.control} name="fecha" label="Fecha" disabled={false} />
          </div>

          <div className="gap-2 grid grid-cols-2">
            <CargoField control={form.control} name="current_cargo.nombre" placeholder="Cargo Actual *" />
            <CargoField control={form.control} name="new_cargo.nombre" placeholder="Nuevo Cargo *" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia Actual</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <DependenciaField control={form.control} name="current_dependencia" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Nueva Dependencia</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <DependenciaField control={form.control} name="new_dependencia" />
            </div>
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

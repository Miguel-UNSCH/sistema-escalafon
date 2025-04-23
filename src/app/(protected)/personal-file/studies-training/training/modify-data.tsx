"use client";

import { getFile } from "@/actions/file-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { capacitacionSchema, ZCapacitacionS } from "@/lib/schemas/user-schema";
import { CapacitacionRecord } from "./content-data";
import { deleteCapacitacion, updateCapacitacion } from "@/actions/capacitacion-action";
import { tCapacitacionOp } from "@/constants/options";
import { SelectField } from "@/components/custom-fields/select-field";

type ModifyProps = {
  item: CapacitacionRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<CapacitacionRecord | null>>;
  edit: boolean;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem, edit }) => {
  const [isPending, startTransition] = useTransition();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isChangingFile, setIsChangingFile] = useState(false);

  useEffect(() => {
    if (item.file?.id) {
      getFile(item.file.id)
        .then(setFileUrl)
        .catch(() => setFileUrl(null));
    }
  }, [item.file?.id]);

  const defaultValues = {
    centro_capacitacion: item.centro_capacitacion,
    tipe: item.tipe,
    materia: item.materia,
    especialidad: item.especialidad,
    horas_lectivas: item.horas_lectivas.toString(),
    periodo: { from: item.periodo.from, to: item.periodo.to },
    file: undefined,
  };

  const form = useForm<ZCapacitacionS>({ resolver: zodResolver(capacitacionSchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZCapacitacionS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateCapacitacion(item.id, updateData);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Actualizacion exitosa.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
      } catch {
        toast.error("Error al modificar.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteCapacitacion(item.id, item.file_id);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Eliminacion exitosa.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
      } catch {
        toast.error("Error al eliminar.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar Capacitacion</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <SelectField control={form.control} label="Tipo de Capacitacion *" name="tipe" options={tCapacitacionOp} disabled={!edit} />

          <div className="gap-4 grid grid-cols-2">
            <InputField
              control={form.control}
              name="centro_capacitacion"
              label="Centro de Capacitación *"
              placeholder="Ingrese el nombre del centro de capacitación"
              disabled={!edit}
            />
            <InputField control={form.control} name="materia" label="Materia *" placeholder="Ingrese la materia" disabled={!edit} />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <InputField control={form.control} name="especialidad" label="Especialidad *" placeholder="Ingrese la especialidad" disabled={!edit} />
            <InputField control={form.control} name="horas_lectivas" label="Horas Lectivas *" type="text" placeholder="Ingrese las horas lectivas" disabled={!edit} />
          </div>

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={!edit} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={!edit} />
          </div>

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{item.file?.name}</p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" asChild disabled={!edit}>
                  {/* oxlint-disable-next-line jsx-no-target-blank */}
                  <a href={fileUrl} download target="_blank">
                    <Download size={16} /> Descargar
                  </a>
                </Button>
                <Button onClick={() => setIsChangingFile(true)} variant="outline" disabled={!edit}>
                  Cambiar archivo
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col items-end gap-2 w-full">
              <div className="w-full">
                <UploadField control={form.control} name="file" label="Subir nuevo archivo" allowedTypes={["pdf"]} disabled={!edit} />
              </div>
              <Button variant="outline" onClick={() => setIsChangingFile(false)} disabled={!edit}>
                Cancelar
              </Button>
            </div>
          )}

          <div className="flex sm:flex-row flex-col justify-end gap-4">
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              cancelar
            </Button>
            {edit && (
              <>
                <Button onClick={onDelete} type="button" disabled={isPending} className="flex flex-row items-center gap-2 bg-maroon">
                  <Trash size={16} />
                  {isPending ? "Eliminando..." : "Eliminar"}
                </Button>
                <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 bg-teal hover:bg-green">
                  <Save size={16} />
                  {isPending ? "Guardando..." : "Actualizar"}
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

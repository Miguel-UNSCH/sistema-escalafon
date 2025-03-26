"use client";

import { deleteDisability, discapacidadRecord, updateDisability } from "@/actions/disability-action";
import { getFile } from "@/actions/file-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { disabilitySchema, ZDisabilityS } from "@/lib/schemas/user-schema";
import { tDscapacidadOp, entidad_certificadoraOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ModifyProps = {
  item: discapacidadRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<discapacidadRecord | null>>;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem }) => {
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
    tipo: item.tipo,
    discapacidad: item.discapacidad,
    entidad_certificadora: item.entidad_certificadora,
    fecha_certificacion: item.fecha_certificacion?.toISOString(),
    file: undefined,
  };
  const form = useForm<ZDisabilityS>({ resolver: zodResolver(disabilitySchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZDisabilityS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateDisability(item.id, updateData);
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
        const response = await deleteDisability(item.id, item.file_id);
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
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar Discapacidad</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo" label="Tipo *" options={tDscapacidadOp} />
          <InputField control={form.control} name="discapacidad" label="Discapacidad *" placeholder="Ingrese la discapacidad" />

          <div className="gap-2 grid grid-cols-2">
            <SelectField control={form.control} name="entidad_certificadora" label="Entidad certificadora *" options={entidad_certificadoraOp} />
            <DateField control={form.control} name="fecha_certificacion" label="Fecha de certificación" disabled={false} />
          </div>

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{item.file?.name}</p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" asChild>
                  {/*oxlint-disable-next-line jsx-no-target-blank */}
                  <a href={fileUrl} download target="_blank">
                    <Download size={16} /> Descargar
                  </a>
                </Button>
                <Button onClick={() => setIsChangingFile(true)} variant="outline">
                  Cambiar archivo
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col items-end gap-2 w-full">
              <div className="w-full">
                <UploadField control={form.control} name="file" label="Subir nuevo archivo" allowedTypes={["pdf"]} />
              </div>
              <Button variant="outline" onClick={() => setIsChangingFile(false)}>
                Cancelar
              </Button>
            </div>
          )}

          <div className="flex sm:flex-row flex-col justify-end gap-4">
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              cancelar
            </Button>
            <Button onClick={onDelete} type="button" disabled={isPending} className="flex flex-row items-center gap-2 bg-maroon">
              <Trash size={16} />
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 bg-teal hover:bg-green">
              <Save size={16} />
              {isPending ? "Guardando..." : "Actualizar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

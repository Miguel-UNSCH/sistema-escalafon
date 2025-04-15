"use client";

import { getFile } from "@/actions/file-action";
import { DateField } from "@/components/custom-fields/date-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { desplazamientoSchema, ZDesplazamientoS } from "@/lib/schemas/w-situation-schema";
import { deleteDesplazamiento, desplazamientoRecord, updateDesplazamiento } from "@/actions/desplazamiento-action";
import { SelectField } from "@/components/custom-fields/select-field";
import { tipoDesplazamientoOp } from "@/constants/options";
import { InputField } from "@/components/custom-fields/input-field";
import { CargoIdDependenciaField, DependenciaIdField } from "@/components/custom-fields/cargos-dependencia";

type ModifyProps = {
  item: desplazamientoRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<desplazamientoRecord | null>>;
  edit: boolean;
  id: string;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem, edit, id }) => {
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
    tipo_desplazamiento: item.tipo_desplazamiento,
    tipo_file: item.tipo_file,
    fecha: item.fecha.toString(),
    current_cargo_id: item.currentUCD.cargoDependencia.cargo.id.toString(),
    new_cargo_id: item.newUCD.cargoDependencia.cargo.id.toString(),
    current_dependencia_id: item.currentUCD.cargoDependencia.dependencia.id.toString(),
    new_dependencia_id: item.newUCD.cargoDependencia.dependencia.id.toString(),
    file: undefined,
  };

  const form = useForm<ZDesplazamientoS>({ resolver: zodResolver(desplazamientoSchema), defaultValues: defaultValues as any });

  useEffect(() => {
    form.reset(defaultValues as any);
  }, [item, form]);

  const onUpdate = async (data: ZDesplazamientoS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateDesplazamiento(item.id, id, updateData);
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
        const response = await deleteDesplazamiento(item.id, item.file_id);
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
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar desplazamientos</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_desplazamiento" label="Tipo de Desplazamiento" options={tipoDesplazamientoOp} disabled={!edit} />

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="tipo_file" label="Tipo de Documento" placeholder="Ingrese el tipo de documento" disabled={!edit} />
            <DateField control={form.control} name="fecha" label="Fecha" disabled={!edit} />
          </div>

          <DependenciaIdField control={form.control} name="current_dependencia_id" label="Dependencia Actual *" disabled={!edit} />
          <CargoIdDependenciaField control={form.control} name="current_cargo_id" dependencia_id={form.watch("current_dependencia_id")} label="Cargo Actual *" disabled={!edit} />

          <DependenciaIdField control={form.control} name="new_dependencia_id" label="Nueva Dependencia *" disabled={!edit} />
          <CargoIdDependenciaField control={form.control} name="new_cargo_id" dependencia_id={form.watch("new_dependencia_id")} label="Nuevo Cargo *" disabled={!edit} />

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

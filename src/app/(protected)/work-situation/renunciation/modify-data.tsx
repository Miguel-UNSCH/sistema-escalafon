"use client";

import { getFile } from "@/actions/file-action";
import { deleteRenuncia, renunciaRecord, updateRenuncia } from "@/actions/renuncia-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { InputField } from "@/components/custom-fields/input-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { renunciaSchema, ZRenunciaS } from "@/lib/schemas/w-situation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ModifyProps = {
  renuncia: renunciaRecord;
  onUpdated: () => void;
  setSelectedRenuncia: React.Dispatch<React.SetStateAction<renunciaRecord | null>>;
};

export const Modify: React.FC<ModifyProps> = ({ renuncia, onUpdated, setSelectedRenuncia }) => {
  const [isPending, startTransition] = useTransition();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isChangingFile, setIsChangingFile] = useState(false);

  useEffect(() => {
    if (renuncia.file?.id) {
      getFile(renuncia.file.id)
        .then(setFileUrl)
        .catch(() => setFileUrl(null));
    }
  }, [renuncia.file?.id]);

  const defaultValues = {
    motivo: renuncia.motivo,
    fecha: renuncia.fecha.toISOString().split("T")[0],
    cargo: { nombre: renuncia.cargo.nombre },
    dependencia: { nombre: renuncia.dependencia.nombre, codigo: renuncia.dependencia.codigo, direccion: renuncia.dependencia.direccion || "" },
    file: undefined,
  };
  const form = useForm<ZRenunciaS>({ resolver: zodResolver(renunciaSchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZRenunciaS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateRenuncia(renuncia.id, updateData);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Renucnia actualizada exitosamente.");
          onUpdated();
          setSelectedRenuncia(null);
          form.reset();
        }
      } catch (e: unknown) {
        toast.error("Error al modificar la Renucnia.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteRenuncia(renuncia.id, renuncia.file_id);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Renuncia eliminado exitosamente.");
          onUpdated();
          setSelectedRenuncia(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al modificar la Renuncia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar Merito</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <InputField control={form.control} name="motivo" label="Motivo de Renuncia*" placeholder="Ingrese la resolucion del motivo de la renuncia" />

          <DateField control={form.control} name="fecha" label="Fecha de la bonificacion" disabled={false} />

          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
          </div>

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{renuncia.file?.name}</p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" asChild>
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
            <Button variant="outline" onClick={() => setSelectedRenuncia(null)}>
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

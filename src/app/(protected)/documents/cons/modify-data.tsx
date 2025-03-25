"use client";

import { useEffect, useState, useTransition } from "react";
import { ConsRecord } from "./content-data";
import { getFile } from "@/actions/file-action";
import { useForm } from "react-hook-form";
import { consSchema, ZConsS } from "@/lib/schemas/documents-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Download, Save, Trash } from "lucide-react";
import { UploadField } from "@/components/custom-fields/upload-file";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { deleteCons, uploadCons } from "@/actions/cons-action";
import toast from "react-hot-toast";

type ModifyProps = {
  item: ConsRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ConsRecord | null>>;
  user_id: string;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem, user_id }) => {
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
    nivel_remunerado: item.nivel_remunerado,
    periodo: { from: new Date(item.periodo.from), to: new Date(item.periodo.to) },
    pap: item.pap.toString(),
    cnp: item.cnp.toString(),
    cargo_id: item.ucd.cargoDependencia.cargo.id.toString(),
    dependencia_id: item.ucd.cargoDependencia.dependencia.id.toString(),
    file: undefined,
  };

  const form = useForm<ZConsS>({ resolver: zodResolver(consSchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZConsS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await uploadCons(item.id, updateData);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Constancia actualizada exitosamente.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al modificar la constancia.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteCons(item.id, item.file_id);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Constancia eliminada exitosamente.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
        // eslint-disable-next-line no-unused-vars
      } catch (e: unknown) {
        toast.error("Error al eliminar la constancia.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar datos</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <InputField control={form.control} name="nivel_remunerado" label="Nivel remunerativo *" placeholder="nivel remunerativo" />
          <InputField control={form.control} name="pap" label="pap *" placeholder="pap" />
          <InputField control={form.control} name="cnp" label="cap/cnp *" placeholder="cap/cnp" />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
          </div>

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{item.file?.name}</p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" asChild>
                  {/* eslint-disable-next-line jsx-no-target-blank */}
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

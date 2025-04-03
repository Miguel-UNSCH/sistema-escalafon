"use client";

import { deleteEvaluation, evaluationRecord, updateEvaliation } from "@/actions/evaluation-action";
import { getFile } from "@/actions/file-action";
import { DateField } from "@/components/custom-fields/date-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { UserField } from "@/components/custom-fields/user-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { evaluationSchema, ZEvaluation } from "@/lib/schemas/bonus-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

type ModifyProps = {
  item: evaluationRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<evaluationRecord | null>>;
  user_id: string;
  edit: boolean;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem, user_id, edit }) => {
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
    evaluador: { name: item.evaluador.name, dni: item.evaluador.dni, id: item.evaluador.id },
    etapa: item.etapa.toString(),
    fecha: item.fecha.toString(),
    cargo_id: item.evaluado_ucd.cargoDependencia.cargo.id.toString(),
    dependencia_id: item.evaluado_ucd.cargoDependencia.dependencia.id.toString(),
    ev_cargo_id: item.evaluador_ucd.cargoDependencia.cargo.id.toString(),
    ev_dependencia_id: item.evaluador_ucd.cargoDependencia.dependencia.id.toString(),
    file: undefined,
  };

  const form = useForm<ZEvaluation>({ resolver: zodResolver(evaluationSchema), defaultValues: defaultValues as any });

  useEffect(() => {
    form.reset(defaultValues as any);
  }, [item, form]);

  const evaluadorId = useWatch({
    control: form.control,
    name: "evaluador.id",
    defaultValue: item.evaluador.id,
  });

  const onUpdate = async (data: ZEvaluation) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateEvaliation(item.id, user_id, updateData);
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
        const response = await deleteEvaluation(item.id, item.file_id);
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

  const selectValues = [
    { key: "0", value: "Ninguna" },
    { key: "1", value: "Primera Etapa" },
    { key: "2", value: "Segunda Etapa" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">actualizar datos</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <div className="gap-2 grid grid-cols-2">
            <DateField control={form.control} name="fecha" label="Fecha de la evaluacion" disabled={!edit} />
            <SelectField control={form.control} name="etapa" label="Etapa" options={selectValues} disabled={!edit} />
          </div>

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={user_id} label="Dependencia *" disabled={!edit} />
          <CargosUserField control={form.control} name="cargo_id" user_id={user_id} dependencia_id={form.watch("dependencia_id")} label="Cargo *" disabled={!edit} />

          <div className="flex flex-col gap-4">
            <p className="font-primary font-semibold">Datos del Evaluador</p>
            <UserField control={form.control} name="evaluador" label="Numbre *" disabled={!edit} />
            <DependenciasUserField control={form.control} name="ev_dependencia_id" user_id={evaluadorId} label="Dependencia *" disabled={!edit} />
            <CargosUserField control={form.control} name="ev_cargo_id" user_id={evaluadorId} dependencia_id={form.watch("ev_dependencia_id")} label="Cargo *" disabled={!edit} />
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

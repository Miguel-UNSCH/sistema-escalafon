"use client";

import { useEffect, useState, useTransition } from "react";
import { getFile } from "@/actions/file-action";
import { demeritoSchema, ZDemerito } from "@/lib/schemas/m-d-schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Download, Save, Trash } from "lucide-react";
import { UploadField } from "@/components/custom-fields/upload-file";
import { UserField } from "@/components/custom-fields/user-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { InputField } from "@/components/custom-fields/input-field";
import { CargosUserField, DependenciasUserField } from "@/components/custom-fields/user-cargos-dependencia";
import { DateField } from "@/components/custom-fields/date-field";
import { tipo_sancionOp } from "@/constants/options";
import { deleteDemerito, demeritoRecord, updateDemerito } from "@/actions/m-d-action";
import toast from "react-hot-toast";

type ModifyProps = {
  item: demeritoRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<demeritoRecord | null>>;
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
    user: { name: item.user.name, dni: item.user.dni, id: item.user.id },
    tipo_sancion: item.tipo_sancion,
    tipo_documento: item.tipo_documento,
    asunto: item.asunto,
    fecha_start: item.fecha_start.toString(),
    fecha_end: item.fecha_end?.toString(),
    dependencia_id: item.ucd.cargoDependencia.dependencia.id.toString(),
    cargo_id: item.ucd.cargoDependencia.cargo.id.toString(),
    file: undefined,
  };

  const form = useForm<ZDemerito>({ resolver: zodResolver(demeritoSchema), defaultValues: defaultValues as any });

  const userId = useWatch({
    control: form.control,
    name: "user.id",
    defaultValue: item.user.id,
  });

  const tipoSancion = useWatch({
    control: form.control,
    name: "tipo_sancion",
    defaultValue: item.tipo_sancion,
  });

  useEffect(() => {
    form.reset(defaultValues as any);
  }, [item, form]);

  const onUpdate = async (data: ZDemerito) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateDemerito(item.id, updateData);
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
        const response = await deleteDemerito(item.id, item.file_id);
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
    { key: "1", value: "Resolucion" },
    { key: "2", value: "Memorando" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar Merito</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <UserField control={form.control} name="user" label="Buscar al personal" />

          <SelectField control={form.control} name="tipo_sancion" label="Tipo de Sancion *" options={tipo_sancionOp} />
          <SelectField control={form.control} name="tipo_documento" label="Tipo de Documento *" options={selectValues} />

          <InputField control={form.control} name="asunto" label="Detalle *" placeholder="Detalle de la sancion" />

          <DependenciasUserField control={form.control} name="dependencia_id" user_id={userId} label="Dependencia *" />
          <CargosUserField control={form.control} name="cargo_id" user_id={userId} dependencia_id={form.watch("dependencia_id")} />

          {tipoSancion === "sus" ? (
            <div className="gap-4 grid grid-cols-2">
              <DateField control={form.control} name="fecha_start" label="Fecha de inicio" disabled={false} dateLimit="any" />
              <DateField control={form.control} name="fecha_end" label="Fecha de culminación" disabled={false} dateLimit="any" />
            </div>
          ) : (
            <DateField control={form.control} name="fecha_start" label="Fecha" disabled={false} dateLimit="past" />
          )}

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{item.file?.name}</p>
              </div>
              <div className="flex md:flex-row flex-col gap-2 w-full md:w-auto">
                <Button variant="outline" asChild>
                  {/* oxlint-disable-next-line jsx-no-target-blank */}
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

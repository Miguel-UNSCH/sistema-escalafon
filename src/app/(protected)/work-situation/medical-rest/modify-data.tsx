import { useEffect, useState, useTransition } from "react";
import { DescansoMedicoRecord } from "./content-data";
import { getFile } from "@/actions/file-action";
import { descansoMedicoSchema, ZDesMedS } from "@/lib/schemas/w-situation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { deleteDescanso, updateDescanso } from "@/actions/descanso-action";
import toast from "react-hot-toast";
import { Form } from "@/components/ui/form";
import { SelectField } from "@/components/custom-fields/select-field";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { DateField } from "@/components/custom-fields/date-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Download, Save, Trash } from "lucide-react";
import { tipoDescansoOp } from "@/utils/options";

type ModifyProps = {
  medical: DescansoMedicoRecord;
  onUpdated: () => void;
  setSelectedMedical: React.Dispatch<React.SetStateAction<DescansoMedicoRecord | null>>;
};

export const Modify: React.FC<ModifyProps> = ({ medical, onUpdated, setSelectedMedical }) => {
  const [isPending, startTransition] = useTransition();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isChangingFile, setIsChangingFile] = useState(false);

  useEffect(() => {
    if (medical.file?.id) {
      getFile(medical.file.id)
        .then(setFileUrl)
        .catch(() => setFileUrl(null));
    }
  }, [medical.file?.id]);

  const defaultValues = {
    tipo_descanso: medical.tipo_descanso,
    periodo: { from: medical.periodo.from, to: medical.periodo.from },
    cargo: { nombre: medical.cargo.nombre },
    dependencia: { nombre: medical.dependencia.nombre, codigo: medical.dependencia.codigo, direccion: medical.dependencia.direccion },
    file: undefined,
  };

  const form = useForm<ZDesMedS>({ resolver: zodResolver(descansoMedicoSchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZDesMedS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateDescanso(medical.id, updateData);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Descanso actualizado exitosamente.");
          onUpdated();
          setSelectedMedical(null);
          form.reset();
        }
      } catch (e: unknown) {
        toast.error("Error al modificar el descanso.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteDescanso(medical.id, medical.file_id);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Descanso eliminado exitosamente.");
          onUpdated();
          setSelectedMedical(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al modificar el Descanso.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Modificar Descanso Medico</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_descanso" label="Tipo de Descanso" options={tipoDescansoOp} />

          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
          </div>

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminacion" disabled={false} />
          </div>

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{medical.file?.name}</p>
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
            <Button variant="outline" onClick={() => setSelectedMedical(null)}>
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

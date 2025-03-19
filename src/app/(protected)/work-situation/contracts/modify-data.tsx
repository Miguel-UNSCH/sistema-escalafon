import { contractRecord, deleteContract, updateContract } from "@/actions/contract-action";
import { getFile } from "@/actions/file-action";
import { CargoField } from "@/components/custom-fields/cargo-field";
import { DateField } from "@/components/custom-fields/date-field";
import { DependenciaField } from "@/components/custom-fields/dependencia-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { contratoSchema, ZContratoS } from "@/lib/schemas/w-situation-schema";
import { TContratoOp, CLaboralOp, RLaboralOp } from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ModifyProps = {
  item: contractRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<contractRecord | null>>;
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
    tipo_contrato: item.tipo_contrato,
    condicion_laboral: item.condicion_laboral,
    resolucion_contrato: item.resolucion_contrato,
    regimen_laboral: item.regimen_laboral,
    nivel_remuneracion: item.nivel_remuneracion,
    pap: item.pap,
    cnp: item.cnp,
    meta: item.meta,
    convenio: item.convenio,
    fecha_ingreso: item.fecha_ingreso.toISOString(),
    fecha_cese: item.fecha_cese?.toISOString(),
    file: undefined,
    cargo: { nombre: item.cargo.nombre },
    dependencia: { nombre: item.dependencia.nombre, codigo: item.dependencia.codigo, direccion: item.dependencia.direccion },
  };

  const form = useForm<ZContratoS>({ resolver: zodResolver(contratoSchema), defaultValues: defaultValues as any });

  const onUpdate = async (data: ZContratoS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateContract(item.id, updateData);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Actualizacion exitosa.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
      } catch (e: unknown) {
        toast.error("Error al modificar.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteContract(item.id, item.file_id);
        if (!response.success) toast.error(response.message);
        else {
          toast.success("Eliminacion exitosa.");
          onUpdated();
          setSelectedItem(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al eliminar.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full font-text">
      <p className="font-primary font-bold text-mauve text-xl uppercase">Actualizar datos del contrato</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_contrato" label="Tipo de Contrato *" options={TContratoOp} />
          <SelectField control={form.control} name="condicion_laboral" label="Condicion Laboral *" options={CLaboralOp} />

          <InputField control={form.control} name="resolucion_contrato" label="Resolucion de Contrato *" placeholder="Ingrese la resolucion del contrato" />
          <SelectField control={form.control} name="regimen_laboral" label="Regimen Laboral *" options={RLaboralOp} />

          <CargoField control={form.control} name="cargo.nombre" />

          <div className="flex flex-col gap-2">
            <p className="font-primary font-semibold text-md">Dependencia</p>
            <div className="gap-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
              <DependenciaField control={form.control} />
            </div>
          </div>

          <InputField control={form.control} name="nivel_remuneracion" label="Nivel Remunerativo *" placeholder="Ingrese el nivel de remuneracion" />

          <div className="gap-2 grid grid-cols-2">
            <InputField control={form.control} name="pap" label="PAP" placeholder="Ingrese el PAP" type="number" />
            <InputField control={form.control} name="cnp" label="CNP" placeholder="Ingrese el CNP" type="number" />
          </div>

          <InputField control={form.control} name="meta" label="Meta" placeholder="Ingrese la meta" />
          <InputField control={form.control} name="convenio" label="Convenio" placeholder="Ingrese el convenio" />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="fecha_ingreso" label="Fecha de inicio" disabled={false} />
            <DateField control={form.control} name="fecha_cese" label="Fecha de culminacion" disabled={false} />
          </div>

          {fileUrl && !isChangingFile ? (
            <div className="flex md:flex-row flex-col items-center gap-4 md:text-left text-center">
              <div className="flex flex-row items-center gap-2 w-full">
                <p className="text-left text-nowrap">Archivo actual</p>
                <p className="bg-mantle p-4 py-3 rounded-md w-full">{item.file?.name}</p>
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

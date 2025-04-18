import { deleteContract, updateContract } from "@/actions/contract-action";
import { getFile } from "@/actions/file-action";
import { DateField } from "@/components/custom-fields/date-field";
import { InputField } from "@/components/custom-fields/input-field";
import { SelectField } from "@/components/custom-fields/select-field";
import { UploadField } from "@/components/custom-fields/upload-file";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { contratoSchema, ZContratoS } from "@/lib/schemas/w-situation-schema";
import { TContratoOp, reg_lab_op, cond_lab_op } from "@/constants/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Trash } from "lucide-react";
import React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ContractRecord } from "./content-data";
import { CargoIdDependenciaField, DependenciaIdField } from "@/components/custom-fields/cargos-dependencia";

type ModifyProps = {
  item: ContractRecord;
  onUpdated: () => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<ContractRecord | null>>;
  user_id: string;
  edit: boolean;
};

export const Modify: React.FC<ModifyProps> = ({ item, onUpdated, setSelectedItem, edit, user_id }) => {
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
    regimen_laboral: item.regimen_laboral || "",
    nivel_remuneracion: item.nivel_remuneracion || "",
    pap: item.pap || 0,
    cnp: item.cnp || 0,
    meta: item.meta || "",
    obrea: item.obra || "",
    cargo_id: item.ucd.cargoDependencia.cargo.id.toString(),
    dependencia_id: item.ucd.cargoDependencia.dependencia.id.toString(),
    periodo: { from: new Date(item.periodo.from), to: new Date(item.periodo.to) },
    file: undefined,
  };

  const form = useForm<ZContratoS>({ resolver: zodResolver(contratoSchema), defaultValues: defaultValues as any });
  const tipoContrato = form.watch("tipo_contrato");

  const onUpdate = async (data: ZContratoS) => {
    startTransition(async () => {
      try {
        const updateData = { ...data };

        if (isChangingFile && data.file) updateData.file = data.file;

        const response = await updateContract(item.id, user_id, updateData);
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
        const response = await deleteContract(item.id, item.file_id);
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
      <p className="font-primary font-bold text-mauve text-xl uppercase">Actualizar datos del contrato</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 pb-5">
          <SelectField control={form.control} name="tipo_contrato" label="Tipo de Contrato *" options={TContratoOp} disabled={!edit} />
          {["dl_276", "cas", "pro_inv", "prac"].includes(tipoContrato) && (
            <SelectField
              control={form.control}
              name="condicion_laboral"
              label="Condición Laboral *"
              options={cond_lab_op[tipoContrato as keyof typeof cond_lab_op]}
              disabled={!edit}
            />
          )}

          {["dl_276", "cas", "pro_inv"].includes(tipoContrato) && (
            <SelectField control={form.control} name="regimen_laboral" label="Régimen Laboral *" options={reg_lab_op[tipoContrato as keyof typeof reg_lab_op]} disabled={!edit} />
          )}

          {(tipoContrato === "dl_276" || tipoContrato === "pro_inv" || tipoContrato === "cas") && (
            <InputField
              control={form.control}
              name="resolucion_contrato"
              label={tipoContrato === "cas" ? "Contrato CAS *" : "Resolución de Nombramiento o Contrato *"}
              placeholder="Ingrese la resolución o contrato"
              disabled={!edit}
            />
          )}

          {tipoContrato === "dl_276" && (
            <>
              <InputField control={form.control} name="nivel_remuneracion" label="Nivel Remunerativo *" placeholder="Ingrese el nivel" disabled={!edit} />
              <div className="gap-2 grid grid-cols-2">
                <InputField control={form.control} name="pap" label="PAP" placeholder="Ingrese el PAP" type="number" disabled={!edit} />
                <InputField control={form.control} name="cnp" label="CNP" placeholder="Ingrese el CNP" type="number" disabled={!edit} />
              </div>
            </>
          )}

          {tipoContrato === "pro_inv" && (
            <>
              <InputField control={form.control} name="meta" label="Meta *" placeholder="Ingrese la meta" disabled={!edit} />
              <InputField control={form.control} name="obra" label="Obra *" placeholder="Ingrese la obra" disabled={!edit} />
            </>
          )}

          {tipoContrato === "pra" && <InputField control={form.control} name="resolucion_contrato" label="Convenio *" placeholder="Ingrese el convenio" disabled={!edit} />}

          <DependenciaIdField control={form.control} name="dependencia_id" label="Dependencia *" disabled={!edit} />
          <CargoIdDependenciaField control={form.control} name="cargo_id" dependencia_id={form.watch("dependencia_id")} disabled={!edit} />

          <div className="gap-4 grid grid-cols-2">
            <DateField control={form.control} name="periodo.from" label="Fecha de inicio" disabled={!edit} />
            <DateField control={form.control} name="periodo.to" label="Fecha de culminación" disabled={!edit} />
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

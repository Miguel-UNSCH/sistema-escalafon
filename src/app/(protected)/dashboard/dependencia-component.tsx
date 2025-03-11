import { createDependencia, deleteDependencia, getAllDependencias, updateDependencia } from "@/actions/others-action";
import { InputField } from "@/components/custom-fields/input-field";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { dependenciaSchema, ZDependencia } from "@/lib/schemas/others-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dependencia } from "@prisma/client";
import { Boxes, RefreshCcw, Save, Trash } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export const DependenciaComponent = () => {
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDependencia, setSelectedDependencia] = useState<Dependencia | null>(null);
  const itemsPerPage = 10;

  const fnDependencias = async () => {
    const data: Dependencia[] | null = await getAllDependencias();
    if (data) setDependencias(data);
  };

  useEffect(() => {
    fnDependencias();
  }, []);

  const handleRefresh = () => {
    fnDependencias();
    setSelectedDependencia(null);
  };

  const theadContent = ["nombre", "codigo", "direccion"];
  const totalPages = Math.ceil(dependencias.length / itemsPerPage);
  const currentDependencias = dependencias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-row gap-2 py-4 w-full">
      <div className="flex flex-col gap-2 w-1/2">
        <div className="flex flex-row justify-between items-center">
          <p className="font-primary font-bold">Dependencias</p>
          <button onClick={handleRefresh} className="flex flex-row items-center gap-2 bg-teal hover:bg-green px-3 py-1 rounded-full text-sm text-base cursor-pointer">
            <span>Actualizar</span>
            <RefreshCcw size={12} />
          </button>
        </div>

        <p>Buscar dependencias por nombre o codigo</p>

        <div className="relative sm:rounded-md overflow-x-auto">
          <table className="w-full text-text text-sm text-left rtl:text-right">
            <thead className="top-0 z-10 sticky text-xs uppercase">
              <tr>
                {theadContent.map((thead) => (
                  <th scope="col" className="px-3 py-3 text-sm" key={thead}>
                    {thead}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentDependencias.map((dependencia) => (
                <tr key={dependencia.id} className="hover:bg-crust text-xs cursor-pointer" onClick={() => setSelectedDependencia(dependencia)}>
                  <td className="px-3 py-4">{dependencia.nombre}</td>
                  <td className="px-3 py-4">{dependencia.codigo}</td>
                  <td className="px-3 py-4">{dependencia.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>

      <div className="flex flex-col gap-5 p-4 w-1/2">
        <CreateDependenciaComponent onDependenciaCreated={handleRefresh} />
        {selectedDependencia && <ModifyDependenciaComponent key={selectedDependencia.id} dependencia={selectedDependencia} onUpdated={handleRefresh} />}
      </div>
    </div>
  );
};

export const CreateDependenciaComponent = ({ onDependenciaCreated }: { onDependenciaCreated: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const form = useForm<ZDependencia>({
    resolver: zodResolver(dependenciaSchema),
    defaultValues: { nombre: "", codigo: "", direccion: "" },
  });

  const onSubmit = (data: ZDependencia) => {
    setError("");

    startTransition(async () => {
      const result = await createDependencia(data);

      if (!result.success) {
        setError(result.message);
      } else {
        form.reset();
        onDependenciaCreated();
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Agregar Nueva Dependencia</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputField control={form.control} name="nombre" label="Nombre" placeholder="Ingrese el nombre de la dependencia" />
          <InputField control={form.control} name="codigo" label="Codigo" placeholder="Ingrese el codigo de la dependencia" />
          <InputField control={form.control} name="direccion" label="Direccion" placeholder="Ingrese la direccion de la dependencia" />

          {error && <p className="font-special text-red">{error}</p>}
          <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
            <Boxes />
            {isPending ? "Guardando..." : "Crear Dependencia"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export const ModifyDependenciaComponent = ({ dependencia, onUpdated }: { dependencia: Dependencia; onUpdated: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<ZDependencia>({
    resolver: zodResolver(dependenciaSchema),
    defaultValues: { nombre: dependencia.nombre, codigo: dependencia.codigo, direccion: dependencia.direccion || "" },
  });

  const onUpdate = (data: ZDependencia) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await updateDependencia(dependencia.id, data);

      if (!result.success) {
        setError(result.message);
      } else {
        setSuccess("Dependencia modificado con éxito.");
        onUpdated();
      }

      setTimeout(() => setSuccess(""), 2000);
    });
  };

  const onDelete = () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await deleteDependencia(dependencia.id);

      if (!result.success) {
        setError(result.message);
      } else {
        setSuccess("Dependencia eliminado con éxito.");
        onUpdated();
      }

      setTimeout(() => setSuccess(""), 2000);
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Modificar Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre" placeholder="Nombre de la dependencia" />
          <InputField control={form.control} name="codigo" label="Codigo" placeholder="Codigo de la dependencia" />
          <InputField control={form.control} name="direccion" label="Direccion" placeholder="Direccion de la dependencia" />

          {error && <p className="font-special text-red">{error}</p>}
          {success && <p className="font-special text-green">{success}</p>}

          <div className="flex gap-4">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2 bg-blue">
              <Save size={16} />
              {isPending ? "Guardando..." : "Actualizar"}
            </Button>

            <Button onClick={onDelete} type="button" disabled={isPending} className="flex flex-row items-center gap-2 bg-red">
              <Trash size={16} />
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

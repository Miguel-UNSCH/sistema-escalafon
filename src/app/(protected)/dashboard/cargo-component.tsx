"use client";

import { Cargo } from "@prisma/client";
import { Package, Save, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import { cargoSchema, ZCargo } from "@/lib/schemas/others-schema";
import { InputField } from "@/components/custom-fields/input-field";
import { createCargo, deleteCargo, getAllCargos, patchCargo } from "@/actions/others-action";

export const CargoComponent = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const itemsPerPage = 10;

  const fnCargos = async () => {
    const data: Cargo[] | null = await getAllCargos();
    if (data) setCargos(data);
  };

  useEffect(() => {
    fnCargos();
  }, []);

  const handleRefresh = () => {
    fnCargos();
    setSelectedCargo(null);
  };

  const totalPages = Math.ceil(cargos.length / itemsPerPage);
  const currentCargos = cargos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-row gap-2 py-4 w-full">
      <div className="flex flex-col gap-2 w-1/2">
        <div className="flex flex-row items-center gap-2">
          <p className="font-primary font-bold">Cargos</p>
        </div>
        <p>Buscar cargos por nombre o ID</p>

        <div className="relative sm:rounded-md overflow-x-auto">
          <table className="w-full text-text text-sm text-left rtl:text-right">
            <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3 text-sm">
                  N
                </th>
                <th scope="col" className="px-6 py-3 text-sm">
                  Nombre
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCargos.map((cargo) => (
                <tr key={cargo.id} className="hover:bg-crust text-xs cursor-pointer" onClick={() => setSelectedCargo(cargo)}>
                  <td className="px-6 py-4">{cargo.id}</td>
                  <td className="px-6 py-4">{cargo.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>

      <div className="flex flex-col gap-5 p-4 w-1/2">
        <CreateCargoComponent onCargoCreated={handleRefresh} />
        {selectedCargo && <ModifyCargoComponent key={selectedCargo.id} cargo={selectedCargo} onUpdated={handleRefresh} />}
      </div>
    </div>
  );
};

export const CreateCargoComponent = ({ onCargoCreated }: { onCargoCreated: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: { nombre: "" },
  });

  const onSubmit = (data: ZCargo) => {
    setError("");

    startTransition(async () => {
      const result = await createCargo(data);

      if (!result.success) {
        setError(result.message);
      } else {
        form.reset();
        onCargoCreated();
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Agregar Nuevo Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre del cargo" placeholder="Ejemplo: Gerente" />

          {error && <p className="font-special text-red">{error}</p>}
          <div className="flex flex-row justify-end">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              <Package />
              {isPending ? "Creando..." : "Crear Cargo"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export const ModifyCargoComponent = ({ cargo, onUpdated }: { cargo: Cargo; onUpdated: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: { nombre: cargo.nombre },
  });

  const onUpdate = (data: ZCargo) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await patchCargo(cargo.id, data.nombre);

      if (!result.success) {
        setError(result.message);
      } else {
        setSuccess("Cargo modificado con éxito.");
        onUpdated();
      }

      setTimeout(() => setSuccess(""), 2000);
    });
  };

  const onDelete = () => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await deleteCargo(cargo.id);

      if (!result.success) {
        setError(result.message);
      } else {
        setSuccess("Cargo eliminado con éxito.");
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
          <InputField control={form.control} name="nombre" label="Nombre del Cargo" placeholder="Ejemplo: Gerente" />

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

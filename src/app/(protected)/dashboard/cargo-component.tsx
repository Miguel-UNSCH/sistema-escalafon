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
import { createCargo, deleteCargo, getCargos, patchCargo } from "@/actions/others-action";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { SearchField } from "@/components/custom-fields/search-field";

export const CargoComponent = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fnCargos = async (search: string) => {
    setLoading(true);
    try {
      const response = await getCargos(search);
      if (response.success && response.data) {
        setCargos(response.data);
      } else {
        toast.error(response.message || "No se pudieron obtener los cargos.");
      }
    } catch (e: unknown) {
      toast.error("Error al obtener los cargos.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFnCargos = debounce(fnCargos, 500);

  const handleSearch = (query: string) => {
    setSearch(query);
    debouncedFnCargos(query);
  };

  useEffect(() => {
    fnCargos("");
  }, []);

  const handleRefresh = () => {
    setSearch("");
    fnCargos("");
    setSelectedCargo(null);
  };

  const headColum = ["n", "nombre"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(cargos.length / itemsPerPage);
  const currentCargos = cargos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-2 py-4 w-full">
      <p className="font-primary font-bold">Cargos</p>
      <SearchField description="Buscar cargos por nombre" value={search} onSearch={handleSearch} />

      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-1/2">
          {loading ? (
            <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
          ) : cargos.length === 0 ? (
            <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
          ) : (
            <div className="relative sm:rounded-md overflow-x-auto">
              <table className="w-full text-text text-sm text-left rtl:text-right">
                <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
                  <tr>
                    {headColum.map((head, i) => (
                      <th scope="col" className="px-6 py-3 text-sm" key={i}>
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentCargos.map((cargo) => (
                    <tr
                      key={cargo.id}
                      className={`hover:bg-crust text-xs cursor-pointer ${selectedCargo?.id === cargo.id ? "bg-crust" : ""}`}
                      onClick={() => setSelectedCargo(cargo)}
                    >
                      <td className="px-6 py-3 rounded-s-md">{cargo.id}</td>
                      <td className="px-6 py-3 rounded-e-md">{cargo.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} totalItems={cargos.length} />
        </div>

        <div className="flex flex-col gap-5 p-4 w-1/2">
          <CreateCargoComponent onCargoCreated={handleRefresh} setSelectedCargo={setSelectedCargo} />
          {selectedCargo && <ModifyCargoComponent key={selectedCargo.id} cargo={selectedCargo} onUpdated={handleRefresh} setSelectedCargo={setSelectedCargo} />}
        </div>
      </div>
    </div>
  );
};

export const CreateCargoComponent = ({
  onCargoCreated,
  setSelectedCargo,
}: {
  onCargoCreated: () => void;
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: { nombre: "" },
  });

  const onSubmit = (data: ZCargo) => {
    startTransition(async () => {
      try {
        const result = await createCargo(data);
        if (!result.success) {
          toast.error(result.message);
        } else {
          toast.success("Cargo registrado exitosamente.");
          form.reset();
          onCargoCreated();
          setSelectedCargo(null);
        }

        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        toast.error("Error al registrar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Agregar Nuevo Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre del cargo" placeholder="Ejemplo: Gerente" />

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

export const ModifyCargoComponent = ({
  cargo,
  onUpdated,
  setSelectedCargo,
}: {
  cargo: Cargo;
  onUpdated: () => void;
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo | null>>;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ZCargo>({
    resolver: zodResolver(cargoSchema),
    defaultValues: { nombre: cargo.nombre },
  });

  const onUpdate = (data: ZCargo) => {
    startTransition(async () => {
      try {
        const response = await patchCargo(cargo.id, data.nombre);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Cargo actualizado exitosamente.");
          onUpdated();
          setSelectedCargo(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al modificar el cargo.");
      }
    });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        const response = await deleteCargo(cargo.id);
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success("Cargo eliminado exitosamente.");
          onUpdated();
          setSelectedCargo(null);
          form.reset();
        }
      } catch (e) {
        toast.error("Error al modificar el cargo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full font-text">
      <p className="font-primary font-semibold text-text text-lg">Modificar Cargo</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-2">
          <InputField control={form.control} name="nombre" label="Nombre del Cargo" placeholder="Ejemplo: Gerente" />

          <div className="flex justify-end gap-4">
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

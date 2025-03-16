"use client";

import { Cargo } from "@prisma/client";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";

import { Pagination } from "@/components/pagination";
import { getCargos } from "@/actions/others-action";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { SearchField } from "@/components/custom-fields/search-field";
import { CreateCargoComponent } from "@/components/others/create-cargo";
import { ModifyCargoComponent } from "@/components/others/modify-cargo";
import { CreateEntity } from "@/components/others/create-entity";

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
      <p className="font-primary font-bold text-lg md:text-xl">Cargos</p>
      <SearchField description="Buscar cargos por nombre" value={search} onSearch={handleSearch} />

      <div className="flex md:flex-row flex-col gap-2 w-full">
        <div className="flex xl:flex-row flex-col gap-2 w-full">
          <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full xl:w-1/2">
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
                        <th scope="col" className="px-4 lg:px-6 py-3 text-xs lg:text-sm" key={i}>
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentCargos.map((cargo) => (
                      <tr
                        key={cargo.id}
                        className={`hover:bg-crust text-xs cursor-pointer ${selectedCargo?.id === cargo.id ? "bg-maroon text-base hover:text-text" : ""}`}
                        onClick={() => setSelectedCargo(cargo)}
                      >
                        <td className="px-4 lg:px-6 py-3 rounded-s-md">{cargo.id}</td>
                        <td className="px-4 lg:px-6 py-3 rounded-e-md">{cargo.nombre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} totalItems={cargos.length} />
          </div>

          <div className="flex flex-col gap-5 p-4 w-full xl:w-1/2">
            <CreateCargoComponent onCargoCreated={handleRefresh} setSelectedCargo={setSelectedCargo} />
            {selectedCargo && <ModifyCargoComponent key={selectedCargo.id} cargo={selectedCargo} onUpdated={handleRefresh} setSelectedCargo={setSelectedCargo} />}
          </div>
        </div>
      </div>

      <CreateEntity title="registrar varios cargos" icon={<Package />} buttonText="crear cargos" model="cargo" />
    </div>
  );
};

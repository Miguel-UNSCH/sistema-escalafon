"use client";

import { getDependencias } from "@/actions/others-action";
import { SearchField } from "@/components/custom-fields/search-field";
import { CreateDependencia } from "@/components/others/create-dependencia";
import { ModifyDependencia } from "@/components/others/modify-dependencia";
import { Pagination } from "@/components/pagination";
import { Dependencia } from "@prisma/client";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const DependenciaComponent = () => {
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [selectedDependencia, setSelectedDependencia] = useState<Dependencia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const fnDependencias = async (search: string) => {
    setLoading(true);
    try {
      const response = await getDependencias(search);
      if (response.success && response.data) {
        setDependencias(response.data);
      } else {
        toast.error(response.message || "No se pudieron obtener las dependencias.");
      }
    } catch (error) {
      toast.error("Error al obtener las dependencias.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFnDependencias = debounce(fnDependencias, 500);

  const handleSearch = (query: string) => {
    setSearch(query);
    debouncedFnDependencias(query);
  };

  useEffect(() => {
    fnDependencias("");
  }, []);

  const handleRefresh = () => {
    setSearch("");
    fnDependencias("");
    setSelectedDependencia(null);
  };

  const theadContent = ["nombre", "codigo", "direccion"];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(dependencias.length / itemsPerPage);
  const currentDependencias = dependencias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col gap-2 py-4 w-full">
      <p className="font-primary font-bold">Dependencias</p>
      <SearchField description="Buscar cargos por nombre o codigo" value={search} onSearch={handleSearch} />

      <div className="flex flex-row gapp-2 w-full">
        <div className="flex flex-col gap-2 w-2/3">
          {loading ? (
            <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
          ) : dependencias.length === 0 ? (
            <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
          ) : (
            <div className="relative sm:rounded-md overflow-x-auto">
              <table className="w-full text-text text-sm text-left rtl:text-right">
                <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
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
                      <td className="px-3 py-3">{dependencia.nombre}</td>
                      <td className="px-3 py-3">{dependencia.codigo}</td>
                      <td className="px-3 py-3">{dependencia.direccion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} totalItems={dependencias.length} />
        </div>

        <div className="flex flex-col gap-5 p-4 w-1/3">
          <CreateDependencia onDependenciaCreated={handleRefresh} setSelectedDependencia={setSelectedDependencia} />
          {selectedDependencia && (
            <ModifyDependencia key={selectedDependencia.id} dependencia={selectedDependencia} onUpdated={handleRefresh} setSelectedDependencia={setSelectedDependencia} />
          )}
        </div>
      </div>
    </div>
  );
};

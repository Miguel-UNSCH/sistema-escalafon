import { Pagination } from "@/components/pagination";
import { Dependencia } from "@prisma/client";
import React, { useState, useMemo } from "react";

export const Table = ({
  loading,
  dependencias,
  selectedDependencia,
  setSelectedDependencia,
}: {
  loading: boolean;
  dependencias: Dependencia[];
  selectedDependencia: Dependencia | null;
  setSelectedDependencia: React.Dispatch<React.SetStateAction<Dependencia | null>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedDependencias = useMemo(() => dependencias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [dependencias, currentPage]);

  return (
    <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : dependencias.length === 0 ? (
        <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
      ) : (
        <>
          <div className="relative sm:rounded-md overflow-x-auto">
            <table className="w-full text-text text-sm text-left">
              <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Nombre</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Código</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Dirección</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDependencias.map((dependencia) => (
                  <tr
                    key={dependencia.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedDependencia?.id === dependencia.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedDependencia(dependencia)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{dependencia.nombre}</td>
                    <td className="px-4 lg:px-6 py-3">{dependencia.codigo}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">{dependencia.direccion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={Math.ceil(dependencias.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={dependencias.length} />
        </>
      )}
    </div>
  );
};

import { cargoDependenciaRecord } from "@/actions/others-action";
import { Pagination } from "@/components/pagination";
import React, { useState, useMemo } from "react";

export const Table = ({
  loading,
  dependencias,
  selectedDependencia,
  setSelectedDependencia,
}: {
  loading: boolean;
  dependencias: cargoDependenciaRecord[];
  selectedDependencia: cargoDependenciaRecord | null;
  setSelectedDependencia: React.Dispatch<React.SetStateAction<cargoDependenciaRecord | null>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // if (currentPage > Math.ceil(dependencias.length / itemsPerPage)) {
  //   setCurrentPage(1);
  // }

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
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">N</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm text-center">Dependencia</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Cargos</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDependencias.map((dependencia, index) => (
                  <tr
                    key={dependencia.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedDependencia?.id === dependencia.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedDependencia(dependencia)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{index + 1}</td>
                    <td className="px-4 lg:px-6 py-3">
                      <div className="flex flex-col justify-center items-center gap-1 text-nowrap">
                        <p className="font-semibold text-text">{dependencia.nombre}</p>
                        <p className="font-bold text-red uppercase">{dependencia.codigo}</p>
                        <p className="font-special text-subtext1">{dependencia.direccion}</p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">
                      <ul className="list-disc list-inside">
                        {dependencia.cargos.map((cargo) => (
                          <li key={cargo.id}>{cargo.nombre}</li>
                        ))}
                      </ul>
                    </td>
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

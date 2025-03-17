import { Cargo } from "@prisma/client";
import { useState, useMemo } from "react";

import { Pagination } from "@/components/pagination";

export const Table = ({
  loading,
  cargos,
  selectedCargo,
  setSelectedCargo,
}: {
  loading: boolean;
  cargos: Cargo[];
  selectedCargo: Cargo | null;
  setSelectedCargo: React.Dispatch<React.SetStateAction<Cargo | null>>;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedCargos = useMemo(() => cargos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [cargos, currentPage]);

  return (
    <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full xl:w-1/2">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : cargos.length === 0 ? (
        <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
      ) : (
        <>
          <div className="relative sm:rounded-md overflow-x-auto">
            <table className="w-full text-text text-sm text-left">
              <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">N</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Nombre</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCargos.map((cargo, index) => (
                  <tr
                    key={cargo.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedCargo?.id === cargo.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedCargo(cargo)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">{cargo.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={Math.ceil(cargos.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={cargos.length} />
        </>
      )}
    </div>
  );
};

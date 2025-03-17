"use client";

import { useState, useMemo } from "react";
import { Pagination } from "@/components/pagination";
import toast from "react-hot-toast";
import { meritoRecord } from "@/actions/m-d-action";

type TableDataProps = {
  meritos: meritoRecord[];
  loading: boolean;
  selectedMerito: meritoRecord | null;
  setSelectedMerito: React.Dispatch<React.SetStateAction<meritoRecord | null>>;
};

export const Table: React.FC<TableDataProps> = ({ meritos, loading, selectedMerito, setSelectedMerito }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedMeritos = useMemo(() => meritos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [meritos, currentPage]);

  return (
    <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : meritos.length === 0 ? (
        <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
      ) : (
        <>
          <div className="relative sm:rounded-md overflow-x-auto">
            <table className="w-full text-text text-sm text-left">
              <thead className="top-0 z-10 sticky bg-mantle text-xs uppercase">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">N</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Fecha</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Cargo</th>
                  <th className="px-4 lg:px-6 py-3 text-xs lg:text-sm">Dependencia</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMeritos.map((merito, index) => (
                  <tr
                    key={merito.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedMerito?.id === merito.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedMerito(merito)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 lg:px-6 py-3">{new Date(merito.fecha).toLocaleDateString()}</td>
                    <td className="px-4 lg:px-6 py-3">{merito.cargo.nombre}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">{merito.dependencia.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={currentPage} totalPages={Math.ceil(meritos.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={meritos.length} />
        </>
      )}
    </div>
  );
};

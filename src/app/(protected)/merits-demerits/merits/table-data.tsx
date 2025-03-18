"use client";

import { useState, useMemo, useEffect } from "react";
import { Pagination } from "@/components/pagination";
import { meritoRecord } from "@/actions/m-d-action";
import { getFile } from "@/actions/file-action";

type TableDataProps = {
  meritos: meritoRecord[];
  loading: boolean;
  selectedMerito: meritoRecord | null;
  setSelectedMerito: React.Dispatch<React.SetStateAction<meritoRecord | null>>;
};

export const Table: React.FC<TableDataProps> = ({ meritos, loading, selectedMerito, setSelectedMerito }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeaders = ["N", "Fecha", "Cargo", "Dependencia", "Archivo"];

  const [fileUrls, setFileUrls] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    meritos.forEach(async (merito) => {
      if (merito.file?.id && !fileUrls[merito.file.id]) {
        try {
          const url = await getFile(merito.file.id);
          setFileUrls((prev) => ({ ...prev, [merito.file.id]: url }));
        } catch {
          setFileUrls((prev) => ({ ...prev, [merito.file.id]: null }));
        }
      }
    });
  }, [meritos]);

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
                  {tableHeaders.map((header, index) => (
                    <th key={index} className="px-4 lg:px-6 py-3 text-xs lg:text-sm">
                      {header}
                    </th>
                  ))}
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
                    <td className="px-4 lg:px-6 py-3">{merito.dependencia.nombre}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">
                      {fileUrls[merito.file.id] ? (
                        <a
                          href={fileUrls[merito.file.id] || ""}
                          download
                          className="hover:border-text hover:border-b-2 font-code font-semibold text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {merito.file.name}
                        </a>
                      ) : (
                        <span className="text-text">Cargando...</span>
                      )}
                    </td>
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

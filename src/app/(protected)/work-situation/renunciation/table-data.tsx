"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getFile } from "@/actions/file-action";
import { Pagination } from "@/components/pagination";
import { renunciaRecord } from "@/actions/renuncia-action";

type TableProps = {
  renuncias: renunciaRecord[];
  loading: boolean;
  selectedRenuncia: renunciaRecord | null;
  setSelectedRenuncia: React.Dispatch<React.SetStateAction<renunciaRecord | null>>;
};

export const Table: React.FC<TableProps> = ({ renuncias, loading, selectedRenuncia, setSelectedRenuncia }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeaders = ["N", "Motivo", "Fecha", "Cargo", "Dependencia", "Archivo"];

  const [fileUrls, setFileUrls] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    renuncias.forEach(async (merito) => {
      if (merito.file?.id && !fileUrls[merito.file.id]) {
        try {
          const url = await getFile(merito.file.id);
          setFileUrls((prev) => ({ ...prev, [merito.file.id]: url }));
        } catch {
          setFileUrls((prev) => ({ ...prev, [merito.file.id]: null }));
        }
      }
    });
  }, [renuncias]);

  const paginatedMeritos = useMemo(() => renuncias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [renuncias, currentPage]);

  return (
    <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : renuncias.length === 0 ? (
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
                {paginatedMeritos.map((renuncia, index) => (
                  <tr
                    key={renuncia.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedRenuncia?.id === renuncia.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedRenuncia(renuncia)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 lg:px-6 py-3">{renuncia.motivo}</td>
                    <td className="px-4 lg:px-6 py-3">{new Date(renuncia.fecha).toLocaleDateString()}</td>
                    <td className="px-4 lg:px-6 py-3">{renuncia.usuarioCargoDependencia.cargoDependencia.cargo.nombre}</td>
                    <td className="px-4 lg:px-6 py-3">{renuncia.usuarioCargoDependencia.cargoDependencia.dependencia.nombre}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">
                      {fileUrls[renuncia.file.id] ? (
                        <a
                          href={fileUrls[renuncia.file.id] || ""}
                          download
                          className="hover:border-text hover:border-b-2 font-code font-semibold text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {renuncia.file.name}
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

          <Pagination currentPage={currentPage} totalPages={Math.ceil(renuncias.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={renuncias.length} />
        </>
      )}
    </div>
  );
};

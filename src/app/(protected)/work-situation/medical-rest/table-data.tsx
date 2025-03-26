"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DescansoMedicoRecord } from "./content-data";
import { tipoDescansoOp } from "@/utils/options";
import { getFile } from "@/actions/file-action";
import { Pagination } from "@/components/pagination";

type TableProps = {
  medicals: DescansoMedicoRecord[];
  loading: boolean;
  selectedMedical: DescansoMedicoRecord | null;
  setSelectedMedical: React.Dispatch<React.SetStateAction<DescansoMedicoRecord | null>>;
};

export const Table: React.FC<TableProps> = ({ medicals, loading, selectedMedical, setSelectedMedical }) => {
  const tableHeaders = ["N", "Tipo", "Detalle", "Cargo", "Dependencia", "Periodo", "Archivo"];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [fileUrls, setFileUrls] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    medicals.forEach(async (medical) => {
      if (medical.file?.id && !fileUrls[medical.file.id]) {
        try {
          const url = await getFile(medical.file.id);
          setFileUrls((prev) => ({ ...prev, [medical.file.id]: url }));
        } catch {
          setFileUrls((prev) => ({ ...prev, [medical.file.id]: null }));
        }
      }
    });
  }, [medicals]);

  const paginatedMeritos = useMemo(() => medicals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [medicals, currentPage]);

  return (
    <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : medicals.length === 0 ? (
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
                {paginatedMeritos.map((medical, index) => (
                  <tr
                    key={medical.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedMedical?.id === medical.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedMedical(medical)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 lg:px-6 py-3">{tipoDescansoOp.find((item) => item.key === medical.tipo_descanso)?.value}</td>
                    <td className="px-4 lg:px-6 py-3">{medical.detalle}</td>
                    <td className="px-4 lg:px-6 py-3">{medical.usuarioCargoDependencia.cargoDependencia.cargo.nombre}</td>
                    <td className="px-4 lg:px-6 py-3">{medical.usuarioCargoDependencia.cargoDependencia.dependencia.nombre}</td>
                    <td className="px-4 lg:px-6 py-3">{`${new Date(medical.periodo?.from).toLocaleDateString()} - ${new Date(medical.periodo.to).toLocaleDateString()}`}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">
                      {fileUrls[medical.file.id] ? (
                        <a
                          href={fileUrls[medical.file.id] || ""}
                          download
                          className="hover:border-text hover:border-b-2 font-code font-semibold text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {medical.file.name}
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

          <Pagination currentPage={currentPage} totalPages={Math.ceil(medicals.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={medicals.length} />
        </>
      )}
    </div>
  );
};

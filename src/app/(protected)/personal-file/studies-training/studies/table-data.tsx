"use client";

import React, { useEffect, useMemo, useState } from "react";

import { StudyRecord } from "./content-data";
import { nivelEducativoOp } from "@/utils/options";
import { getFile } from "@/actions/file-action";
import { Pagination } from "@/components/pagination";

type TableProps = {
  items: StudyRecord[];
  loading: boolean;
  selectedItem: StudyRecord | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<StudyRecord | null>>;
};

export const Table: React.FC<TableProps> = ({ items, loading, selectedItem, setSelectedItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeaders = ["N", "Nivel", "Institución", "Carrera/Especialidad", "Periodo", "Archivo"];

  const [fileUrls, setFileUrls] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    items.forEach(async (item) => {
      if (item.file?.id && !fileUrls[item.file.id]) {
        try {
          const url = await getFile(item.file.id);
          setFileUrls((prev) => ({ ...prev, [item.file.id]: url }));
        } catch {
          setFileUrls((prev) => ({ ...prev, [item.file.id]: null }));
        }
      }
    });
  }, [items]);

  const paginatedItems = useMemo(() => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [items, currentPage]);

  return (
    <div className="flex flex-col gap-2 border-2 border-mantle rounded-md w-full">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : items.length === 0 ? (
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
                {paginatedItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-crust text-xs cursor-pointer ${selectedItem?.id === item.id ? "bg-maroon text-base hover:text-text" : ""}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <td className="px-4 lg:px-6 py-3 rounded-s-md">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-4 lg:px-6 py-3">{nivelEducativoOp.find((i) => i.key === item.nivel)?.value}</td>
                    <td className="px-4 lg:px-6 py-3">{item.institucion}</td>
                    <td className="px-4 lg:px-6 py-3">{item.carrera || "N/A"}</td>
                    <td className="px-4 lg:px-6 py-3">{`${new Date(item.periodo.from).toLocaleDateString()} - ${new Date(item.periodo.to).toLocaleDateString()}`}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">
                      {fileUrls[item.file.id] ? (
                        <a
                          href={fileUrls[item.file.id] || ""}
                          download
                          className="hover:border-text hover:border-b-2 font-code font-semibold text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.file.name}
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

          <Pagination currentPage={currentPage} totalPages={Math.ceil(items.length / itemsPerPage)} setCurrentPage={setCurrentPage} totalItems={items.length} />
        </>
      )}
    </div>
  );
};

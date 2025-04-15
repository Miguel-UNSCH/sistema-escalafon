// eslint-disable no-unused-vars
"use client";

import { childrenRecord } from "@/actions/children-action";
import { Pagination } from "@/components/pagination";
import { gradoInstruccionOp } from "@/constants/options";
import { Children } from "@prisma/client";
import React, { useMemo, useState } from "react";

type TableProps = {
  items: childrenRecord[];
  loading: boolean;
  selectedItem: childrenRecord | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<childrenRecord | null>>;
};

export const Table: React.FC<TableProps> = ({ items, loading, selectedItem, setSelectedItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeaders = ["N", "Nombres", "Apellidos", "DNI", "Fecha de Nacimiento", "Grado de Instrucción"];

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
                    <td className="px-4 lg:px-6 py-3">{item.nombres}</td>
                    <td className="px-4 lg:px-6 py-3">{item.apellidos}</td>
                    <td className="px-4 lg:px-6 py-3">{item.dni}</td>
                    <td className="px-4 lg:px-6 py-3">{new Date(item.fecha_nacimiento).toLocaleDateString()}</td>
                    <td className="px-4 lg:px-6 py-3 rounded-e-md">{gradoInstruccionOp.find((i) => i.key === item.grado_instruccion)?.value || "DESCONOCIDO"}</td>
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

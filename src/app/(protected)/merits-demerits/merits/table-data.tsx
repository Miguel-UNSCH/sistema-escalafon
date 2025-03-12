"use client";

import toast from "react-hot-toast";
import React from "react";
import { meritoRecord } from "@/actions/m-d-action";

type TableDataProps = {
  meritos: meritoRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ meritos, loading }) => {
  const theadContent = ["Fecha", "Cargo", "Dependencia"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : meritos.length === 0 ? (
        <p className="py-4 text-subtext0 text-center">Aún no existen registros.</p>
      ) : (
        <table className="w-full text-text text-sm text-left rtl:text-right">
          <thead className="top-0 z-10 sticky text-xs uppercase">
            <tr>
              {theadContent.map((thead) => (
                <th scope="col" className="px-3 py-3 border-b-2 border-base text-sm" key={thead}>
                  {thead}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {meritos.map(({ id, fecha, cargo, dependencia }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{new Date(fecha).toLocaleDateString()}</td>
                <td className="px-3 py-4">{cargo.nombre}</td>
                <td className="px-3 py-4">{dependencia.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

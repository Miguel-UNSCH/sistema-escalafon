"use client";

import toast from "react-hot-toast";
import React from "react";
import { ascensoRecord } from "@/actions/ascenso-action";

type TableDataProps = {
  ascensos: ascensoRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ ascensos, loading }) => {
  const theadContent = ["Resolución", "CNP", "Nivel Remunerativo", "Fecha", "Cargo Actual", "Nuevo Cargo", "Dependencia Actual", "Nueva Dependencia"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : ascensos.length === 0 ? (
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
            {ascensos.map(({ id, resolucion_ascenso, cnp, nivel_remunerativo, fecha, current_cargo, new_cargo, current_dependencia, new_dependencia }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{resolucion_ascenso}</td>
                <td className="px-3 py-4">{cnp}</td>
                <td className="px-3 py-4">{nivel_remunerativo}</td>
                <td className="px-3 py-4">{new Date(fecha).toLocaleDateString()}</td>
                <td className="px-3 py-4">{current_cargo.nombre}</td>
                <td className="px-3 py-4">{new_cargo.nombre}</td>
                <td className="px-3 py-4">{current_dependencia.nombre}</td>
                <td className="px-3 py-4">{new_dependencia.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

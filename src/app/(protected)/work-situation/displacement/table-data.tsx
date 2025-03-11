"use client";

import toast from "react-hot-toast";
import React from "react";
import { DesplazamientoRecord } from "./content-data";
import { tipoDesplazamientoOp } from "@/utils/options";

type TableDataProps = {
  desplazamientos: DesplazamientoRecord;
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ desplazamientos, loading }) => {
  const theadContent = ["Tipo", "Fecha", "Cargo Actual", "Nueva Cargo", "Dependencia Actual", "Nueva Dependencia"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : desplazamientos.length === 0 ? (
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
            {desplazamientos.map(({ id, tipo_desplazamiento, fecha, current_cargo, new_cargo, current_dependencia, new_dependencia }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{tipoDesplazamientoOp.find((item) => item.key === tipo_desplazamiento)?.value || "UNKNOWN"}</td>
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

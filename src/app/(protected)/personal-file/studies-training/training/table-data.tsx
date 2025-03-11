"use client";

import toast from "react-hot-toast";
import React from "react";
import { CapacitacionRecord } from "./content-data";

type TableDataProps = {
  capacitaciones: CapacitacionRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ capacitaciones, loading }) => {
  const theadContent = ["Centro de Capacitación", "Materia", "Especialidad", "Horas Lectivas", "Periodo"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : capacitaciones.length === 0 ? (
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
            {capacitaciones.map(({ id, centro_capacitacion, materia, especialidad, horas_lectivas, periodo }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{centro_capacitacion}</td>
                <td className="px-3 py-4">{materia}</td>
                <td className="px-3 py-4">{especialidad || "N/A"}</td>
                <td className="px-3 py-4">{horas_lectivas}</td>
                <td className="px-3 py-4">{`${new Date(periodo.from).toLocaleDateString()} - ${new Date(periodo.to).toLocaleDateString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

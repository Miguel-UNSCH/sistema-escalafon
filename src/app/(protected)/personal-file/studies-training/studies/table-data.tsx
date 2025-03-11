"use client";

import toast from "react-hot-toast";
import React from "react";

import { StudyRecord } from "./content-data";
import { nivelEducativoOp } from "@/utils/options";

type TableDataProps = {
  formAc: StudyRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ formAc, loading }) => {
  const theadContent = ["Nivel", "Institución", "Carrera/Especialidad", "Periodo"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : formAc.length === 0 ? (
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
            {formAc.map(({ id, nivel, institucion, carrera, periodo }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{nivelEducativoOp.find((item) => item.key === nivel)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-4">{institucion}</td>
                <td className="px-3 py-4">{carrera || "N/A"}</td>
                <td className="px-3 py-4">{`${new Date(periodo.from).toLocaleDateString()} - ${new Date(periodo.to).toLocaleDateString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

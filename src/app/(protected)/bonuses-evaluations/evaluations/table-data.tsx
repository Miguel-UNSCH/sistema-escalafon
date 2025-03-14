"use client";

import toast from "react-hot-toast";
import React from "react";
import { evaluationRecord } from "@/actions/evaluation-action";

type TableDataProps = {
  evaluations: evaluationRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ evaluations, loading }) => {
  const theadContent = ["Fecha", "Puntuacion", "Cargo", "Dependencia"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : evaluations.length === 0 ? (
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
            {evaluations.map(({ id, fecha, puntuacion, cargo, dependencia }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-3">{new Date(fecha).toLocaleDateString()}</td>
                <td className="px-3 py-3">{puntuacion}</td>
                <td className="px-3 py-3">{cargo.nombre}</td>
                <td className="px-3 py-3">{dependencia.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

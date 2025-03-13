"use client";

import toast from "react-hot-toast";
import React from "react";
import { discapacidad } from "@prisma/client";
import { entidad_certificadoraOp, tDscapacidadOp } from "@/utils/options";

type TableDataProps = {
  disabilities: discapacidad[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ disabilities, loading }) => {
  const theadContent = ["Tipo", "Discapacidad", "Entidad Certificadora", "Fecha"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : disabilities.length === 0 ? (
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
            {disabilities.map(({ id, tipo, discapacidad, entidad_certificadora, fecha_certificacion }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-2">{tDscapacidadOp.find((item) => item.key === tipo)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-2">{discapacidad}</td>
                <td className="px-3 py-2">{entidad_certificadoraOp.find((item) => item.key === entidad_certificadora)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-2">{new Date(fecha_certificacion || "").toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

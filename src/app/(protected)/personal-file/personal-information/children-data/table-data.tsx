// eslint-disable no-unused-vars
"use client";

import { getChilds } from "@/actions/children-action";
import { gradoInstruccionOp } from "@/utils/options";
import { Children } from "@prisma/client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TableDataProps = {
  children: Children[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ children, loading }) => {
  const theadContent = ["Nombres", "Apellidos", "DNI", "Fecha de Nacimiento", "Grado de Instrucción"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : children.length === 0 ? (
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
            {children.map(({ id, nombres, apellidos, dni, fecha_nacimiento, grado_instruccion }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{nombres}</td>
                <td className="px-3 py-4">{apellidos}</td>
                <td className="px-3 py-4">{dni}</td>
                <td className="px-3 py-4">{new Date(fecha_nacimiento).toLocaleDateString()}</td>
                <td className="px-3 py-4">{gradoInstruccionOp.find((item) => item.key === grado_instruccion)?.value || "DESCONOCIDO"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

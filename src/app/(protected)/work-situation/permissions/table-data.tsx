"use client";

import toast from "react-hot-toast";
import React from "react";
import { PerLicVacRecord } from "./content-data";
import { tipoPermisoLicenciaVacacionOp } from "@/utils/options";

type TableDataProps = {
  perLicVacs: PerLicVacRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ perLicVacs, loading }) => {
  const theadContent = ["Tipo", "Cargo", "Dependencia", "Periodo"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : perLicVacs.length === 0 ? (
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
            {perLicVacs.map(({ id, tipo, periodo, cargo, dependencia }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{tipoPermisoLicenciaVacacionOp.find((item) => item.key === tipo)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-4">{cargo.nombre}</td>
                <td className="px-3 py-4">{dependencia.nombre}</td>
                <td className="px-3 py-4">{`${new Date(periodo.from).toLocaleDateString()} - ${new Date(periodo.to).toLocaleDateString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

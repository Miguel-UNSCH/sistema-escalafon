"use client";

import React from "react";
import toast from "react-hot-toast";

import { ContractRecord } from "./content-data";
import { CLaboralOp, TContratoOp } from "@/utils/options";

type TableDataProps = {
  contracts: ContractRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ contracts, loading }) => {
  const theadContent = ["Tipo de Contrato", "Condición Laboral", "Cargo", "Dependencia", "Nivel Remunerativo"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : contracts.length === 0 ? (
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
            {contracts.map(({ id, tipo_contrato, condicion_laboral, cargo, dependencia, nivel_remuneracion }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-4">{TContratoOp.find((item) => item.key === tipo_contrato)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-4">{CLaboralOp.find((item) => item.key === condicion_laboral)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-4">{cargo.nombre}</td>
                <td className="px-3 py-4">{dependencia.nombre}</td>
                <td className="px-3 py-4">{nivel_remuneracion || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

"use client";

import React from "react";
import toast from "react-hot-toast";

import { documentRecord } from "@/actions/document-action";
import { tipo_docOp } from "@/utils/options";

type TableDataProps = {
  documentos: documentRecord[];
  loading: boolean;
};

export const TableData: React.FC<TableDataProps> = ({ documentos, loading }) => {
  const theadContent = ["Número", "Tipo", "Asunto", "Emisor", "Receptor"];

  return (
    <div className="relative bg-mantle sm:rounded-md overflow-x-auto">
      {loading ? (
        <p className="py-4 text-subtext0 text-center">Cargando datos...</p>
      ) : documentos.length === 0 ? (
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
            {documentos.map(({ id, numero_documento, tipo_documento, asunto, emisor, receptor }) => (
              <tr key={id} className="hover:bg-crust text-subtext0 text-sm cursor-pointer" onClick={() => toast.success(`ID: ${id}`)}>
                <td className="px-3 py-2">{numero_documento}</td>
                <td className="px-3 py-2">{tipo_docOp.find((item) => item.key === tipo_documento)?.value || "UNKNOWN"}</td>
                <td className="px-3 py-2">{asunto}</td>
                <td className="px-3 py-2">{emisor.name}</td>
                <td className="px-3 py-2">{receptor.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

"use client";

import { Dot } from "lucide-react";
import React, { ReactNode } from "react";

export const NotesList = ({ notes }: { notes: string[] }) => (
  <ul className="space-y-2 text-subtext1 text-sm">
    {notes.map((note, index) => (
      <li key={index} className="flex flex-row items-center">
        <Dot /> {note}
      </li>
    ))}
  </ul>
);

export const Table = ({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) => (
  <table className="w-auto text-sm">
    <thead className="bg-surface0">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="p-2 border text-left">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex} className="p-2 py-1 border">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const DataDoc = ({
  description,
  tableHeaders,
  tableRows,
  jsonData,
}: {
  description: string;
  tableHeaders: string[];
  tableRows: (string | ReactNode)[][];
  jsonData: object[];
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 px-4">
        <h4 className="flex flex-row items-center gap-0.5 font-primary font-semibold text-[1rem] text-sm">Plantilla para Excel</h4>
        <p className="font-special font-semibold text-subtext0 text-xs italic">{description}</p>

        <Table headers={tableHeaders} rows={tableRows} />
        <p className="font-code hover:font-bold text-lavender text-xs italic cursor-pointer">Descargar plantilla Excel</p>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <h4 className="flex flex-row items-center gap-0.5 font-primary font-semibold text-[1rem] text-sm">Ejemplo de JSON</h4>
        <p className="font-special font-semibold text-subtext0 text-xs italic">Si se usa JSON, debe seguir la siguiente estructura:</p>
        <pre className="bg-crust p-4 rounded-md font-code text-xs">{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

"use client";
// ./components/pdf/fp-report-html.tsx
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FpDataInput } from "@/types/reports";
import { buildSections } from "@/app/(protected)/reports/ficha-personal/sections-template";

export const renderReportHTML = (data: FpDataInput): string => {
  const sections = buildSections(data);

  const html = renderToStaticMarkup(
    <html>
      <head>
        <style>{`
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { text-align: center; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #ccc; padding: 4px; font-size: 10pt; }
        `}</style>
      </head>
      <body>
        <h1>Ficha Personal</h1>
        {sections.map((section) => (
          <div key={section.section}>
            <h2>{section.title}</h2>
            {section.rows && (
              <table>
                <tbody>
                  {section.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell) => (
                        <td key={cell.key} colSpan={cell.colSpan}>
                          <strong>{cell.label && `${cell.label}: `}</strong>
                          {cell.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {section.table && (
              <table>
                <thead>
                  <tr>
                    {section.table.map((cell) => (
                      <th key={cell.key} colSpan={cell.colSpan}>
                        {cell.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(...section.table.map((c) => (Array.isArray(c.value) ? c.value.length : 0))) }).map((_, i) => (
                    <tr key={i}>
                      {section.table.map((cell) => (
                        <td key={cell.key + i} colSpan={cell.colSpan}>
                          {Array.isArray(cell.value) ? cell.value[i] ?? "" : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </body>
    </html>
  );

  return "<!DOCTYPE html>" + html;
};

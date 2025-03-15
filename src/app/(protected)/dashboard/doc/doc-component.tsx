import { Dot, File, Folder, Grid2x2Check, Lightbulb } from "lucide-react";
import React, { ReactNode } from "react";

const NotesList = ({ notes }: { notes: string[] }) => (
  <ul className="space-y-2 text-subtext1 text-sm">
    {notes.map((note, index) => (
      <li key={index} className="flex flex-row items-center">
        <Dot /> {note}
      </li>
    ))}
  </ul>
);

const Table = ({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) => (
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

export const DocComponent = () => {
  const excelUserHeaders = ["Nombre de la columna", "Tipo de dato", "Descripción"];
  const excelUserRows = [
    ["Nombres", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Nombre completo del personal."],
    ["Apellidos", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Apellidos completos."],
    ["Dni", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Documento de identidad (8 dígitos)."],
    ["Email", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Correo electrónico válido."],
  ];
  const users = [
    {
      nombres: "Juan",
      apellidos: "Pérez",
      dni: "12345678",
      email: "juan.perez@example.com",
    },
    {
      nombres: "María",
      apellidos: "González",
      dni: "87654321",
      email: "maria.gonzalez@example.com",
    },
  ];

  return (
    <div className="p-6 w-full">
      <h2 className="flex items-center gap-2 mb-4 font-black text-lavender text-2xl">Documentación de Subida Masiva</h2>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Folder size={16} /> <p>Especificaciones de Archivos</p>
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <Table
            headers={["Formato", "Extensión", "Tamaño Máximo", "Descripción"]}
            rows={[
              ["Excel", <span className="bg-crust px-1 rounded-sm font-code text-xs">.xlsx</span>, "10MB", "Estructura tabular con múltiples filas y columnas."],
              ["JSON", <span className="bg-crust px-1 rounded-sm font-code text-xs">.json</span>, "5MB", "Representación en formato clave-valor."],
            ]}
          />

          <div>
            <p className="font-primary font-semibold text-subtext0 text-sm">Notas Importantes:</p>
            <NotesList
              notes={[
                "El archivo debe respetar la estructura definida en las plantillas.",
                "No se aceptan archivos de Excel en formato antiguo (.xls).",
                "JSON debe estar bien formado (sin errores de sintaxis).",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <File size={16} /> <p>Estructura de los Archivos</p>
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <div className="flex flex-col gap-2">
            <h4 className="flex flex-row items-center gap-0.5 font-primary font-semibold text-[1rem] text-sm">Plantilla para Excel</h4>
            <p className="font-special font-semibold text-subtext0 text-xs italic">El archivo Excel debe contener las siguientes columnas:</p>

            <Table headers={excelUserHeaders} rows={excelUserRows} />
            <p className="font-code hover:font-semibold text-lavender text-sm italic cursor-pointer">Descargar plantilla Excel</p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="flex flex-row items-center gap-0.5 font-primary font-semibold text-[1rem] text-sm">Ejemplo de JSON</h4>
            <p className="font-special font-semibold text-subtext0 text-xs italic">Si se usa JSON, debe seguir la siguiente estructura:</p>
            <pre className="bg-crust p-4 rounded-md text-text">{JSON.stringify(users, null, 2)}</pre>
            <p className="font-primary font-semibold text-subtext0 text-sm">Notas Importantes:</p>
            <NotesList
              notes={["Formato válido: .xlsx o .json.", "Tamaño dentro del límite permitido.", "JSON mal formado generará errores.", "Excel debe contener la estructura correcta."]}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Grid2x2Check size={16} /> Validaciones y Errores
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <NotesList
            notes={["Formato válido: .xlsx o .json.", "Tamaño dentro del límite permitido.", "JSON mal formado generará errores.", "Excel debe contener la estructura correcta."]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Lightbulb size={16} /> Recomendaciones
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <NotesList
            notes={[
              "Usa la plantilla proporcionada para evitar errores.",
              "Revisa que los datos sean correctos antes de subir.",
              "Evita caracteres especiales en los nombres (@, #, etc.).",
            ]}
          />
        </div>
      </section>
    </div>
  );
};

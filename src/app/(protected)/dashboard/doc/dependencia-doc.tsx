"use client";

import { DataDoc } from "./other";

export const DependenciaDoc = () => {
  return (
    <DataDoc
      description="El archivo Excel debe contener las siguientes columnas:"
      tableHeaders={["Nombre de la columna", "Tipo de dato", "Descripción"]}
      tableRows={[
        [
          "nombre",
          <span key="nombre" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Nombre completo de la dependencia y/o oficina.",
        ],
        [
          "codigo",
          <span key="codigo" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Código único de la dependencia.",
        ],
        [
          "dirección",
          <span key="direccion" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Dirección de la dependencia y/o oficina.",
        ],
      ]}
      jsonData={[
        { nombre: "GOBERNACION REGIONAL", codigo: "GR", direccion: "Jr. 9 de Diciembre N° 184" },
        { nombre: "CONSEJO REGIONAL", codigo: "CR", direccion: "Jr. 9 de Diciembre N° 184" },
        { nombre: "VICEGOBERNACION REGIONAL", codigo: "VGR", direccion: "Jr. 9 de Diciembre N° 184" },
      ]}
      filePath="dependencias"
    />
  );
};

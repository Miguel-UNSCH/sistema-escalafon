"use client";

import { DataDoc } from "./other";

export const UserDoc = () => {
  return (
    <DataDoc
      description="El archivo Excel debe contener las siguientes columnas:"
      tableHeaders={["Nombre de la columna", "Tipo de dato", "Descripción"]}
      tableRows={[
        [
          "name",
          <span key="name" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Nombre completo del personal.",
        ],
        [
          "last_name",
          <span key="last_name" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Apellidos completos.",
        ],
        [
          "dni",
          <span key="dni" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Documento de identidad (8 dígitos).",
        ],
        [
          "email",
          <span key="email" className="bg-crust px-1 rounded-sm font-code text-xs">
            `string`
          </span>,
          "Correo electrónico válido.",
        ],
      ]}
      jsonData={[
        { name: "Juan", last_name: "Pérez", dni: "12345678", email: "juan.perez@example.com" },
        { name: "María", last_name: "González", dni: "87654321", email: "maria.gonzalez@example.com" },
      ]}
      filePath="users"
    />
  );
};

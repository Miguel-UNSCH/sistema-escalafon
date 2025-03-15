"use client";

import { DataDoc } from "./other";

export const UserDoc = () => {
  return (
    <DataDoc
      description="El archivo Excel debe contener las siguientes columnas:"
      tableHeaders={["Nombre de la columna", "Tipo de dato", "Descripción"]}
      tableRows={[
        ["Nombres", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Nombre completo del personal."],
        ["Apellidos", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Apellidos completos."],
        ["Dni", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Documento de identidad (8 dígitos)."],
        ["Email", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Correo electrónico válido."],
      ]}
      jsonData={[
        { nombres: "Juan", apellidos: "Pérez", dni: "12345678", email: "juan.perez@example.com" },
        { nombres: "María", apellidos: "González", dni: "87654321", email: "maria.gonzalez@example.com" },
      ]}
    />
  );
};

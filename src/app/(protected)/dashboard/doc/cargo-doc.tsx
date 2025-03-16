"use client";

import { DataDoc } from "./other";

export const CargoDoc = () => {
  return (
    <DataDoc
      description="El archivo Excel debe contener las siguientes columnas:"
      tableHeaders={["Nombre de la columna", "Tipo de dato", "Descripción"]}
      tableRows={[["nombre", <span className="bg-crust px-1 rounded-sm font-code text-xs">`string`</span>, "Nombre completo del cargo."]]}
      jsonData={[{ nombre: "ESPECIALISTA EN ALIMENTOS Y ESTÁNDARES DE CALIDAD" }, { nombre: "ESPECIALISTA EN ARCHIVO I" }, { nombre: "ESPECIALISTA EN ARCHIVO II" }]}
      filePath="cargos"
    />
  );
};

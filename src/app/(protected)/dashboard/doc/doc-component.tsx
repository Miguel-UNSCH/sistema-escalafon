import { Dot, File, Folder, Grid2x2Check, Lightbulb } from "lucide-react";
import React from "react";

export const DocComponent = () => {
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
      <h2 className="flex items-center gap-2 mb-4 font-semibold text-2xl">Documentación de Subida Masiva</h2>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Folder size={16} /> <p>Especificaciones de Archivos</p>
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <table className="w-auto text-sm">
            <thead className="bg-surface0">
              <tr>
                <th className="p-2 border text-left">Formato</th>
                <th className="p-2 border text-left">Extensión</th>
                <th className="p-2 border text-left">Tamaño Máximo</th>
                <th className="p-2 border text-left">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 py-1 border">Excel</td>
                <td className="p-2 py-1 border">.xlsx</td>
                <td className="p-2 py-1 border">10MB</td>
                <td className="p-2 py-1 border">Estructura tabular con múltiples filas y columnas.</td>
              </tr>
              <tr>
                <td className="p-2 py-1 border">JSON</td>
                <td className="p-2 py-1 border">.json</td>
                <td className="p-2 py-1 border">5MB</td>
                <td className="p-2 py-1 border">Representación en formato clave-valor.</td>
              </tr>
            </tbody>
          </table>

          <div>
            <p className="font-primary font-semibold text-subtext0 text-sm">Notas Importantes:</p>
            <ul className="space-y-2 text-subtext1 text-sm">
              <li className="flex flex-row items-center">
                <Dot /> El archivo debe respetar la estructura definida en las plantillas.
              </li>
              <li className="flex flex-row items-center">
                <Dot /> No se aceptan archivos de Excel en formato antiguo (.xls).
              </li>
              <li className="flex flex-row items-center">
                <Dot /> JSON debe estar bien formado (sin errores de sintaxis).
              </li>
            </ul>
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

            <table className="w-auto text-sm">
              <thead className="bg-surface0">
                <tr>
                  <th className="p-2 border text-left">Nombre de la columna</th>
                  <th className="p-2 border text-left">Tipo de dato</th>
                  <th className="p-2 border text-left">Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 py-1 border">nombres</td>
                  <td className="p-2 py-1 border">string</td>
                  <td className="p-2 py-1 border">Nombre completo del personal.</td>
                </tr>
                <tr>
                  <td className="p-2 py-1 border">apellidos</td>
                  <td className="p-2 py-1 border">string</td>
                  <td className="p-2 py-1 border">Apellidos completos.</td>
                </tr>
                <tr>
                  <td className="p-2 py-1 border">dni</td>
                  <td className="p-2 py-1 border">string</td>
                  <td className="p-2 py-1 border">Documento de identidad (8 dígitos).</td>
                </tr>
                <tr>
                  <td className="p-2 py-1 border">email</td>
                  <td className="p-2 py-1 border">string</td>
                  <td className="p-2 py-1 border">Correo electrónico válido.</td>
                </tr>
              </tbody>
            </table>
            <p className="font-code hover:font-semibold text-lavender text-sm cursor-pointer">Descargar plantilla Excel</p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="flex flex-row items-center gap-0.5 font-primary font-semibold text-[1rem] text-sm">Ejemplo de JSON</h4>
            <p className="font-special font-semibold text-subtext0 text-xs italic">Si se usa JSON, debe seguir la siguiente estructura:</p>
            <pre className="bg-crust p-4 rounded-md text-text">{JSON.stringify(users, null, 2)}</pre>
            <p className="font-primary font-semibold text-subtext0 text-sm">Notas Importantes:</p>
            <ul className="space-y-2 font-text text-subtext1 text-sm">
              <li className="flex flex-row items-center">
                <Dot /> JSON debe ser un array de objetos.
              </li>
              <li className="flex flex-row items-center">
                <Dot /> Cada campo debe tener el formato correcto, sin valores nulos.
              </li>
              <li className="flex flex-row items-center">
                <Dot /> JSON debe estar bien formado (sin errores de sintaxis).
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Grid2x2Check size={16} /> Validaciones y Errores
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <ul className="space-y-2 font-text text-text-subtext1 text-sm">
            <li className="flex flex-row items-center">
              <Dot /> Formato válido: `.xlsx` o `.json`.
            </li>
            <li className="flex flex-row items-center">
              <Dot /> Tamaño dentro del límite permitido.
            </li>
            <li className="flex flex-row items-center">
              <Dot /> JSON mal formado generará errores.
            </li>
            <li className="flex flex-row items-center">
              <Dot /> Excel debe contener la estructura correcta.
            </li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <h3 className="flex flex-row items-center gap-0.5 font-primary font-medium text-lg">
          <Lightbulb size={16} /> Recomendaciones
        </h3>

        <div className="flex flex-col gap-2 px-4">
          <ul className="space-y-2 font-text text-subtext1 text-sm">
            <li className="flex flex-row items-center">
              <Dot /> Usa la plantilla proporcionada para evitar errores.
            </li>
            <li className="flex flex-row items-center">
              <Dot /> Revisa que los datos sean correctos antes de subir.
            </li>
            <li className="flex flex-row items-center">
              <Dot /> Evita caracteres especiales en los nombres (`@`, `#`, etc.).
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

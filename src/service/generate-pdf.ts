import fs from "fs";
import FormData from "form-data";

/**
 * Sube el ZIP generado a latexonline.cc y obtiene el PDF compilado
 * @param zipPath Ruta absoluta del archivo ZIP
 * @returns Un Buffer con el PDF generado
 */
export async function generatePdfFromZip(zipPath: string): Promise<Buffer> {
  const fd = new FormData();
  fd.append("file", fs.createReadStream(zipPath), {
    filename: "main.zip",
    contentType: "application/zip",
  });

  const response = await fetch("https://latexonline.cc/compile", {
    method: "POST",
    body: fd as any,
    headers: fd.getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Error al generar PDF: ${response.statusText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

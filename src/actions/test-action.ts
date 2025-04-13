"use server";

import { generateLatexZip } from "@/helpers/generate-latex-zip";
import { generatePdfFromZip } from "@/service/generate-pdf";
import fs from "fs/promises";
import path from "path";

/**
 * Server action para generar un PDF desde el archivo test.tex
 * @returns Mensaje de éxito o error
 */
export async function testLatexAction(): Promise<{ success: boolean; message: string }> {
  try {
    const id = "documento"; // Aquí podrías pasar otro ID dinámico
    const zipPath = await generateLatexZip(id);
    const pdfBuffer = await generatePdfFromZip(zipPath);

    const outputPdfPath = path.resolve(`public/latex/output/${id}.pdf`);
    await fs.mkdir(path.dirname(outputPdfPath), { recursive: true });
    await fs.writeFile(outputPdfPath, pdfBuffer);

    return { success: true, message: "PDF generado correctamente." };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error en testLatexAction:", error);
    return { success: false, message: "No se pudo generar el PDF." };
  }
}

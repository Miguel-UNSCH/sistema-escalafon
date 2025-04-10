"use server";

import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";

/**
 * Genera un archivo .zip con un main.tex dentro a partir de la plantilla report-time.tex
 * @param user_id ID del usuario, se usa como nombre del archivo ZIP
 * @returns Ruta absoluta del ZIP generado
 */
export async function generateLatexZip(user_id: string): Promise<string> {
  const templatePath = path.resolve("src/templates/report-time.tex");
  const outputDir = path.resolve("src/files/data/reports/time");
  const outputZipPath = path.join(outputDir, `${user_id}.zip`);

  await fs.mkdir(outputDir, { recursive: true });

  const templateContent = await fs.readFile(templatePath, "utf-8");

  const zip = new JSZip();
  zip.file("main.tex", templateContent);

  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

  await fs.writeFile(outputZipPath, zipBuffer);

  return outputZipPath;
}

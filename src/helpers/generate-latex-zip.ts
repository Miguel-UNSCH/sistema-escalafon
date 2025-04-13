import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";

/**
 * Genera un ZIP que contiene el archivo main.tex a partir de templates/test.tex
 * @param id Nombre del archivo ZIP generado
 * @returns Ruta absoluta del ZIP generado
 */
export async function generateLatexZip(id: string): Promise<string> {
  const templatePath = path.resolve("src/templates/test.tex");
  const outputDir = path.resolve("public/latex/zips");
  const outputZipPath = path.join(outputDir, `${id}.zip`);

  await fs.mkdir(outputDir, { recursive: true });

  const texContent = await fs.readFile(templatePath, "utf-8");
  const zip = new JSZip();
  zip.file("main.tex", texContent);

  const zipContent = await zip.generateAsync({ type: "nodebuffer" });
  await fs.writeFile(outputZipPath, zipContent);
  console.log("ZIP generado en:", outputZipPath);

  return outputZipPath;
}

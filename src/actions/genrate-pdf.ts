"use server";

import fs from "fs/promises";
import path from "path";
import PDFDocument from "pdfkit-table";

export const generatePDF = async (filename: string): Promise<string> => {
  const outputDir = path.resolve("public", "pdf");
  const outputPath = path.join(outputDir, `${filename}.pdf`);
  const brandLogoPath = path.resolve("public", "logo", "brand-gra.png");

  await fs.mkdir(outputDir, { recursive: true });

  const doc = new PDFDocument({ size: "A4", margin: 36 });
  const buffer: Buffer[] = [];

  doc.on("data", (chunk) => buffer.push(chunk));
  doc.on("end", async () => {
    const finalBuffer = Buffer.concat(buffer);
    await fs.writeFile(outputPath, finalBuffer);
  });

  // 🖼️ Inserta imagen en la cabecera
  // Calculamos el ancho del PDF (sin márgenes)
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  // Insertar la imagen con ancho 100% disponible y mantener proporción
  doc.image(brandLogoPath, doc.page.margins.left, 30, {
    width: pageWidth,
    align: "center",
  });

  // 📝 Espaciado después de la imagen
  doc.moveDown(3);
  doc.fontSize(16).text("COMPUTO DE TIEMPO", { align: "center" });

  doc.font("Helvetica-Bold");
  doc.fontSize(9);
  const startXi = doc.page.margins.left;
  const col1Width = 295;
  const colGapi = 10;
  const col2X = startXi + col1Width + colGapi;
  let y = 120;

  // Helper para una fila
  const drawRow = (labelLeft: string, valueLeft: string, labelRight: string = "", valueRight: string = "") => {
    doc.font("Helvetica-Bold").text(`${labelLeft}:`, startXi, y, { width: col1Width, continued: true }).font("Helvetica").text(valueLeft, { width: 200 });

    if (labelRight) {
      doc.font("Helvetica-Bold").text(`${labelRight}:`, col2X, y, { width: col1Width, continued: true }).font("Helvetica").text(valueRight, { width: 200 });
    }

    y += 20;
  };

  drawRow("APELLIDOS Y NOMBRES", " JERI ROMERO JOEL", "REG. LAB.", "");
  drawRow("CONDICION LABORAL", " CONTRATADO EN PROYECTO DE INVERSION", "REG. PENS.");
  drawRow("OFICINA", " Oficina de tecnología informática y comunicaciones del gobierno regional", "LUG. NAC.");
  drawRow("CARGO", " VIGILANTE", "EST.CIVIL", "SOLTERO");
  drawRow("PROFESION", "", "DOMIC", " AV. NUEVA ESPERANZA Nº 130");
  drawRow("NIVEL REMUNERATIVO", "");
  drawRow("FECHA NACIMIENTO", " 8/08/1989", "MOTIVO", "RENOVACION DE CONTRATA");
  drawRow("N° DNI", " 45848142", "FECHA", "21 DE FEBRERO DEL 2024");

  doc.end();

  return `/pdf/${filename}.pdf`;
};

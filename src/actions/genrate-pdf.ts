"use server";

import fs from "fs/promises";
import path from "path";
import PDFDocumentWithTables from "pdfkit-table";
import PDFDocument from "pdfkit-table";

type Rect = { x: number; y: number; width: number; height: number };
type PrepareRowFn = (row?: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => PDFDocumentWithTables;

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

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  doc.image(brandLogoPath, doc.page.margins.left, 30, {
    width: pageWidth,
    align: "center",
  });

  doc.moveDown(3);
  doc.fontSize(16).text("COMPUTO DE TIEMPO", { align: "center" });

  doc.moveDown(2);

  const options = {
    hideHeader: true,
    columnSpacing: 4,
    padding: [2],
    prepareRow: ((row, iCol = -1, _iRow, rectRow, _rectCell): PDFDocumentWithTables => {
      if (rectRow) {
        doc.strokeColor("#ffffff").lineWidth(5).rect(rectRow.x, rectRow.y, rectRow.width, rectRow.height).stroke();
      }

      if ([0, 1, 3, 4].includes(iCol)) {
        doc.font("Helvetica-Bold");
      } else {
        doc.font("Helvetica");
      }

      return doc;
    }) satisfies PrepareRowFn,
  };

  await doc.table(
    {
      headers: [
        { property: "col1", width: 125 },
        { property: "col2", width: 10 },
        { property: "col3", width: 170 },
        { property: "col4", width: 50 },
        { property: "col5", width: 10 },
        { property: "col6", width: 170 },
      ],
      datas: [
        {
          col1: "APELLIDOS Y NOMBRES",
          col2: ":",
          col3: "JERI ROMERO JOEL",
          col4: "REG. LAB.",
          col5: ":",
          col6: "",
        },
        {
          col1: "CONDICIÓN LABORAL",
          col2: ":",
          col3: "CONTRATADO EN PROYECTO DE INVERSIÓN",
          col4: "REG. PENS.",
          col5: ":",
          col6: "",
        },
        {
          col1: "OFICINA",
          col2: ":",
          col3: "OFICINA DE TECNOLOGÍA INFORMÁTICA Y COMUNICACIONES DEL GOBIERNO REGIONAL",
          col4: "LUG. NAC.",
          col5: ":",
          col6: "",
        },
        {
          col1: "CARGO",
          col2: ":",
          col3: "VIGILANTE",
          col4: "EST. CIVIL",
          col5: ":",
          col6: "SOLTERO",
        },
        {
          col1: "PROFESIÓN",
          col2: ":",
          col3: "",
          col4: "DOMICILIO",
          col5: ":",
          col6: "AV. NUEVA ESPERANZA Nº 130",
        },
        {
          col1: "NIVEL REMUNERATIVO",
          col2: ":",
          col3: "",
          col4: "",
          col5: "",
          col6: "",
        },
        {
          col1: "FECHA NACIMIENTO",
          col2: ":",
          col3: "8/08/1989",
          col4: "MOTIVO",
          col5: ":",
          col6: "RENOVACIÓN DE CONTRATA",
        },
        {
          col1: "N° DNI",
          col2: ":",
          col3: "45848142",
          col4: "FECHA",
          col5: ":",
          col6: "21 DE FEBRERO DEL 2024",
        },
      ],
    },
    options
  );

  doc.end();

  return `/pdf/${filename}.pdf`;
};

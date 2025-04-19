"use server";

import { ContractReportItem } from "@/types/reports";
import fs from "fs/promises";
import path from "path";
import PDFDocumentWithTables from "pdfkit-table";
import PDFDocument from "pdfkit-table";

type FnData = {
  fnB?: {
    data: any;
    motivo: string;
  };
  fnC?: ContractReportItem[];
};

type Rect = { x: number; y: number; width: number; height: number };
type PrepareRowFn = (row?: any, indexColumn?: number, indexRow?: number, rectRow?: Rect, rectCell?: Rect) => PDFDocumentWithTables;

export const time_report = async (filename: string, data: FnData): Promise<string> => {
  const { fnB, fnC } = data;

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
  doc.fontSize(12).text("COMPUTO DE TIEMPO", { align: "center" });
  doc.moveDown(1);

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

  const info = fnB?.data ?? {};
  const motivo = fnB?.motivo ?? "";

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
          col3: info.name_lastname ?? "",
          col4: "REG. LAB.",
          col5: ":",
          col6: info.reg_lab ?? "",
        },
        {
          col1: "CONDICIÓN LABORAL",
          col2: ":",
          col3: info.cond_lab ?? "",
          col4: "CARGO",
          col5: ":",
          col6: info.cargo ?? "",
        },
        {
          col1: "OFICINA",
          col2: ":",
          col3: info.oficina ?? "",
          col4: "LUG. NAC.",
          col5: ":",
          col6: info.lug_nac ?? "",
        },
        {
          col1: "TIPO DE CONTRATO",
          col2: ":",
          col3: info.t_contract ?? "",
          col4: "EST. CIVIL",
          col5: ":",
          col6: info.est_civil ?? "",
        },
        {
          col1: "PROFESIÓN",
          col2: ":",
          col3: info.profesion ?? "",
          col4: "DOMICILIO",
          col5: ":",
          col6: info.domicilio ?? "",
        },
        {
          col1: "NIVEL REMUNERATIVO",
          col2: ":",
          col3: info.n_rem ?? "",
          col4: "",
          col5: "",
          col6: "",
        },
        {
          col1: "FECHA NACIMIENTO",
          col2: ":",
          col3: info.fecha_nac.toUpperCase() ?? "",
          col4: "MOTIVO",
          col5: ":",
          col6: motivo.toUpperCase(),
        },
        {
          col1: "N° DNI",
          col2: ":",
          col3: info.dni ?? "",
          col4: "FECHA",
          col5: ":",
          col6: info.fecha.toUpperCase() ?? "",
        },
      ],
    },
    options
  );

  const contracts = fnC ?? [];

  // Calcular totales
  const total = contracts.reduce(
    (acc, curr) => {
      acc.years += parseInt(curr.anios);
      acc.months += parseInt(curr.meses);
      acc.days += parseInt(curr.dias);
      return acc;
    },
    { years: 0, months: 0, days: 0 }
  );

  // Normalizar días y meses (ejemplo simple, ajusta según reglas reales)
  if (total.days >= 30) {
    total.months += Math.floor(total.days / 30);
    total.days %= 30;
  }
  if (total.months >= 12) {
    total.years += Math.floor(total.months / 12);
    total.months %= 12;
  }

  // Generar filas reales
  const tableData = contracts.map((item) => ({
    doc: item.documento,
    start: item.inicio,
    end: item.termino,
    years: item.anios,
    months: item.meses,
    days: item.dias,
    cargo: item.cargo,
  }));

  // Agregar filas vacías hasta tener 15
  const totalRows = 15;
  const blanksNeeded = Math.max(0, totalRows - tableData.length);

  for (let i = 0; i < blanksNeeded; i++) {
    tableData.push({
      doc: "",
      start: "",
      end: "",
      years: "0",
      months: "0",
      days: "0",
      cargo: "",
    });
  }

  // Agregar fila total
  tableData.push({
    doc: "TOTAL DE TIEMPO DE SERVICIO",
    start: "",
    end: "",
    years: String(total.years),
    months: String(total.months),
    days: String(total.days),
    cargo: "",
  });

  await doc.moveDown(1).table(
    {
      headers: [
        { label: "DOCUMENTO SUSTENTATORIO DE LA CONDICIÓN LABORAL", property: "doc", width: 160 },
        { label: "FECHA DE INICIO", property: "start", width: 65 },
        { label: "FECHA DE TÉRMINO", property: "end", width: 65 },
        { label: "AÑOS", property: "years", width: 50 },
        { label: "MESES", property: "months", width: 50 },
        { label: "DÍAS", property: "days", width: 50 },
        { label: "CARGO", property: "cargo", width: 80 },
      ],
      datas: tableData,
    },
    {
      columnSpacing: 4,
      padding: [6, 4],
      prepareRow: (row, iCol, iRow, rectRow, _rectCell) => {
        const isHeader = iRow === -1;
        const isTotalRow = row.doc === "TOTAL DE TIEMPO DE SERVICIO";

        if (rectRow) doc.strokeColor("#ffffff").lineWidth(5).rect(rectRow.x, rectRow.y, rectRow.width, rectRow.height).stroke();

        if (isHeader || isTotalRow) doc.font("Helvetica-Bold").fillColor("#000000");
        else doc.font("Helvetica").fillColor("#000000");

        return doc;
      },
    }
  );

  // Firma y títulos al final
  doc.moveDown(4);
  const pageWidth_i = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  doc.font("Helvetica-Bold").fontSize(10).text("GOBIERNO REGIONAL DE AYACUCHO", { align: "center", width: pageWidth_i });

  doc.font("Helvetica-Bold").fontSize(10).text("DIRECCIÓN REGIONAL DE RECURSOS HUMANOS", { align: "center", width: pageWidth_i });

  doc.moveDown(2);

  // Línea de firma
  const signatureWidth = 200;
  const x = doc.page.margins.left + (pageWidth_i - signatureWidth) / 2;
  doc
    .moveTo(x, doc.y)
    .lineTo(x + signatureWidth, doc.y)
    .stroke();

  doc.moveDown(0.3);
  doc.font("Helvetica-Bold").fontSize(10).text("FREDY ALMICAR NAVARRO RAMOS", { align: "center", width: pageWidth_i });

  doc.font("Helvetica").fontSize(10).text("Resp. de Escalafón", { align: "center", width: pageWidth_i });

  doc.end();

  return `/pdf/${filename}.pdf`;
};

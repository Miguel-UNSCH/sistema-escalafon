"use server";

import { prisma } from "@/config/prisma.config";
import { fn_date } from "@/helpers";
import { calculate_age, formatDate, getDuration, getDurationFormatted, getPeriodoString } from "@/helpers/date-helper";
import { cond_lab_op, estadoCivilOp, gradoInstruccionOp, grupoSanguineoOp, lic_condOp, nivelEducativoOp, reg_lab_op, sexoOp, TContratoOp } from "@/constants/options";
import { Prisma } from "@prisma/client";
import { ContractReportItem, FnFpC, FnFpDh, FnFpDi, FnFpEc, FnFpEt, FnFpEtGr, FnFpIp, FnRtBResponse, PrepareRowFn } from "@/types/reports";
import { report_timeSchema } from "@/app/(protected)/reports/time/fn-b";
import { z } from "zod";

import { FnData } from "@/types/reports";
import fs from "fs/promises";
import path from "path";
import PDFDocumentWithTables from "pdfkit-table";
import PDFDocument from "pdfkit-table";

export const fn_report_time = async (user_id: string, data: FnData): Promise<{ success: boolean; message?: string; url?: string }> => {
  try {
    const res_esc = "fredy almicar navarro ramos";
    const filename = `${user_id}`;
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

    doc.registerFont("Poppins", path.resolve("public", "fonts", "poppins", "Poppins-Regular.ttf"));
    doc.registerFont("Poppins-Bold", path.resolve("public", "fonts", "poppins", "Poppins-Bold.ttf"));

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    doc.image(brandLogoPath, doc.page.margins.left, 30, {
      width: pageWidth,
      align: "center",
    });

    doc.moveDown(3);
    doc.font("Poppins-Bold").fontSize(12).text("COMPUTO DE TIEMPO", { align: "center" });
    doc.moveDown(0.5);

    const options = {
      hideHeader: true,
      columnSpacing: 4,
      padding: [2],
      prepareRow: ((row, iCol = -1, _iRow, rectRow, _rectCell): PDFDocumentWithTables => {
        if (rectRow) {
          doc.strokeColor("#ffffff").lineWidth(5).rect(rectRow.x, rectRow.y, rectRow.width, rectRow.height).stroke();
        }

        if ([0, 1, 3, 4].includes(iCol)) {
          doc.font("Poppins-Bold");
        } else {
          doc.font("Poppins");
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
          { col1: "APELLIDOS Y NOMBRES", col2: ":", col3: fnB?.name_lastname ?? "", col4: "REG. LAB.", col5: ":", col6: fnB?.reg_lab ?? "" },
          { col1: "CONDICIÓN LABORAL", col2: ":", col3: fnB?.cond_lab ?? "", col4: "CARGO", col5: ":", col6: fnB?.cargo ?? "" },
          { col1: "OFICINA", col2: ":", col3: fnB?.oficina ?? "", col4: "LUG. NAC.", col5: ":", col6: fnB?.lug_nac ?? "" },
          { col1: "TIPO DE CONTRATO", col2: ":", col3: fnB?.t_contract ?? "", col4: "EST. CIVIL", col5: ":", col6: fnB?.est_civil ?? "" },
          { col1: "PROFESIÓN", col2: ":", col3: fnB?.profesion ?? "", col4: "DOMICILIO", col5: ":", col6: fnB?.domicilio ?? "" },
          { col1: "NIVEL REMUNERATIVO", col2: ":", col3: fnB?.n_rem ?? "", col4: "", col5: "", col6: "" },
          { col1: "FECHA NACIMIENTO", col2: ":", col3: fnB?.fecha_nac.toUpperCase() ?? "", col4: "MOTIVO", col5: ":", col6: fnB?.motivo.toUpperCase() ?? "" },
          { col1: "N° DNI", col2: ":", col3: fnB?.dni ?? "", col4: "FECHA", col5: ":", col6: fnB?.fecha.toUpperCase() ?? "" },
        ],
      },
      options
    );

    const contracts = fnC ?? [];

    const total = contracts.reduce(
      (acc, curr) => {
        acc.years += parseInt(curr.anios);
        acc.months += parseInt(curr.meses);
        acc.days += parseInt(curr.dias);
        return acc;
      },
      { years: 0, months: 0, days: 0 }
    );

    if (total.days >= 30) {
      total.months += Math.floor(total.days / 30);
      total.days %= 30;
    }
    if (total.months >= 12) {
      total.years += Math.floor(total.months / 12);
      total.months %= 12;
    }

    const tableData = contracts.map((item) => ({
      doc: item.documento,
      start: item.inicio,
      end: item.termino,
      years: item.anios,
      months: item.meses,
      days: item.dias,
      cargo: item.cargo,
    }));

    for (let i = tableData.length; i < 10; i++) {
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

          if (isHeader || isTotalRow) doc.font("Poppins-Bold").fillColor("#000000");
          else doc.font("Poppins").fillColor("#000000");

          return doc;
        },
      }
    );

    doc.moveDown(4);
    const pageWidth_i = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    doc.font("Poppins-Bold").fontSize(10).text("GOBIERNO REGIONAL DE AYACUCHO", { align: "center", width: pageWidth_i });

    doc.font("Poppins-Bold").fontSize(10).text("DIRECCIÓN REGIONAL DE RECURSOS HUMANOS", { align: "center", width: pageWidth_i });

    doc.moveDown(2);

    const signatureWidth = 200;
    const x = doc.page.margins.left + (pageWidth_i - signatureWidth) / 2;
    doc
      .moveTo(x, doc.y)
      .lineTo(x + signatureWidth, doc.y)
      .stroke();

    doc.moveDown(0.3);
    doc
      .font("Poppins-Bold")
      .fontSize(10)
      .text(res_esc.toUpperCase() ?? "", { align: "center", width: pageWidth_i });

    doc.font("Poppins").fontSize(10).text("Resp. de Escalafón", { align: "center", width: pageWidth_i });

    doc.end();

    return { success: true, message: "Reporte generado correctamente", url: `/pdf/${filename}.pdf` };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo.",
    };
  }
};

export const fn_rt_b = async (user_id: string, data: z.infer<typeof report_timeSchema>): Promise<{ success: boolean; message?: string; data?: FnRtBResponse }> => {
  const { init, end } = data ?? {};
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const personal_data = await prisma.personal.findUnique({ where: { user_id }, include: { ubigeo: true } });

    const contracts = await prisma.contrato.findMany({
      where: { user_id },
      include: { ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });

    const filtered = contracts.filter((c) => {
      const from = new Date((c as ContractRecord).periodo.from);
      const to = new Date((c as ContractRecord).periodo.to);

      if (init && end) return from <= end && to >= init;
      if (init && !end) return to >= init;
      if (!init && end) return from <= end;

      return true;
    });

    const contracts_ord = filtered.sort((a, b) => {
      const dateA = new Date((a as ContractRecord).periodo.from);
      const dateB = new Date((b as ContractRecord).periodo.from);
      return dateB.getTime() - dateA.getTime();
    });

    const latest_contract = contracts_ord.length > 0 ? contracts_ord[0] : null;

    const study = await prisma.formacionAcademica.findMany({ where: { user_id } });
    const topStudy =
      study
        ?.filter((s) => ["t", "u", "m", "d", "e"].includes(s.nivel) && s.carrera)
        .sort((a, b) => ["p", "s", "t", "u", "m", "d", "e"].indexOf(b.nivel) - ["p", "s", "t", "u", "m", "d", "e"].indexOf(a.nivel))[0] ?? null;

    const response = {
      name_lastname: `${current_user.name ?? ""} ${current_user.last_name ?? ""}`.trim(),
      t_contract: TContratoOp.find((t) => t.key === latest_contract?.tipo_contrato)?.value ?? "",
      cond_lab: (latest_contract && cond_lab_op[latest_contract?.tipo_contrato ?? ""]?.find((c) => c.key === latest_contract?.condicion_laboral)?.value) ?? "",
      oficina: latest_contract?.ucd?.cargoDependencia?.dependencia?.nombre ?? "",
      cargo: latest_contract?.ucd?.cargoDependencia?.cargo?.nombre ?? "",
      profesion: topStudy?.carrera ?? "",
      n_rem: latest_contract?.tipo_contrato === "dl_276" ? latest_contract?.nivel_remuneracion ?? "" : "",
      fecha_nac: (personal_data && fn_date(personal_data?.fecha_nacimiento)) ?? "",
      dni: current_user.dni ?? "",
      reg_lab:
        latest_contract && latest_contract?.tipo_contrato !== "pra"
          ? reg_lab_op[latest_contract?.tipo_contrato ?? ""]?.find((c) => c.key === latest_contract?.regimen_laboral)?.value ?? ""
          : "",
      meta: latest_contract?.tipo_contrato === "pro_inv" ? latest_contract?.meta ?? "" : "",
      lug_nac: `${personal_data?.ubigeo?.departamento ?? ""} - ${personal_data?.ubigeo?.provincia ?? ""} - ${personal_data?.ubigeo?.distrito ?? ""}`,
      est_civil: estadoCivilOp.find((i) => i.key === personal_data?.estado_civil)?.value ?? "N/A",
      domicilio: personal_data?.domicilio ?? "",
      motivo: data.motivo ?? "",
      fecha: fn_date(new Date()),
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo." };
  }
};

export type TFnRtC = Prisma.ContratoGetPayload<{ include: { ucd: { include: { cargoDependencia: { include: { cargo: true; dependencia: true } } } } } }>;
export type ContractRecord = Omit<TFnRtC, "periodo"> & {
  periodo: { from: string; to: string };
};

export const fn_rt_c = async (user_id: string, data: z.infer<typeof report_timeSchema>): Promise<{ success: boolean; message?: string; data?: ContractReportItem[] }> => {
  const { init, end } = data ?? {};
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const contracts: TFnRtC[] | null = await prisma.contrato.findMany({
      where: { user_id },
      include: { ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!contracts) throw new Error("Contratos no encontrados.");

    const filtered = contracts.filter((c) => {
      const from = new Date((c as ContractRecord).periodo.from);
      const to = new Date((c as ContractRecord).periodo.to);

      if (init && end) return from <= end && to >= init;
      if (init && !end) return to >= init;
      if (!init && end) return from <= end;

      return true;
    });

    const contracts_ord = filtered
      .sort((a, b) => new Date((b as ContractRecord).periodo.from).getTime() - new Date((a as ContractRecord).periodo.from).getTime())
      .map((c): ContractReportItem => {
        const { from, to } = (c as ContractRecord).periodo;
        const dur = getDuration(new Date(from), new Date(to));

        return {
          documento: c.resolucion_contrato ?? "-",
          inicio: formatDate(from),
          termino: formatDate(to),
          anios: dur.anios,
          meses: dur.meses,
          dias: dur.dias,
          cargo: c.ucd?.cargoDependencia?.cargo?.nombre ?? "-",
        };
      });

    return { success: true, message: "Reporte generado correctamente", data: contracts_ord };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo." };
  }
};

export const fn_fp_ip = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpIp }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id }, include: { Discapacidad: true } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const current_personal = await prisma.personal.findUnique({ where: { user_id }, include: { ubigeo: true } });
    if (!current_personal) throw new Error("Usuario no encontrado.");

    const contracts = await prisma.contrato.findMany({
      where: { user_id },
      include: { ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    const contracts_ord = contracts.sort((a, b) => {
      const dateA = new Date((a as ContractRecord).periodo.from);
      const dateB = new Date((b as ContractRecord).periodo.from);
      return dateB.getTime() - dateA.getTime();
    });
    const latest_contract = contracts_ord.length > 0 ? contracts_ord[0] : null;

    const response = {
      apellido_paterno: current_user.last_name.split(" ")[0] ?? "",
      apellido_materno: current_user.last_name.split(" ")[1] ?? "",
      nombres: current_user.name,
      sexo: sexoOp.find((op) => op.key === current_personal.sexo)?.value ?? "",
      dni: current_user.dni,
      edad: current_personal.fecha_nacimiento ? calculate_age(new Date(current_personal.fecha_nacimiento)) : 0,
      carnet_extranjeria: "-----",
      autogenerado: current_personal?.n_autogenerado ?? "",
      licencia_conducir: lic_condOp.find((op) => op.key === current_personal.licencia_conducir)?.value ?? "",
      grupo_sanguineo: grupoSanguineoOp.find((op) => op.key === current_personal.grupo_sanguineo)?.value ?? "",
      fecha_ingreso: current_personal.fecha_ingreso ? fn_date(current_personal.fecha_ingreso) : "",
      unidad_trabajo: latest_contract?.ucd?.cargoDependencia?.dependencia?.nombre ?? "",
      cargo: latest_contract?.ucd?.cargoDependencia?.cargo?.nombre ?? "",
      fecha_nacimiento: current_personal.fecha_nacimiento ? fn_date(current_personal.fecha_nacimiento) : "",
      distrito: current_personal.ubigeo.distrito,
      provincia: current_personal.ubigeo.provincia,
      departamento: current_personal.ubigeo.departamento,
      domicilio: current_personal.domicilio ?? "",
      celular: current_personal.numero_contacto ?? "",
      regimen: latest_contract?.regimen_laboral ?? "",
      discapacidad: current_user.Discapacidad.length ? current_user.Discapacidad[0].discapacidad : "N/A",
      situacion: (latest_contract && cond_lab_op[latest_contract?.tipo_contrato ?? ""]?.find((c) => c.key === latest_contract?.condicion_laboral)?.value) ?? "",
      correo: current_user.email ?? "",
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo." };
  }
};

export const fn_fp_di = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpDi }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id }, include: { formacion_academica: true } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const fa = current_user.formacion_academica;

    const primaria = fa.find((f) => f.nivel === "p");
    const secundaria = fa.find((f) => f.nivel === "s");
    const cetpro = fa.find((f) => f.nivel === "t" && f.institucion?.toLowerCase().includes("cetpro"));

    const superior = fa.find((f) => f.nivel === "u" || f.nivel === "t");
    const postgrado = fa.find((f) => ["m", "d", "e"].includes(f.nivel));
    const otros = fa.find((f) => !["p", "s", "t", "u", "m", "d", "e"].includes(f.nivel));

    const response: FnFpDi = {
      primaria: primaria?.institucion || "",
      anio_primaria: getPeriodoString(primaria?.periodo as any),
      secundaria: secundaria?.institucion || "",
      anio_secundaria: getPeriodoString(secundaria?.periodo as any),
      cetpro: cetpro?.institucion || "",
      anio_cetpro: getPeriodoString(cetpro?.periodo as any),
      educ_sup: superior ? nivelEducativoOp.find((n) => n.key === superior.nivel)?.value || "" : "",
      profesion: superior?.carrera || "",
      facultad: superior?.facultad || "",
      anio_sup: getPeriodoString(superior?.periodo as any),
      universidad_sup: superior?.institucion || "",
      postgrado: postgrado ? [nivelEducativoOp.find((n) => n.key === postgrado.nivel)?.value, postgrado.carrera].filter(Boolean).join(" - ") : "",
      anio_titulo: getPeriodoString(postgrado?.periodo as any),
      otros_estudios: otros?.tipo || "",
      universidad_otros: otros?.institucion || "",
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de formación académica." };
  }
};

export const fn_fp_ec = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpEc }> => {
  try {
    const current_user = await prisma.user.findUnique({
      where: { id: user_id },
      include: { personal: { include: { conyuge: { include: { ubigeo: true } } } } },
    });
    if (!current_user || !current_user.personal) throw new Error("Usuario no encontrado o sin datos personales.");

    const { estado_civil, sexo, conyuge } = current_user.personal;
    const isCasado = estado_civil === "c";
    const estado = isCasado ? (sexo === "m" ? "CASADO" : sexo === "f" ? "CASADA" : "CASADO/A") : "";
    const titulo_conyuge = isCasado ? (sexo === "m" ? "ESPOSA" : sexo === "f" ? "ESPOSO" : "CÓNYUGE") : "";

    const response: FnFpEc = {
      estado,
      titulo_conyuge,
      conyuge_nombre: isCasado && conyuge ? `${conyuge.nombres} ${conyuge.apellidos}` : "",
      conyuge_nacimiento: isCasado && conyuge?.fecha_nacimiento ? formatDate(conyuge.fecha_nacimiento) : "",
      conyuge_departamento: conyuge?.ubigeo.departamento || "",
      conyuge_provincia: conyuge?.ubigeo?.provincia || "",
      conyuge_distrito: conyuge?.ubigeo.distrito || "",
      conyuge_instruccion: isCasado && conyuge?.grado_instruccion ? gradoInstruccionOp.find((g) => g.key === conyuge.grado_instruccion)?.value || "" : "",
      conyuge_dni: (isCasado && conyuge?.dni) || "",
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de estado conyugal." };
  }
};

export const fn_fp_dh = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpDh }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id }, include: { personal: true } });

    if (!current_user) throw new Error("Usuario no encontrado.");
    const personal = current_user.personal;
    if (!personal) throw new Error("No se encontró información personal.");

    const numero_hijos = personal.numero_hijos ?? 0;

    const children = await prisma.personalChildren.findMany({
      where: { personal_id: personal.id },
      include: { child: { include: { ubigeo: true } } },
      orderBy: { child: { fecha_nacimiento: "asc" } },
    });

    const response: FnFpDh = { n: [], nombre: [], lugar_fecha_nacimiento: [], edad: [], instruccion: [] };

    Array.from({ length: numero_hijos }).forEach((_, i) => {
      const child = children[i]?.child;

      const nombreCompleto = child ? `${child.apellidos} ${child.nombres}` : "";
      const lugarNacimiento = child?.ubigeo ? `${child.ubigeo.departamento}/${child.ubigeo.provincia}/${child.ubigeo.distrito} --- ${fn_date(child.fecha_nacimiento)}` : "";
      const edad = child?.fecha_nacimiento ? calculate_age(child.fecha_nacimiento) : "";
      const instruccionLabel = child?.grado_instruccion ? gradoInstruccionOp.find((g) => g.key === child.grado_instruccion)?.value ?? "" : "";

      response.n.push((i + 1).toString());
      response.nombre.push(nombreCompleto);
      response.lugar_fecha_nacimiento.push(lugarNacimiento);
      response.edad.push(edad);
      response.instruccion.push(instruccionLabel);
    });

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de hijos." };
  }
};

export const fn_fp_et_gr = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpEtGr }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const contracts = await prisma.contrato.findMany({
      where: { user_id },
      include: { ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });

    const contracts_ord = contracts.sort((a, b) => {
      const dateA = new Date((a as ContractRecord).periodo.from);
      const dateB = new Date((b as ContractRecord).periodo.from);
      return dateB.getTime() - dateA.getTime();
    });

    const response = {
      centro_trabajo: contracts_ord.map((c) => c.ucd?.cargoDependencia?.dependencia?.nombre ?? ""),
      cargo: contracts_ord.map((c) => c.ucd?.cargoDependencia?.cargo?.nombre ?? ""),
      documento: contracts_ord.map((c) => c.resolucion_contrato ?? ""),
      periodo: contracts_ord.map((c) => `${fn_date((c as any).periodo.from)} - ${fn_date((c as any).periodo.to)}`),
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de experiencia laboral dentro del gobierno regional." };
  }
};

export const fn_ep_et = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpEt }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id }, include: { experience: { include: { file: true } } } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const experience_ord = current_user.experience.sort((a, b) => {
      const dateA = new Date((a as any).periodo.from);
      const dateB = new Date((b as any).periodo.to);
      return dateB.getTime() - dateA.getTime();
    });
    const response = {
      centro_trabajo: experience_ord.map((c) => c.centro_labor ?? ""),
      cargo: experience_ord.map((c) => c.cargo ?? ""),
      documento: experience_ord.map((c) => c.file?.name ?? ""),
      periodo: experience_ord.map((c) => `${fn_date((c as any).periodo.from)} - ${fn_date((c as any).periodo.to)}`),
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de experiencia laboral." };
  }
};

export const fn_fp_c = async (user_id: string): Promise<{ success: boolean; message?: string; data?: FnFpC }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id }, include: { capacitacion: true } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const response = {
      nro: current_user.capacitacion.map((_, i) => (i + 1).toString()),
      descripcion: current_user.capacitacion.map((c) => c.materia ?? ""),
      horas: current_user.capacitacion.map((c) => c.horas_lectivas.toString() ?? ""),
      duracion: current_user.capacitacion.map((c) => getDurationFormatted((c as any).periodo.from, (c as any).periodo.to)),
      periodo: current_user.capacitacion.map((c) => `${fn_date((c as any).periodo.from)} - ${fn_date((c as any).periodo.to)}`),
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de capacitación." };
  }
};

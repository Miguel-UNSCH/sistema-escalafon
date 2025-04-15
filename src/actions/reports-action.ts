"use server";

import { prisma } from "@/config/prisma.config";
import { fn_date } from "@/helpers";
import { calculate_age, formatDate, getDuration, getPeriodoString } from "@/helpers/date-helper";
import { cond_lab_op, estadoCivilOp, gradoInstruccionOp, grupoSanguineoOp, lic_condOp, nivelEducativoOp, reg_lab_op, sexoOp, TContratoOp } from "@/constants/options";
import { Prisma } from "@prisma/client";

export const fn_report_time = async (id: string): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    // eslint-disable-next-line no-console
    console.log(id);
    return { success: true, message: "Reporte generado correctamente", data: {} };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo." };
  }
};

export const fn_rt_b = async (user_id: string): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const personal_data = await prisma.personal.findUnique({ where: { user_id }, include: { ubigeo: true } });

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

export type ContractReportItem = {
  documento: string;
  inicio: string;
  termino: string;
  anios: string;
  meses: string;
  dias: string;
  cargo: string;
};
export const fn_rt_c = async (user_id: string): Promise<{ success: boolean; message?: string; data?: ContractReportItem[] }> => {
  try {
    const current_user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!current_user) throw new Error("Usuario no encontrado.");

    const contracts: TFnRtC[] | null = await prisma.contrato.findMany({
      where: { user_id },
      include: { ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    if (!contracts) throw new Error("Contratos no encontrados.");
    const contracts_ord = contracts
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

export type FnFpIp = {
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;
  sexo: string;
  dni: string;
  edad: number;
  carnet_extranjeria: string;
  autogenerado: string;
  licencia_conducir: string;
  grupo_sanguineo: string;
  fecha_ingreso: string;
  unidad_trabajo: string;
  cargo: string;
  fecha_nacimiento: string;
  distrito: string;
  provincia: string;
  departamento: string;
  domicilio: string;
  celular: string;
  regimen: string;
  discapacidad: string;
  situacion: string;
  correo: string;
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

export type FnFpDi = {
  primaria: string;
  anio_primaria: string;
  secundaria: string;
  anio_secundaria: string;
  cetpro: string;
  anio_cetpro: string;
  educ_sup: string;
  profesion: string;
  facultad: string;
  anio_sup: string;
  universidad_sup: string;
  postgrado: string;
  anio_titulo: string;
  otros_estudios: string;
  universidad_otros: string;
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
      facultad: "Facultad de Minas Geologia y Civil", // puedes adaptar si lo obtienes en otro campo
      anio_sup: getPeriodoString(superior?.periodo as any),
      universidad_sup: superior?.institucion || "",
      postgrado: postgrado ? nivelEducativoOp.find((n) => n.key === postgrado.nivel)?.value || "" : "",
      anio_titulo: getPeriodoString(postgrado?.periodo as any),
      otros_estudios: otros?.tipo || "",
      universidad_otros: otros?.institucion || "",
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de formación académica." };
  }
};

export type FnFpEc = {
  estado: string;
  titulo_conyuge: string;
  conyuge_nombre: string;
  conyuge_nacimiento: string;
  conyuge_departamento: string;
  conyuge_provincia: string;
  conyuge_distrito: string;
  conyuge_instruccion: string;
  conyuge_dni: string;
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
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error al generar el reporte de estado conyugal.",
    };
  }
};

"use server";

import { prisma } from "@/config/prisma.config";
import { fn_date } from "@/helpers";
import { formatDate, getDuration } from "@/helpers/date-helper";
import { cond_lab_op, estadoCivilOp, reg_lab_op, TContratoOp } from "@/utils/options";
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

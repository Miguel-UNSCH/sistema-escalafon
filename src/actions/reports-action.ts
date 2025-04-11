"use server";

import { prisma } from "@/config/prisma.config";
import { fn_date } from "@/helpers";
import { cond_lab_op, estadoCivilOp, reg_lab_op, TContratoOp } from "@/utils/options";

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
    if (!personal_data) throw new Error("Datos personales no encontrados.");

    const contracts = await prisma.contrato.findMany({
      where: { user_id },
      include: { ucd: { include: { cargoDependencia: { include: { cargo: true, dependencia: true } } } } },
    });
    const contracts_ord = contracts.sort((a: any, b: any) => {
      const dateA = new Date(a.periodo.from);
      const dateB = new Date(b.periodo.from);
      return dateB.getTime() - dateA.getTime();
    });

    if (contracts_ord.length === 0) throw new Error("No se encontraron contratos.");
    const latest_contract = contracts_ord[0];

    const study = await prisma.formacionAcademica.findMany({ where: { user_id } });
    if (!study) throw new Error("Datos de formación académica no encontrados.");
    const topStudy = study
      .filter((s) => ["t", "u", "m", "d", "e"].includes(s.nivel) && s.carrera)
      .sort((a, b) => ["p", "s", "t", "u", "m", "d", "e"].indexOf(b.nivel) - ["p", "s", "t", "u", "m", "d", "e"].indexOf(a.nivel))[0];

    const response = {
      name_lastname: `${current_user.name} ${current_user.last_name}`,
      t_contract: `${TContratoOp.find((t) => t.key === latest_contract.tipo_contrato)?.value}`,
      cond_lab: `${cond_lab_op[latest_contract.tipo_contrato]?.find((c) => c.key === latest_contract.condicion_laboral)?.value}`,
      oficina: latest_contract.ucd.cargoDependencia.dependencia.nombre,
      cargo: latest_contract.ucd.cargoDependencia.cargo.nombre,
      profesion: topStudy.carrera,
      n_rem: latest_contract.tipo_contrato === "dl_276" && latest_contract.nivel_remuneracion,
      fecha_nac: fn_date(personal_data.fecha_nacimiento),
      dni: current_user.dni,
      reg_lab: latest_contract.tipo_contrato !== "pra" && `${reg_lab_op[latest_contract.tipo_contrato]?.find((c) => c.key === latest_contract.regimen_laboral)?.value}`,
      meta: latest_contract.tipo_contrato === "pro_inv" && `${latest_contract.meta}`,
      lug_nac: `${personal_data.ubigeo?.departamento} - ${personal_data.ubigeo?.provincia} - ${personal_data.ubigeo?.distrito}`,
      est_civil: estadoCivilOp.find((i) => i.key === personal_data.estado_civil)?.value || "N/A",
      domicilio: personal_data.domicilio,
      motivo: "Pago de Vacaciones Truncas",
      fecha: fn_date(new Date()),
    };

    return { success: true, message: "Reporte generado correctamente", data: response };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : "Error al generar el reporte de tiempo." };
  }
};

// export const fn_report_time_c = async (): Promise<{ success: boolean; message?: string; data?: any }> => {};

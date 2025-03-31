import { get_ucd_by_id } from "@/actions/others-action";
import { User } from "@prisma/client";

export const getLatestUCDId = (
  user: User & {
    ascenso?: Array<{ fecha: string; newUCDId: number }>;
    Desplazamiento?: Array<{ fecha: string; newUCDId: number }>;
    contrato?: Array<{ periodo: { from: string }; ucd_id: number }>;
  }
): number | null => {
  let latestRecord: { date: Date; ucdId: number } | null = null;

  if (user.ascenso && user.ascenso.length > 0) {
    const latestAscenso = user.ascenso.reduce((prev, curr) => (new Date(curr.fecha) > new Date(prev.fecha) ? curr : prev));
    latestRecord = { date: new Date(latestAscenso.fecha), ucdId: latestAscenso.newUCDId };
  }

  if (user.Desplazamiento && user.Desplazamiento.length > 0) {
    const latestDesplazamiento = user.Desplazamiento.reduce((prev, curr) => (new Date(curr.fecha) > new Date(prev.fecha) ? curr : prev));
    const desplazDate = new Date(latestDesplazamiento.fecha);
    if (!latestRecord || desplazDate > latestRecord.date) {
      latestRecord = { date: desplazDate, ucdId: latestDesplazamiento.newUCDId };
    }
  }

  if ((!user.ascenso || user.ascenso.length === 0) && (!user.Desplazamiento || user.Desplazamiento.length === 0)) {
    if (user.contrato && user.contrato.length > 0) {
      const latestContrato = user.contrato.reduce((prev, curr) => (new Date(curr.periodo.from) > new Date(prev.periodo.from) ? curr : prev));
      latestRecord = { date: new Date(latestContrato.periodo.from), ucdId: latestContrato.ucd_id };
    }
  }

  return latestRecord ? latestRecord.ucdId : null;
};

export const getLatestUCDInfo = async (
  user: User & {
    ascenso?: Array<{ fecha: string; newUCDId: number }>;
    Desplazamiento?: Array<{ fecha: string; newUCDId: number }>;
    contrato?: Array<{ periodo: { from: string }; ucd_id: number }>;
  }
): Promise<{ cargo: string; dependencia: string } | null> => {
  const ucdId = getLatestUCDId(user);
  if (!ucdId) return null;

  const result = await get_ucd_by_id(ucdId);
  if (!result.success || !result.data) return null;

  const { cargo, dependencia } = result.data.cargoDependencia;
  return {
    cargo: cargo.nombre,
    dependencia: dependencia.nombre,
  };
};

import { object, string, date, z } from "zod";

// Enum para TipoDescanso (se debe adaptar según los valores posibles de tu modelo)
enum TipoDescanso {
  MEDICO = "MEDICO",
  PARTICULAR = "PARTICULAR",
  PRE_POSTNATAL = "PRE_POSTNATAL",
}

export const descansoMedicoSchema = object({
  tipoDescanso: z.enum([TipoDescanso.MEDICO, TipoDescanso.PARTICULAR, TipoDescanso.PRE_POSTNATAL]),
  documentoSustento: string().min(1, "El documento sustento es obligatorio"),
  fechaInicioDescanso: date().min(new Date(1900, 0, 1), "La fecha de inicio del descanso debe ser válida"),
  fechaFinDescanso: date().min(new Date(1900, 0, 1), "La fecha de fin del descanso debe ser válida"),
  dependenciaOficinaId: string().min(1, "El ID de la dependencia de oficina es obligatorio"),
  cargoId: string().min(1, "El ID del cargo es obligatorio"),
  personalId: string().min(1, "El ID del personal es obligatorio"),
  status: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export type DescansoMedico = z.infer<typeof descansoMedicoSchema>;

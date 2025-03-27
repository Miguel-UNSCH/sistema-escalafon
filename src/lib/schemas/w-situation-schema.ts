import { z } from "zod";

import { fileSchema, periodoSchema } from "@/lib/zod";
import { CLaboral, RLaboral, TContrato, TipoDescanso, TipoDesplazamiento, TipoPermisoLicenciaVacacion } from "./enums";

export const contratoSchema = z.object({
  tipo_contrato: TContrato,
  condicion_laboral: CLaboral,
  regimen_laboral: RLaboral.optional(), // ** a, b, c
  resolucion_contrato: z.string().optional(), // Resolución de nombramiento, contrato o convenio
  nivel_remuneracion: z.string().optional(), // ** a
  pap: z.number().optional(), // ** a
  cnp: z.number().optional(), // ** a
  meta: z.string().optional(), // ** c
  obra: z.string().optional(), // ** c
  periodo: periodoSchema,
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZContratoS = z.infer<typeof contratoSchema>;

export const renunciaSchema = z.object({
  motivo: z.string(),
  fecha: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZRenunciaS = z.infer<typeof renunciaSchema>;

export const desplazamientoSchema = z.object({
  tipo_desplazamiento: TipoDesplazamiento,
  fecha: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  tipo_file: z.string(),
  current_cargo_id: z.string(),
  new_cargo_id: z.string(),
  current_dependencia_id: z.string(),
  new_dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZDesplazamientoS = z.infer<typeof desplazamientoSchema>;

export const descansoMedicoSchema = z.object({
  tipo_descanso: TipoDescanso,
  detalle: z.string(),
  periodo: periodoSchema,
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZDesMedS = z.infer<typeof descansoMedicoSchema>;

export const per_lic_vacSchema = z.object({
  tipo: TipoPermisoLicenciaVacacion,
  detalle: z.string(),
  periodo: periodoSchema,
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZPerLicVacS = z.infer<typeof per_lic_vacSchema>;

export const ascensoSchema = z.object({
  resolucion_ascenso: z.string(),
  nivel_remunerativo: z.string(),
  cnp: z.number(),
  fecha: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  current_cargo_id: z.string(),
  new_cargo_id: z.string(),
  current_dependencia_id: z.string(),
  new_dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZAscensoS = z.infer<typeof ascensoSchema>;

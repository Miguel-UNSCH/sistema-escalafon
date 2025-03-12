import { z } from "zod";

import { fileSchema, periodoSchema } from "@/lib/zod";
import { CLaboral, RLaboral, TContrato, TipoDescanso, TipoDesplazamiento } from "./enums";
import { cargoSchema, dependenciaSchema } from "./others-schema";

export const contratoSchema = z.object({
  tipo_contrato: TContrato,
  condicion_laboral: CLaboral,
  resolucion_contrato: z.string().optional(),
  regimen_laboral: RLaboral,
  nivel_remuneracion: z.string().optional(), // change t-1 t-4
  pap: z.number().optional(),
  cnp: z.number().optional(),
  meta: z.string().optional(),
  convenio: z.string().optional(),
  fecha_ingreso: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  fecha_cese: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date))
    .optional(),
  file: fileSchema,
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
});
export type ZContratoS = z.infer<typeof contratoSchema>;

export const renunciaSchema = z.object({
  motivo: z.string(),
  fecha: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema,
});
export type ZRenunciaS = z.infer<typeof renunciaSchema>;

export const desplazamientoSchema = z.object({
  tipo_desplazamiento: TipoDesplazamiento,
  fecha: z
    .string({ required_error: "Fecha de inicio es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  tipo_file: z.string(),
  current_cargo: cargoSchema,
  new_cargo: cargoSchema,
  current_dependencia: dependenciaSchema,
  new_dependencia: dependenciaSchema,
  file: fileSchema,
});
export type ZDesplazamientoS = z.infer<typeof desplazamientoSchema>;

export const descansoMedicoSchema = z.object({
  tipo_descanso: TipoDescanso,
  periodo: periodoSchema,
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema,
});
export type ZDesMedS = z.infer<typeof descansoMedicoSchema>;

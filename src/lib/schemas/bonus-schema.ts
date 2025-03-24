import { z } from "zod";

import { fileSchema } from "@/lib/zod";
import { cargoSchema, dependenciaSchema } from "./others-schema";
export const bonusPersonalSchema = z.object({
  tipo: z.string(),
  resolucion_bonus: z.string(),
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZBonusPersonal = z.infer<typeof bonusPersonalSchema>;

export const bonusFamiliarSchema = z.object({
  tipo: z.string(),
  resolucion_bonus: z.string(),
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZBonusFamiliar = z.infer<typeof bonusFamiliarSchema>;

export const evaluationSchema = z.object({
  puntuacion: z.number(),
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema.optional(),
});
export type ZEvaluation = z.infer<typeof evaluationSchema>;

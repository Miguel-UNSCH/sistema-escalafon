import { z } from "zod";
import { fileSchema, periodoSchema } from "../zod";

export const meritoSchema = z.object({
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZMerito = z.infer<typeof meritoSchema>;

export const tipo_sancion_z = z.enum(["sgl", "amo", "ppe", "nin"]);

export const demeritoSchema = z.object({
  user: z.object({
    name: z.string(),
    dni: z.string(),
    id: z.string(),
  }),
  tipo_sancion: tipo_sancion_z,
  tipo_documento: z.string(),
  asunto: z.string(),
  periodo: periodoSchema,
  cargo_id: z.string(),
  dependencia_id: z.string(),
  file: fileSchema.optional(),
});
export type ZDemerito = z.infer<typeof demeritoSchema>;

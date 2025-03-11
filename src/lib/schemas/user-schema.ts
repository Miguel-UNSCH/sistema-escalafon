import { z } from "zod";

import { fileSchema, periodoSchema } from "@/lib/zod";
import { NivelEducativo } from "./enums";

export const estudiosSchema = z.object({
  institucion: z.string({ required_error: "Institución es requerida" }),
  carrera: z.string().optional(),
  periodo: periodoSchema,
  file: fileSchema,
  nivel: NivelEducativo,
});
export type ZEstudioS = z.infer<typeof estudiosSchema>;

export const capacitacionSchema = z.object({
  centro_capacitacion: z.string(),
  materia: z.string(),
  especialidad: z.string(),
  horas_lectivas: z.number(),
  periodo: periodoSchema,
  file: fileSchema,
});
export type ZCapacitacionS = z.infer<typeof capacitacionSchema>;

import { z } from "zod";

import { fileSchema, periodoSchema } from "@/lib/zod";
import { NivelEducativo, TDiscapacidad, TEntCertDic } from "./enums";
import { cargoSchema, dependenciaSchema } from "./others-schema";

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

export const expSchema = z.object({
  centro_labor: z.string(),
  periodo: periodoSchema,
  cargo: cargoSchema,
  dependencia: dependenciaSchema,
  file: fileSchema,
});
export type ZExpS = z.infer<typeof expSchema>;

export const disabilitySchema = z.object({
  tipo: TDiscapacidad,
  discapacidad: z.string(),
  entidad_certificadora: TEntCertDic,
  fecha_certificacion: z.string(),
  file: fileSchema,
});
export type ZDisabilityS = z.infer<typeof disabilitySchema>;

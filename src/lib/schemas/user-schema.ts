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

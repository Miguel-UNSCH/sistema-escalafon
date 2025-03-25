import { z } from "zod";
import { fileSchema } from "../zod";

import { tipo_doc } from "./enums";

export const documentSchema = z.object({
  tipo_documento: tipo_doc,
  asunto: z.string(),
  fecha: z
    .string({ required_error: "Fecha es requerida" })
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida")
    .transform((date) => new Date(date)),
  cargo_id: z.string(),
  dependencia_id: z.string(),
  r_cargo_id: z.string(),
  r_dependencia_id: z.string(),
  received: z.object({
    name: z.string(),
    dni: z.string(),
    id: z.string(),
  }),
  file: fileSchema.optional(),
});
export type ZDocumentS = z.infer<typeof documentSchema>;

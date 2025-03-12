import { z } from "zod";
import { fileSchema, userSchema } from "../zod";

import { tipo_doc } from "./enums";
import { cargoSchema, dependenciaSchema } from "./others-schema";

export const documentSchema = z.object({
  numero_documento: z.string(),
  tipo_documento: tipo_doc,
  asunto: z.string(),
  receptor: userSchema,
  file: fileSchema,
  cargo_emisor: cargoSchema,
  cargo_receptor: cargoSchema,
  dependencia_emisor: dependenciaSchema,
  dependencia_receptor: dependenciaSchema,
});
export type ZDocumentS = z.infer<typeof documentSchema>;

import { z } from "zod";

import { fileSchema } from "@/lib/zod";
import { CLaboral, RLaboral, TContrato } from "./enums";
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

import { object, string, z } from "zod";

export const demeritoSchema = object({
  personalId: string().min(1, "El ID del personal es obligatorio"),
  dependenciaOficinaId: string().min(1, "El ID de la dependencia u oficina es obligatorio"),
  cargoId: string().min(1, "El ID del cargo es obligatorio"),
  documentoSustento: string().min(1, "El documento sustento (resoluciones, memorando, etc.) es obligatorio"),
  tipoSancion: string().min(1, "El tipo de sanción es obligatorio"),
  fechaSancion: string()
    .regex(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/, "El formato de la fecha de sanción debe ser 'dd/mm/yyyy - dd/mm/yyyy'")
    .min(1, "La fecha de sanción es obligatoria"),
  status: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export type Demerito = z.infer<typeof demeritoSchema>;

import { object, string, z } from "zod";

// Enum para Status (según el modelo proporcionado, debería estar en tu código también)
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const discapacidadSchema = object({
  personalId: string().min(1, "El ID del personal es obligatorio"),
  tipo: string().min(1, "El tipo de discapacidad es obligatorio"),
  documentoSustento: string().min(1, "El documento sustento es obligatorio"),
  organoEstructurado: string().min(1, "El órgano estructurado es obligatorio"),
  condicionLaboral: string().min(1, "La condición laboral es obligatoria"),
  status: z.enum([Status.ENABLED, Status.DISABLED]).optional(),
});

export type Discapacidad = z.infer<typeof discapacidadSchema>;

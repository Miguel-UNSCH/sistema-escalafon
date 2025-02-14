import { object, string, z } from "zod";

// Enum para Status (según el modelo proporcionado, debería estar en tu código también)
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const estudiosSchema = object({
  personalId: string().min(1, "El ID del personal es obligatorio"),
  nivel: string().min(1, "El nivel de estudios es obligatorio"),
  periodo: string().regex(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/, "El periodo debe tener el formato 'dd/mm/yyyy - dd/mm/yyyy'"),
  institucion: string().min(1, "La institución educativa es obligatoria"),
  otrosEstudios: string().optional(), // Los estudios adicionales son opcionales
  status: z.enum([Status.ENABLED, Status.DISABLED]).optional(),
});

export type Estudios = z.infer<typeof estudiosSchema>;

import { object, string, date, z } from "zod";

// Enum para Status (según el modelo proporcionado, debería estar en tu código también)
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const fichaEvaluacionSchema = object({
  documentoSustento: string().min(1, "El documento de sustento es obligatorio"),
  fechaEvaluacion: date().refine((date) => !isNaN(date.getTime()), "La fecha de evaluación es inválida"),
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo").optional(), // Puedes quitar .optional() si el campo es obligatorio
  dependenciaOficinaId: z.number().int().positive("El ID de la dependencia de oficina debe ser un número positivo"),
  cargoId: z.number().int().positive("El ID del cargo debe ser un número positivo"),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Asumiendo que el valor por defecto es 'ENABLED'
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type FichaEvaluacion = z.infer<typeof fichaEvaluacionSchema>;

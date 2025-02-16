import { object, string, date, z } from "zod";

// Enum para Status (según el modelo proporcionado, debería estar en tu código también)
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const experienciaLaboralSchema = object({
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo").optional(), // Puedes quitar .optional() si el campo es obligatorio
  documentoSustento: string().min(1, "El documento de sustento es obligatorio"),
  centroLabor: string().min(1, "El centro de trabajo es obligatorio"),
  dependenciaOficinaId: z.number().int().positive("El ID de la dependencia de oficina debe ser un número positivo"),
  cargoId: z.number().int().positive("El ID del cargo debe ser un número positivo"),
  periodo: string().regex(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/, "El periodo debe tener el formato 'dd/mm/yyyy - dd/mm/yyyy'"),
  fechaEmision: date().refine((date) => !isNaN(date.getTime()), "La fecha de emisión es inválida"),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Asumiendo que el valor por defecto es 'ENABLED'
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type ExperienciaLaboral = z.infer<typeof experienciaLaboralSchema>;

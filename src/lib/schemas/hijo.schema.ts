import { object, string, date, z } from "zod";

// Enum para Status (según el modelo proporcionado, debería estar en tu código también)
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

export const hijoSchema = object({
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  fechaNacimiento: date().refine((date) => !isNaN(date.getTime()), "La fecha de nacimiento es inválida"),
  edad: z.number().int().min(0, "La edad no puede ser negativa"),
  gradoInstruccion: string().min(1, "El grado de instrucción es obligatorio"),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Asumiendo que el valor por defecto es 'ENABLED'
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type Hijo = z.infer<typeof hijoSchema>;

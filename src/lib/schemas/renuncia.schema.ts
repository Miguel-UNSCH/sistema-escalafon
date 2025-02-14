import { object, string, date, z } from "zod";

// Enum para Status y MotivoRenuncia
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

enum MotivoRenuncia {
  PARTICULAR = "PARTICULAR",
  SALUD = "SALUD",
  PERSONAL = "PERSONAL",
}

export const renunciaLiquidacionSchema = object({
  documentoRenuncia: string().min(1, "El documento de renuncia es obligatorio"),
  motivoRenuncia: z.enum([MotivoRenuncia.PARTICULAR, MotivoRenuncia.SALUD, MotivoRenuncia.PERSONAL]),
  fechaRenuncia: date().refine((date) => !isNaN(date.getTime()), "La fecha de renuncia es inválida"),
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  dependenciaOficinaId: z.number().int().positive("El ID de la dependencia de oficina debe ser un número positivo"),
  cargoId: z.number().int().positive("El ID del cargo debe ser un número positivo"),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Asumiendo que el valor por defecto es 'ENABLED'
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type RenunciaLiquidacion = z.infer<typeof renunciaLiquidacionSchema>;

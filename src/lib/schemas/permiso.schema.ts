import { object, string, date, z } from "zod";

// Enum para Status y TipoPermisoLicenciaVacacion
enum Status {
  ENABLED = "ENABLED",
  DISABLED = "DISABLED",
}

enum TipoPermisoLicenciaVacacion {
  PARTICULAR = "PARTICULAR",
  VACACIONES = "VACACIONES",
  PERMISO_FAMILIAR = "PERMISO_FAMILIAR",
}

export const permisoLicenciaVacacionSchema = object({
  tipoPermisoLicenciaVacacion: z.enum([
    TipoPermisoLicenciaVacacion.PARTICULAR,
    TipoPermisoLicenciaVacacion.VACACIONES,
    TipoPermisoLicenciaVacacion.PERMISO_FAMILIAR,
  ]),
  documentoSustento: string().min(1, "El documento de sustento es obligatorio"),
  fechaInicioPermiso: date().refine((date) => !isNaN(date.getTime()), "La fecha de inicio del permiso es inválida"),
  fechaFinPermiso: date().refine((date) => !isNaN(date.getTime()), "La fecha de fin del permiso es inválida"),
  dependenciaOficinaId: z.number().int().positive("El ID de la dependencia de oficina debe ser un número positivo"),
  cargoId: z.number().int().positive("El ID del cargo debe ser un número positivo"),
  personalId: z.number().int().positive("El ID del personal debe ser un número positivo"),
  status: z.enum([Status.ENABLED, Status.DISABLED]).default(Status.ENABLED), // Asumiendo que el valor por defecto es 'ENABLED'
  createdAt: date().optional(),
  updatedAt: date().optional(),
});

export type PermisoLicenciaVacacion = z.infer<typeof permisoLicenciaVacacionSchema>;

import { object, string, date, z } from "zod";

// Enum para TipoDesplazamiento (se debe adaptar según los valores posibles de tu modelo)
enum TipoDesplazamiento {
  ROTACION_INTERNA = "ROTACION_INTERNA",
  ROTACION_VOLUNTARIA = "ROTACION_VOLUNTARIA",
  REASIGNACION = "REASIGNACION",
  DESIGNACION = "DESIGNACION",
  DESTACADO = "DESTACADO",
  PERMUTA = "PERMUTA",
  ENCARGAR = "ENCARGAR",
}

export const desplazamientoSchema = object({
  tipoDesplazamiento: z.enum([
    TipoDesplazamiento.ROTACION_INTERNA,
    TipoDesplazamiento.ROTACION_VOLUNTARIA,
    TipoDesplazamiento.REASIGNACION,
    TipoDesplazamiento.DESIGNACION,
    TipoDesplazamiento.DESTACADO,
    TipoDesplazamiento.PERMUTA,
    TipoDesplazamiento.ENCARGAR,
  ]),
  documentoRotacion: string().min(1, "El documento de rotación es obligatorio"),
  fechaDesplazamiento: date().min(new Date(1900, 0, 1), "La fecha de desplazamiento debe ser válida"),
  dependenciaOficinaDeId: string().min(1, "El ID de la dependencia de origen es obligatorio"),
  dependenciaOficinaAId: string().min(1, "El ID de la dependencia de destino es obligatorio"),
  cargoId: string().min(1, "El ID del cargo es obligatorio"),
  personalId: string().min(1, "El ID del personal es obligatorio"),
  status: z.enum(["ENABLED", "DISABLED"]).optional(),
});

export type Desplazamiento = z.infer<typeof desplazamientoSchema>;

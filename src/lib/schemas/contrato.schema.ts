import { object, string, number, date, enum as zEnum, optional, z } from "zod";

// Enum para el TipoContrato
enum TipoContrato {
  DECRETO_LEGISLATIVO_276 = "DECRETO_LEGISLATIVO_276",
  CAS = "CAS",
  PROYECTO_INVERSION = "PROYECTO_INVERSION",
  PRACTICANTE = "PRACTICANTE",
}

export const contratoSchema = object({
  tipoContrato: zEnum([TipoContrato.DECRETO_LEGISLATIVO_276, TipoContrato.CAS, TipoContrato.PROYECTO_INVERSION, TipoContrato.PRACTICANTE]),
  condicionLaboral: string().min(1, "La condición laboral es obligatoria"),
  resolucionNombramiento: optional(string().min(1, "La resolución de nombramiento es obligatoria")),
  regimenLaboral: string().min(1, "El régimen laboral es obligatorio"),
  nivelRemuneracion: optional(
    string()
      .min(1, "El nivel de remuneración es obligatorio")
      .regex(/^\d+ - \d+$/, "El formato del nivel de remuneración debe ser 'min - max'")
  ),
  pap: optional(string().min(1, "El PAP es obligatorio")),
  cnp: optional(string().min(1, "El CNP es obligatorio")),
  fechaIngreso: date().min(new Date(1900, 0, 1), "La fecha de ingreso debe ser válida"),
  fechaCese: optional(date().min(new Date(1900, 0, 1), "La fecha de cese debe ser válida")),
  aniosServicio: optional(number().min(0, "Los años de servicio deben ser un número positivo")),
  personalId: string().min(1, "El ID del personal es obligatorio"),
  dependenciaOficinaId: string().min(1, "El ID de la dependencia u oficina es obligatorio"),
  cargoId: string().min(1, "El ID del cargo es obligatorio"),
});

export type Contrato = z.infer<typeof contratoSchema>;

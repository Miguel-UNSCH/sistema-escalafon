import { object, string, z } from "zod";

export const actaSchema = object({
  actaEentregadoPorId: string().min(1, "El ID del personal que entrega el acta es obligatorio"),
  actaRecibidoPorId: string().min(1, "El ID del personal que recibe el acta es obligatorio"),
  dependenciaOficinaId: string().min(1, "El ID de la dependencia u oficina es obligatorio"),
  cargoId: string().min(1, "El ID del cargo es obligatorio"),
  documentoSustento: string().min(1, "El documento de sustento es obligatorio"),
  fecha: string()
    .regex(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/, "El formato de la fecha debe ser 'dd/mm/yyyy - dd/mm/yyyy'")
    .min(1, "La fecha es obligatoria"),
});

export type Acta = z.infer<typeof actaSchema>;

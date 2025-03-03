import { object, string, date, z } from "zod";

export const experienciaSchema = object({
  personalId: z.string({ required_error: "el id del personal es requerido" }),
  documentoSustento: string().min(1, "El documento de sustento es obligatorio"),
  centroLabor: string().min(1, "El centro de trabajo es obligatorio"),
  dependenciaId: z.number().int().positive("El ID de la dependencia de oficina debe ser un número positivo"),
  cargoId: z.number().int().positive("El ID del cargo debe ser un número positivo"),
  periodo: string().regex(/^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/, "El periodo debe tener el formato 'dd/mm/yyyy - dd/mm/yyyy'"),
  fechaEmision: date().refine((date) => !isNaN(date.getTime()), "La fecha de emisión es inválida"),
});

export type ZExperiencia = z.infer<typeof experienciaSchema>;
